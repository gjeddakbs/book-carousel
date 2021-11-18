import React from "react";
import classes from "../App.module.css";

const TitleAuthorField = (props) => {
  return (
    <div>
      <p className={classes["title"]}>{props.book.title}</p>
      <p className={classes["author"]}>{props.book.author}</p>
    </div>
  );
};

export default TitleAuthorField;
