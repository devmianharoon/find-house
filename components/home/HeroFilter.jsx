import GlobalHeroFilter from "../common/GlobalHeroFilter";
import QuestionTiles from "../common/Question";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setSelectedQuestion } from "@/store/slices/questionSlice";


const questions = [
  {
    id: 1,
    question:
      "What are the available internet providers and their plans in the 90210 zip code?",
  },
  { id: 2, question: "hi" },
  {
    id: 2,
    question:
      "Are there any fiber optic internet options in the 33101 zip code?",
  },
  {
    id: 3,
    question:
      "Which internet providers offer the fastest speeds in the 94105 zip code?",
  },
  {
    id: 4,
    question:
      "My zip code is 10001, what are the available internet providers and their plans?",
  },
];

const HeroFilter = () => {
   const dispatch = useDispatch();
    const router = useRouter();
    const [inputQuestion, setInputQuestion] = useState("");
  
    const handleClick = (question) => {
      // const questionWithZip = `Hi! I’m looking for internet options in my area. My zip code is ${zipCode}.`;
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
    <div className="home_content">
      {/* <div className="home-text text-center"> */}
      <h2 className="fz55 ">Best Internet Provider Companies Near Me</h2>
      {/* <p className="fz18 color-white">
                    From as low as $10 per day with limited time offer
                    discounts.
                </p> */}
      {/* </div> */}
      {/* End .home-text */}
      <QuestionTiles questions={questions} />
      <div className="moving-area">
        <h1>Moving ?</h1>
        <input type="text" placeholder="Zip Code" 
        value={inputQuestion}
        onKeyDown={handleKeyDown}
        onChange={(e) => setInputQuestion(e.target.value)}
        />
      </div>

      {/* <GlobalHeroFilter /> */}
    </div>
  );
};

export default HeroFilter;
