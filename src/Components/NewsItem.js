import React from "react";

const NewsItem = (props) => {
  let {title, description, url, urlToImage, author, date, name} = props;
  return (
    <div>
      <div className="card mx-2 my-2" style={{width: "18rem"}}>
        <div>
          <span
            className="badge rounded-pill bg-success mx-1 my-1"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              position: "absolute",
              right: "0",
            }}
          >
            {name}
          </span>
        </div>
        <img
          src={
            urlToImage
              ? urlToImage
              : "https://photographylife.com/wp-content/uploads/2017/01/What-is-landscape-photography.jpg"
          }
          className="NewsItem___img"
          alt="https://live.staticflickr.com/2127/1595912304_baecfe3d12_b.jpg"
        />
        <div className="card-body">
          <h5 className="card-title">{title ? title.slice(0, 44) : ""} ...</h5>
          <p className="card-description">{description ? description.slice(0, 88) : ""}...</p>
          <p className="card-text">
            <small className="text-muted">
              By {author} updated - {new Date(date).toGMTString()} ago
            </small>
          </p>
          <a rel="noreferrer" href={url} target="_blank" className="btn btn-sm btn-dark">
            Read more
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
