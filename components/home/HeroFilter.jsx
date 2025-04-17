import GlobalHeroFilter from "../common/GlobalHeroFilter";
import QuestionTiles from "../common/Question";
const questions = [
    { id: 1, question: "What are the available internet providers and their plans in the 90210 zip code?" },
    { id: 2, question: "hi" },
    { id: 2, question: "Are there any fiber optic internet options in the 33101 zip code?" },
    { id: 3, question: "Which internet providers offer the fastest speeds in the 94105 zip code?" },
    { id: 4, question: "My zip code is 10001, what are the available internet providers and their plans?" },

  ];

const HeroFilter = () => {
    return (
        <div className="home_content">
            {/* <div className="home-text text-center"> */}
                <h2 className="fz55 text-center ">Find the Right Internet Plan Fast</h2>
                {/* <p className="fz18 color-white">
                    From as low as $10 per day with limited time offer
                    discounts.
                </p> */}
            {/* </div> */}
            {/* End .home-text */}
            <QuestionTiles questions={questions} />

            <GlobalHeroFilter />
        </div>
    );
};

export default HeroFilter;
