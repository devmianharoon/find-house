"use client";
import { setSelectedQuestion } from "@/store/slices/questionSlice";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// export const metadata = {
//   title: "About Us || FindHouse - Real Estate React Template",
//   description: "FindHouse - Real Estate React Template",
// };

const index = () => {
  //**** */
  const dispatch = useDispatch();
  const question = useSelector((state) => state.question.selectedQuestion);

  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (question ? !question.trim() : !input.trim()) return;
    //api call and response getting
    // const reponse = await fetch(`http://127.0.0.1:8000/call?message=${input}`);

    // const data = await reponse.json();
    //user and chat bot messages based on data and input

    const userMessage = {
      from: "user",
      text: () => {
        if (question === "") {
          return input;
        } else {
          question;
        }
      },
    };
    const botReply = { from: "bot", text: "data" };

    setMessages([...messages, userMessage, botReply]);
    setInput("");
    dispatch(setSelectedQuestion(""));
  };
  return (
    <div className="chatbot-container">
      <div className="chatbot-header">I am Here to Assist You</div>
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chatbot-message ${
              msg.from === "user" ? "user" : "bot"
            }`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chatbot-input-area">
        <input
          type="text"
          className="chatbot-input"
          value={question === "" ? input : question}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button className="chatbot-send" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
