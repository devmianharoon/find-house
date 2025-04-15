import dynamic from "next/dynamic";

export const metadata = {
  title: "About Us || FindHouse - Real Estate React Template",
  description: "FindHouse - Real Estate React Template",
};

const index = () => {
  return (
    <>
     
      <h1>Chat</h1>

  

    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
