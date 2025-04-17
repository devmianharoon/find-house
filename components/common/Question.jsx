"use client";
import { setSelectedQuestion } from "@/store/slices/questionSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const QuestionTiles = ({ questions }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [inputQuestion, setInputQuestion] = useState("");

  const handleClick = (question) => {
    dispatch(setSelectedQuestion(question));
    router.push("/chat");
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
    <div className="container">
      {/* Left: Questions */}
      <div className="leftSection">
        <div className="questionWrapper">
          {questions.map((item) => (
            <div
              key={item.id}
              onClick={() => handleClick(item.question)}
              className="tile"
            >
              {item.question}
            </div>
          ))}
        </div>
      </div>

      {/* Right: Bot Image + Input */}
      <div className="rightSection">
        <div className="botImageWrapper">
          <Image
            src="/assets/images/rebort.webp"
            width={315}
            height={250}
            alt="bot"
            className="botImage"
            style={{ borderRadius: "5px" }}
          />
        </div>
        <div className="inputSection">
          <input
            type="text"
            value={inputQuestion}
            onKeyDown={handleKeyDown}
            onChange={(e) => setInputQuestion(e.target.value)}
            placeholder="Ask your own question"
          />
          <div className="submitButton" onClick={handleInputSubmit}>
            ➤
          </div>
        </div>
      </div>

      {/* STYLES */}
      <style jsx>{`
        .container {
          display: flex;
          padding: 20px;
          gap: 20px;
        }

        .leftSection {
          flex: 2;
        }

        .rightSection {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          animation: slideInFromRight 1.8s ease-in-out forwards; /* ⬅ slower and smoother */
        }

        @keyframes slideInFromRight {
          0% {
            transform: translateX(100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .botImage {
          border-radius: 5px;
        }

        .questionWrapper {
          display: flex;
          gap: 10px;
          max-height: 80vh;
          overflow-y: auto;
          flex-wrap: wrap;
          width: fit-content;
        }

        .tile {
          background-color: #ffffff;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 15px;
          cursor: pointer;
          transition: transform 0.2s;
          width: fit-content;
        }

        .tile:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        }

        .botImageWrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 5px;
        }

        .inputSection {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: auto;
          width: 100%;
          padding-top: 9px;
          padding-left: 20px;
          padding-right: 20px;
        }

        input {
          flex: 1;
          padding-left: 10px;
          padding-right: 10px;
          padding-top: 15px;
          padding-bottom: 15px;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 6px;
        }

        .submitButton {
          background-color: #0070f3;
          color: white;
          padding: 12px 14px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1.2rem;
          user-select: none;
        }

        .submitButton:hover {
          background-color: #005bb5;
        }
      `}</style>
    </div>
  );
};

export default QuestionTiles;
