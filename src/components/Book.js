import React, { useState } from "react";
// import classes from "./Book.module.css";
// import "./BooksList.module.css";
import "../index.css";
const Book = (props) => {
  const [hovered, setHovered] = useState(false);

  const onHoverHandler = () => {
    setHovered(true);
    // props.onHover();
    console.log("onhover" + hovered);
  };
  const offHoverHandler = () => {
    setHovered(false);
    // props.offHover();
  };

  const onTouchHandler = () => {
    setHovered(true);
    // props.onHover();
  };
  const offTouchHandler = () => {
    setHovered(false);
    // props.offHover();
  };

  const isbn = props.isbn.join("").split(";")[0];

  const bookCoverUrl =
    "https://innhold.bibsys.no/bilde/forside/?size=mini&id=" + isbn + ".jpg";

  const searchLink = `https://bibsys-almaprimo.hosted.exlibrisgroup.com/primo-explore/search?query=any,contains,${props.mms}&tab=default_tab&search_scope=default_scope&vid=HH&offset=0`;

  return (
    <React.Fragment>
      <a
        className={`image ${props.animate ? props.animate : ""}`}
        href={searchLink}
      >
        {/* <a className={classes["image"]} href={searchLink}> */}
        <img
          src={bookCoverUrl}
          alt="Book cover"
          onTouchStart={onTouchHandler}
          onTouchEnd={offTouchHandler}
          onMouseEnter={onHoverHandler}
          onMouseLeave={offHoverHandler}
          onMouseOver={onHoverHandler}
        />
      </a>
      {hovered && (
        <div className="hovered">
          {props.title} <br />
          {props.author}
        </div>
      )}
      {/* <li>{props.title}</li>
      <li>{props.author}</li>
      <li>{props.isbn}</li>
      <li>{props.mms}</li> */}
    </React.Fragment>
  );
};

export default Book;
