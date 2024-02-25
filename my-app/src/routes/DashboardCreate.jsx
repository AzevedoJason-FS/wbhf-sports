import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { ToastContainer, toast } from "react-toastify";
import Editor from 'react-simple-wysiwyg';
import { config } from "../constants";
const _ = require("lodash");

const DashboardCreate = () => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const navigate = useNavigate();
  const url = config.url.API_URL;
  const [cookies, removeCookie] = useCookies([]);
  const [inputValue, setInputValue] = useState({
    location: "",
    title: "",
    body: "",
  });
  const { location, title, body } = inputValue;
  const slug = _.kebabCase(title);
  const [img, setImg] = useState();

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post("/api", { withCredentials: true });
      const { status } = data;
      return !status ? (removeCookie("token"), navigate("/login")) : <></>;
    };
    verifyCookie();

    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        multiple: false,
        maxImageFileSize: 5000000,
        cloudName: "dbqqobh8l",
        uploadPreset: "ml_default",
      },
      function (error, result) {
        if (result.event === "success") {
          setImg(result.info.secure_url);
        }
      }
    );
  }, [cookies, navigate, removeCookie]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          url + "/api/new-article",
          {
            location,
            title,
            body,
            slug,
            img,
          },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.status === 200) {
            toast.success("Article Successfuly Created", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          } else Promise.reject();
        });
    } catch (err) {
      console.log(err);
    }
    setInputValue({
      ...inputValue,
      location: "",
      title: "",
      body: "",
    });
    setImg("");
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  return (
    <div className="container">
      <Header />

      <div className="form-container">
        <Link to={`/dashboard`} style={{ color: "#0083bf", marginBottom: "2rem" }}>
          Return to dashboard
        </Link>
        <h2 className="title" style={{color: '#0e1a44'}}>Create New Article</h2>
        <div className="input-box">
          <label htmlFor="img" className="label-title">
            Image
          </label>
          <button onClick={() => widgetRef.current.open()} className="img-upload-btn">
            {img ? "Change Article Image" : "Upload Article Image"}
          </button>
        </div>
        <div className="input-box">{img ? <img src={img} style={{ width: "200px" }} alt="Article Show" /> : <></>}</div>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <label htmlFor="name" className="label-title">
              Sport
            </label>
            <input
              type="location"
              name="location"
              value={location}
              placeholder="Sport in focus"
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="input-box">
            <label htmlFor="title" className="label-title">
              Title
            </label>
            <input type="title" name="title" value={title} placeholder="article title" onChange={handleOnChange} required />
          </div>
          <div className="input-box">
            <label htmlFor="body" className="label-title">
              Body
            </label>
            {/* <textarea type="body" name="body" value={body} placeholder="article body" onChange={handleOnChange} required rows="8" /> */}
            <Editor name="body" value={body} onChange={handleOnChange} />
          </div>
          <button type="submit">Create New Article</button>
        </form>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </div>
  );
};

export default DashboardCreate;
