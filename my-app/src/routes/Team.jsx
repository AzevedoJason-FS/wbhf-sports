import React from "react";
import { config } from "../constants";
import axios from "axios";
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

  return (
    <>
      <Header />
      <div className="team-banner" id={team.slug}>
        <div className="overlay"></div>
        <div className="team-banner-content">
          <div className="team-info">
            <img src={team.logo} alt={team.name} />
            <div className="team-details">
              <h2>{team.name}</h2>
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
      <div className="team-matches-container">
        {teamMatches &&
          teamMatches.map((match) => {
            return <p>{match.sport.name}</p>;
          })}
      </div>
    </>
  );
};

export default Team;