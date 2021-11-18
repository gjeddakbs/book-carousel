import React from "react";
import Book from "./Book.js";
import "../index.css";
// import "./BooksList.module.css";
// import classes from "./BooksList.module.css";

const BooksList = (props) => {
  console.log("called bookslist");
  return (
    <React.Fragment>
      <div className="booklist">
        {props.books.map((book) => (
          <Book
            animate={props.animate}
            onHover={props.onHover}
            offHover={props.offHover}
            title={book.title}
            author={book.author}
            key={book.key}
            mms={book.mms}
            isbn={book.isbn}
          />
        ))}
      </div>
    </React.Fragment>
  );
};

export default BooksList;
