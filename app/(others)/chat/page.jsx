"use client";
import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";


const index = () => {
const [messageInput, setMessageInput] = useState("");
const [messages, setMessages] = useState([
  { sender: "bot", content: "Hi, it's Zippi here! How can I help you today?" },
]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

const chatContainerRef = useRef(null);

useEffect(() => {
  if (chatContainerRef.current) {
    chatContainerRef.current.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }
}, [messages]);

const handleSendMessage = async () => {
  if (messageInput.trim() === "") return;

  const userMessage = { sender: "user", content: messageInput };
  setMessages((prevMessages) => [...prevMessages, userMessage]);

  setLoading(true);
  let botMessage = { sender: "bot", content: "" };
  setMessages((prevMessages) => [...prevMessages, botMessage]);

  try {
    const response = await fetch(
      `http://127.0.0.1:8000/call?message=${encodeURIComponent(messageInput)}`
    );

    if (!response.ok || !response.body) {
      throw new Error("Streaming response failed.");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let done = false;

    while (!done) {
      const { value, done: readerDone } = await reader.read();
      done = readerDone;
      const chunk = decoder.decode(value || new Uint8Array(), { stream: true });

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
    setError("Something went wrong while receiving the response.");
  } finally {
    setLoading(false);
  }

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
  <div className="max-w-full  shadow-lg p-4 !h-[90%] py-[20px] px-[10px]">
    <div className="space-y-4 h-[90%]">
      <div
        id="messages"
        ref={chatContainerRef}
        className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50"
        style={{ height: "90%", overflowY: "auto" }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 ${msg.sender === "user" ? "text-right" : "text-left"}`}
          >
            <div
              className={`inline-block px-4 py-2 rounded-lg ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {msg.content}
              </ReactMarkdown>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <input
          type="text"
          value={messageInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSendMessage}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  </div>
);
}
export default dynamic(() => Promise.resolve(index), { ssr: false });
