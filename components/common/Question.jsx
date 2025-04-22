"use client";
import { setSelectedQuestion } from "@/store/slices/questionSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/navigation";

const QuestionTiles = ({ questions }) => {
  const {  zipCode } = useSelector((state) => state.location);
  
  const dispatch = useDispatch();
  const router = useRouter();
  const [inputQuestion, setInputQuestion] = useState("");

  const handleClick = (question) => {
    const questionWithZip = `Hi! I’m looking for internet options in my area. My zip code is ${zipCode}.`;
    dispatch(setSelectedQuestion(questionWithZip));
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
    <div className="">
      {/* Left: Questions */}
      {/* <div className="leftSection">
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
      </div> */}

      {/* Right: Bot Image + Input */}
      <div className="rightSection">
        {/* <div className="botImageWrapper">
          <Image
            src="/assets/images/rebort.webp"
            width={315}
            height={250}
            alt="bot"
            className="botImage"
            style={{ borderRadius: "5px" }}
          />
        </div> */}
        <div className="inputSection">
          {/* <input
            type="text"
            value={inputQuestion}
            onKeyDown={handleKeyDown}
            onChange={(e) => setInputQuestion(e.target.value)}
            placeholder="Ask your own question"
          /> */}
          <button
            onClick={handleClick}
            type="submit"
            className="btn btn-thm src-btn">
            Search
          </button>
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
          background-color: #ff4d4d;
          color: white;
          padding: 6px 12px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1.2rem;
          user-select: none;
          width: 180px;
        }

        .submitButton:hover {
          background-color: white;
          color: #ff4d4d;
          border: 2px solid #ff4d4d;
        }
        .src-btn {
          border-radius: 8px;
    background-color: var(--color-primary);
    box-shadow: 0 1px 4px 0 rgba(255, 90, 95, .3);
    font-size: 16px;
    color: #fff;
    font-weight: 700;
    line-height: 1.2;
    height: 50px;
    width: 170px;
    transition: all .3s ease;
}
    .src-btn:hover {
    background-color: white !important;
          color: #ff4d4d;
          border: 2px solid #ff4d4d;
    }


        }
      `}</style>
    </div>
  );
};

export default QuestionTiles;
