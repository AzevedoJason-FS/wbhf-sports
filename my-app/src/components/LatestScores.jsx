import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { useNavigate } from 'react-router'
import axios from "axios";
import { config } from "../constants";

const LatestScores = () => {
  const [matches, setMatches] = useState();
  const url = config.url.API_URL;

  useEffect(() => {
    axios.get(url + "/api/finished-matches").then((response) => {
      setMatches(response.data.matches);
      console.log(response.data.matches);
    });
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
        {matches && matches.length > 0 ? (
          <>
            {matches &&
              matches.map((match) => {
                return (
                  <>
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
                        <img src={match.results[0].team.logo} alt={match.results[0].team.name}/>
                        <p>{match.results[0].team.name.replace(/ .*/, "")}</p>
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
                        <img src={match.results[1].team.logo} alt={match.results[1].team.name}/>
                        <p>{match.results[1].team.name.replace(/ .*/, "")}</p>
                      </div>
                    </div>
                  </>
                );
              })}
          </>
        ) : (
          <p>Loading</p>
        )}
      </div>
    </div>
  );
};

export default LatestScores;
