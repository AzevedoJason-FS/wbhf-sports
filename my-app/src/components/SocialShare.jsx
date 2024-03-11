const SocialShare = (props) => {
    return (
      <a target="_blank" rel="noopener noreferrer" href={props.url} className="social-share-btn">
          <img src={props.img} alt={props.alt} />    
      </a>
    );
  };
  
  export default SocialShare;
  