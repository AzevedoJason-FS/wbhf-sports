import { React } from "react";
import Header from "../components/Header";
import News from "../components/News";
import LatestScores from "../components/LatestScores";
import UpcomingScores from "../components/UpcomingMatches";

const Home = () => {
  return (
    <>
      <div className="container">
        <Header />
        <div className="main">
          <div style={{ width: "68%" }}>
            <div className="sponsor-block">
              <img src="/global-images/banner.jpeg" alt="bank" />
            </div>
            <News />
          </div>
          <div className="right-column">
            <LatestScores />
            <UpcomingScores />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
