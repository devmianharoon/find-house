"use client";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedQuestion } from "@/store/slices/questionSlice";
import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { v4 as uuidv4 } from "uuid";

const ChatComponent = () => {
  const dispatch = useDispatch();
  const selectedQuestion = useSelector((state) => state.question.selectedQuestion);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      content: "Hi, it's Zippi here! How can I help you today?",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sessionId] = useState(uuidv4()); // Generate random session ID on mount
  const [context] = useState(`user_${Math.random().toString(36).slice(2)}`); // Random context (e.g., user ID)
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const sendMessage = async (content, isInitial = false) => {
    if (!content || typeof content !== "string" || content.trim() === "") {
      setError("Message content cannot be empty.");
      return;
    }

    const userMessage = { sender: "user", content };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setMessages((prev) => [...prev, { sender: "bot", content: "" }]);

    try {
      const payload = { content };
      if (isInitial) {
        payload.context = context; // Include context in first message
      }
      payload.session_id = sessionId;

      console.log("Sending payload:", payload);

      const response = await fetch("http://127.0.0.1:8000/call", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          `Streaming response failed: ${response.status} ${response.statusText} - ${
            errorData.detail || "Unknown error"
          }`
        );
      }

      if (!response.body) {
        throw new Error("No response body received.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let done = false;

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        const chunk = decoder.decode(value || new Uint8Array(), {
          stream: true,
        });

        if (chunk) {
          setMessages((prevMessages) => {
            const last = prevMessages[prevMessages.length - 1];
            if (last.sender === "bot") {
              return [
                ...prevMessages.slice(0, -1),
                { ...last, content: last.content + chunk },
              ];
            }
            return prevMessages;
          });
        }
      }
    } catch (err) {
      console.error("Streaming error:", err);
      setError(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const sendInitialQuestion = async () => {
      if (
        selectedQuestion &&
        typeof selectedQuestion === "string" &&
        selectedQuestion.trim() &&
        !chatContainerRef.current?.dataset.sent
      ) {
        chatContainerRef.current.dataset.sent = "true";
        await sendMessage(selectedQuestion, true); // Include context in initial question
        dispatch(setSelectedQuestion(null));
        chatContainerRef.current.dataset.sent = "";
      }
    };

    sendInitialQuestion();
  }, [selectedQuestion, dispatch]);

  const handleSendMessage = async () => {
    if (messageInput.trim() === "") {
      setError("Please enter a message.");
      return;
    }
    await sendMessage(messageInput);
    setMessageInput("");
  };

  const handleInputChange = (e) => {
    setMessageInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">I am Here to Assist You</div>
      <div id="messages" ref={chatContainerRef} className="chatbot-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chatbot-message ${
              msg.sender === "user" ? "user" : "bot"
            }`}
          >
            <div className={`chatbot-messageg ${msg.sender === "user"}`}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {msg.content}
              </ReactMarkdown>
            </div>
          </div>
        ))}
      </div>

      <div className="chatbot-input-area">
        <input
          type="text"
          value={messageInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="chatbot-input"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSendMessage}
          className="chatbot-send"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default dynamic(() => Promise.resolve(ChatComponent), { ssr: false });