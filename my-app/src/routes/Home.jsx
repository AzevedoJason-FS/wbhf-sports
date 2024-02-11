import { React, useState, useEffect } from "react";
// import { useNavigate } from 'react-router'
import axios from "axios";
import { config } from "../constants";
// const _ = require("lodash");

// // const myString = "Moto killed after Hitting bUS WAS FLEEING LAW ";
// // const slug = _.kebabCase(myString);

const Home = () => {
  const [posts, setPosts] = useState();
  const url = config.url.API_URL_POSTS;

  useEffect(() => {
    axios.get(url).then((response) => {
      setPosts(response.data);
    });
  }, [url]);

  return(
    <>
      {posts && posts.length > 0 ? (
        <div id="container">
          {/* <Nav /> */}
          <div className="main_leaderboard">
            <div className="leaderboard_box">
              <p id="leaderboard_title">Leaderboard</p>
            </div>
            <div className="leaderboard">
              <div className="top3">
                {posts &&
                  posts.map((post) => {
                    return (
                      <div>
                        <p id="high_score_user">{post.title}</p>
                        <img src={post.img} alt="tennisn"/>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      ) : (
       <p>nothing</p>
      )}
    </>
  );
};

export default Home;
