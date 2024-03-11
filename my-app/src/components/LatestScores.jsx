import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { useNavigate } from 'react-router'
import axios from "axios";
import { config } from "../constants";
import { Loader } from "./Loader";

const LatestScores = () => {
  const [spinner, setSpinner] = useState(false);
  const [matches, setMatches] = useState();
  // const [currentPage, setCurrentPage] = useState(1);
  const url = config.url.API_URL;

  useEffect(() => {
    const fetchPosts = async (page) => {
      setSpinner(true);
      try {
        const response = await axios.get(`${url}/api/finished-matches?page=${page}&pageSize=6`);
        const { matches } = response.data;
        setMatches(matches);
        setSpinner(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts(1);
  }, [url]);

  const sportIcon = (sport) => {
    switch (sport) {
      case "Football":
        return "🏈";
      case "Boys Soccer":
        return "⚽";
      case "Girls Soccer":
        return "⚽";
      case "Boys Basketball":
        return "🏀";
      case "Girls Basketball":
        return "🏀";
      case "Tennis":
        return "🎾";
      default:
        return "";
    }
  };

  return (
    <div className="latest-widget">
      <div className="latest-widget-content">
        <h2 className="sub-title" style={{ color: "#efc700", borderBottom: "1px solid #DCE0E7", paddingBottom: "4px" }}>
          Latest Scores
        </h2>
        {spinner ? (
          <Loader />
        ) : matches && matches.length > 0 ? (
          <>
            {matches &&
              matches.map((match) => {
                return (
                  <>
                    <div key={match._id}>
                      <div className="match-date-sport">
                        <p className="match-date">
                          {new Date(match.date).toLocaleDateString("en-us", { day: "numeric", month: "long", year: "numeric" })}
                        </p>
                        <p className="match-sport">
                          {match.sport.name} {sportIcon(match.sport.name)}
                        </p>
                      </div>
                      <div className="match-box">
                        <div className="match-team-1">
                          <Link to={`/team/${match.results[0].team.slug}`} className="team-link">
                            <img src={match.results[0].team.logo} alt={match.results[0].team.name} />
                            <p>{match.results[0].team.name.replace(/ .*/, "")}</p>
                          </Link>
                        </div>
                        <div className="match-score">
                          <p>
                            {match.results[0].score}-{match.results[1].score}
                          </p>
                          <Link to={`/`} className="match-link">
                            Learn More
                          </Link>
                        </div>
                        <div className="match-team-2">
                        <Link to={`/team/${match.results[1].team.slug}`} className="team-link">
                          <img src={match.results[1].team.logo} alt={match.results[1].team.name} />
                          <p>{match.results[1].team.name.replace(/ .*/, "")}</p>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '2rem'}}>
              <Link to={`/`} style={{color: '#efc700'}}>
                View other scores
              </Link>
            </div>
          </>
        ) : (
          <p>Loading</p>
        )}
      </div>
    </div>
  );
};

export default LatestScores;
