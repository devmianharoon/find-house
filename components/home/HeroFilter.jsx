import GlobalHeroFilter from "../common/GlobalHeroFilter";
import QuestionTiles from "../common/Question";
const questions = [
    { id: 0, question: "hi" },
    { id: 1, question: "What are the available internet providers and their plans in the 90210 zip code?" },
    { id: 2, question: "Which cable TV services are offered in the 60601 zip code?" },
    { id: 3, question: "Are there any fiber optic internet options in the 33101 zip code?" },
    { id: 4, question: "What are the cheapest phone service providers in the 10001 zip code?" },
    { id: 5, question: "Which internet providers offer the fastest speeds in the 94105 zip code?" },
    { id: 6, question: "Are there any bundle deals for TV and internet in the 77002 zip code?" },
    { id: 7, question: "What satellite TV providers are available in the 85001 zip code?" },
    { id: 8, question: "Which mobile carriers have the best coverage in the 30303 zip code?" },
    { id: 9, question: "Are there any low-cost internet plans for seniors in the 98101 zip code?" },
    { id: 10, question: "What are the installation fees for internet services in the 20001 zip code?" },
    { id: 11, question: "Which providers offer unlimited data plans in the 92101 zip code?" },
    { id: 12, question: "Are there any internet providers with no contract in the 80202 zip code?" },
    { id: 13, question: "What streaming services are bundled with internet plans in the 19103 zip code?" },
    { id: 14, question: "Which companies provide business internet in the 46204 zip code?" },
 
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

            {/* <GlobalHeroFilter /> */}
            <QuestionTiles questions={questions} />
        </div>
    );
};

export default HeroFilter;
