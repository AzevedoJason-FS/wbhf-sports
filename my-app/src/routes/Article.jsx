import React from "react";
import { config } from "../constants";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import LatestScores from "../components/LatestScores";
// import SocialShare from "../components/SocialShare";
import NewsWidget from "../components/NewsWidget";

const Article = () => {
  // Get ID from URL
  const params = useParams();
  const baseURL = `${config.url.API_URL}/api/article/${params.slug}`;
  const [article, setArticle] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(baseURL)
      .then((res) => {
        setArticle(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.slug, baseURL]);

  return (
    <>
      <div className="container">
        <Header />
        <div className="main">
        <div style={{ width: "68%" }}>
            <div className="sponsor-block">
              <img src="/global-images/banner.jpeg" alt="bank" />
            </div>
            <div className="news-article">
            <Link to={`/`} style={{color: '#0083bf', marginBottom: '10px'}}>Return Home</Link>
              <h2 className="title" style={{ margin: "1rem 0 1rem 0", fontWeight: '800', fontSize: '32px' }}>
                {article.title}
              </h2>
              {!article.created_at ? <></> : (<p style={{color: "#a7a7a7",}}>Published {new Date(article.created_at).toLocaleDateString("en-us", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>)}
              <img src={article.img} alt={article.title}/>
              <p dangerouslySetInnerHTML={{__html: article.body}} />
              {/* <div className="social-share-container">
              <SocialShare url={`https://www.facebook.com/sharer/sharer.php?u=${baseURL}`} img="/icons/facebook.svg" />
              <SocialShare url={`https://twitter.com/intent/post?url=${baseURL}`} img="/icons/twitter.svg" />
              <SocialShare url={`https://www.linkedin.com/sharing/share-offsite/?url=${baseURL}`} img="/icons/linkedin.svg" />
              </div> */}
            </div>
          </div>
          <div className="right-column">
            <LatestScores />
            <NewsWidget />
          </div>
        </div>
      </div>
    </>
  );
};

export default Article;
