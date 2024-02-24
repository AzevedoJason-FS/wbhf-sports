import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { useNavigate } from 'react-router'
import axios from "axios";
import { config } from "../constants";

const NewsWidget = () => {
  const [posts, setPosts] = useState();
  const url = config.url.API_URL;

  useEffect(() => {
    axios.get(url + "/api/posts").then((response) => {
      setPosts(response.data);
    });
  }, [url]);

  return (
    <div className="news-block-widget">
        <h2 className="sub-title" style={{ color: "#efc700", borderBottom: "1px solid #DCE0E7", paddingBottom: "4px" }}>
          Other Articles
        </h2>
      {posts && posts.length > 0 ? (
        <>
          {posts &&
            posts.slice(0, 6).map((post) => {
              return (
                <Link to={`/article/${post.slug}`} className="article-link" key={post.slug}>
                  <article className="article-widget">
                    <div className="article-body" style={{borderBottom: '1px solid #dce0e7'}}>
                      <p className="location-box" style={{ backgroundColor: "#efc700" }}>
                        {post.location}
                      </p>
                      <h2>{post.title}</h2>
                      <p>{post.body}</p>
                      <p style={{ color: "#6b6b6b" }}>
                        {new Date(post.created_at).toLocaleDateString("en-us", { day: "numeric", month: "long", year: "numeric" })}
                      </p>
                    </div>
                  </article>
                </Link>
              );
            })}
        </>
      ) : (
        <p>nothing</p>
      )}
    </div>
  );
};

export default NewsWidget;
