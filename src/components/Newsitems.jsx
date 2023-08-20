import React from "react";

const Newsitems = (props) => {
  let { title, description, newsUrl, pubDate } = props;

  const imgURL = props.imgUrl || "https://img.etimg.com/thumb/msid-93666827,width-1070,height-580,imgsize-154006,overlay-ettech/photo.jpg" 

  return (
    <div className="card" style={{ width: "18rem", margin: "auto" }}>
      <a href={newsUrl} target="_blank" rel="noreferrer" style={{ textDecoration: "none", color: "black" }}>
        <img src={imgURL} className="card-img-top cardImg" alt="..." />
        <div className="card-body">
          <h4>{title&&title.slice(0, 45)} ...</h4>
          <p className="card-text">{description&&description.slice(0, 75)}... Read more</p>
          <p className="card-text">
            <small className="text-muted">
              On {new Date(pubDate).toUTCString()}
            </small>
          </p>
        </div>
      </a>
    </div>
  );
};
export default Newsitems;
