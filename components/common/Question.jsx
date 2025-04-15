// components/QuestionTiles.js
"use client";
import { setSelectedQuestion } from "@/store/slices/questionSlice";
import Link from "next/link";
import { useDispatch } from "react-redux";

const QuestionTiles = ({ questions }) => {
  const dispatch = useDispatch();
  const handleClick = (question) => {
    dispatch(setSelectedQuestion(question));
  };
  return (
    <div>
      <div className="questionWrapper">
        {questions.map((item) => (
          <div key={item.id} className="tile">
            <Link href={"/chat"} onClick={handleClick(item.question)}>
              {item.question}
            </Link>
          </div>
        ))}
      </div>
      <style jsx>{`
        .questionWrapper {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          padding: 20px;
          background-color: #f5f5f5;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
          fonst-size: 1rem;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

export default QuestionTiles;
