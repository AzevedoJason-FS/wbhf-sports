import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { useNavigate } from 'react-router'
import axios from "axios";
import { config } from "../constants";

const NewsWidget = () => {
  const [posts, setPosts] = useState();
  const url = config.url.API_URL;

  useEffect(() => {
    const fetchPosts = async (page) => {
      try {
        const response = await axios.get(`${url}/api/posts?page=${page}&pageSize=4`);
        const { posts } = response.data;
        setPosts(posts);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts(1)
  }, [url]);

  return (
    <div className="news-block-widget">
        <h2 className="sub-title" style={{ color: "#efc700" }}>
          Other Articles
        </h2>
      {posts && posts.length > 0 ? (
        <>
          {posts &&
            posts.slice(0, 6).map((post) => {
              return (
                <Link to={`/article/${post.slug}`} className="article-link" key={post.slug}>
                  <article className="article-widget">
                    <div className="article-body" style={{padding: '10px'}}>
                      <p className="location-box" style={{ backgroundColor: "#efc700" }}>
                        {post.location}
                      </p>
                      <h2>{post.title}</h2>
                      <p style={{ color: "#aeaeae" }}>
                        {new Date(post.created_at).toLocaleDateString("en-us", { day: "numeric", month: "long", year: "numeric" })}
                      </p>
                    </div>
                  </article>
                </Link>
              );
            })}
        </>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};

export default NewsWidget;
