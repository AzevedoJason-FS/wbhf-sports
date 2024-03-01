import React from "react";
import { config } from "../constants";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

const Team = () => {
  const params = useParams();
  const url = `${config.url.API_URL}/api/team/${params.teamSlug}`;
  const [team, setTeam] = React.useState({});
  const [social, setSocial] = React.useState([]);
  const [teamMatches, setTeamMatches] = React.useState([]);

  React.useEffect(() => {
    const getTeam = () => {
      axios
        .get(url)
        .then((res) => {
          setTeam(res.data.Team[0]);
          setSocial(res.data.Team[0].social);
          axios
            .get(`${config.url.API_URL}/api/matches/${res.data.Team[0]._id}`)
            .then((res) => {
              setTeamMatches(res.data.matches);
              console.log(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getTeam();
  }, [params.slug, url]);

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
        return ""
    }
  };

  return (
    <>
      <div className="team-matches-container">
        <Header />
        <div className="team-banner" id={team.slug}>
          <div className="overlay"></div>
          <div className="team-banner-content">
            <div className="team-info">
              <img src={team.logo} alt={team.name} className="team-logo"/>
              <div className="team-details">
                <h2 className="title">{team.name}</h2>
                <p>{team.town}</p>
                <div className="team-socials">
                  {social &&
                    social.map((social) => {
                      return (
                        <a target="_blank" rel="noopener noreferrer" href={social.link}>
                          <img src={`/global-images/${social.name}.svg`} alt={social.name} />
                        </a>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="team-matches">
          <div style={{ width: "100%", background: "white", borderRadius: "10px", marginTop: "2rem", padding: "20px 20px" }}>
            <h2 className="sub-title" style={{ color: "#efc700", borderBottom: "1px solid #DCE0E7", paddingBottom: "10px" }}>
              Latest Scores
            </h2>
            {teamMatches &&
              teamMatches.map((match) => {
                return (
                  <>
                    <div style={{ display: "flex", flexDirection: "column", margin: "1rem auto 1rem auto", width: "100%" }}>
                      <div>
                        <div className="match-date-sport">
                          <p className="match-date">
                            {new Date(match.date).toLocaleDateString("en-us", { day: "numeric", month: "long", year: "numeric" })}
                          </p>
                          <p className="match-sport">
                            {match.sport.name} {sportIcon(match.sport.name)}
                          </p>
                        </div>
                        <div className="match-box" style={{ justifyContent: "space-around" }}>
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
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
          <div style={{ width: "40%", background: "white", borderRadius: "10px", marginTop: "2rem", padding: "20px 20px" }}>
            <h2 className="sub-title" style={{ color: "#efc700", borderBottom: "1px solid #DCE0E7", paddingBottom: "10px" }}>
              {team.name} Related News
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Team;
