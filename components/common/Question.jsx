"use client";
import { setSelectedQuestion } from "@/store/slices/questionSlice";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // ✅ use the router from next/navigation (app router)

const QuestionTiles = ({ questions }) => {
  const dispatch = useDispatch();
  const router = useRouter(); // ✅ initialize router
  const [inputQuestion, setInputQuestion] = useState("");

  const handleClick = (question) => {
    dispatch(setSelectedQuestion(question));
    router.push("/chat"); // ✅ navigate after setting the question
  };

  const handleInputSubmit = () => {
    if (inputQuestion.trim() !== "") {
      handleClick(inputQuestion);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleInputSubmit();
    }
  };

  return (
    <div>
      {/* Input and Button */}
      <div className="inputSection">
        <input
          type="text"
          value={inputQuestion}
          onKeyDown={handleKeyDown}
          onChange={(e) => setInputQuestion(e.target.value)}
          placeholder="Ask your own question"
        />
        <div className="buttonImageWrapper" onClick={handleInputSubmit}>
          <Image
            src="/assets/images/rebort.webp"
            width={60}
            height={69}
            alt="bot"
          />
        </div>
      </div>

      {/* Question Tiles */}
      <div className="questionWrapper">
        {questions.map((item) => (
          <div
            key={item.id}
            onClick={() => handleClick(item.question)}
            className="tile"
            style={{ cursor: "pointer" }}
          >
            {item.question}
          </div>
        ))}
      </div>

      <style jsx>{`
        .inputSection {
          display: flex;
          gap: 10px;
          padding: 20px;
        }

        input {
          flex: 1;
          padding: 10px;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 6px;
        }

        .buttonImageWrapper {
          width: 60px;
          height: 60px;
          border-radius: 6px;
          overflow: hidden;
          transition: transform 0.2s;
          cursor: pointer;
        }

        .questionWrapper {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          padding-left: 20px;
          padding-right: 20px;
          padding-bottom: 20px;
          border-radius: 8px;
          margin: 0 auto;
          overflow: auto;
        }

        .tile {
          background-color: #ffffff;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 15px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
          transition: transform 0.2s;
          height: 50px;
          box-sizing: border-box;
        }

        .tile:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        }

        .tile p {
          margin: 0;
          color: #666;
          font-size: 1rem;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

export default QuestionTiles;
