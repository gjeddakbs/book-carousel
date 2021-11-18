import React, { useState, useEffect, useCallback } from "react";
import BooksList from "./components/BooksList";
import classes from "./App.module.css";
import TitleAuthorField from "./components/TitleAuthorField";

function App() {
  const [booksList, setBooksList] = useState([]);
  const [animateClass, setAnimateClass] = useState();
  const [animating, setAnimating] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [hoveredBook, setHoveredBook] = useState({});

  const fetchBooks = useCallback(async () => {
    try {
      setStatusMessage("Loading...");
      const response = await fetch(
        "https://frozen-stream-55880.herokuapp.com/xmltoJSON"
      );

      const data = await response.json();

      const loadedBooks = [];
      if (loadedBooks) {
        setStatusMessage("");
      }

      for (const key in data.RS.R) {
        loadedBooks.push({
          title: data.RS.R[key].C1,
          author: data.RS.R[key].C2,
          mms: data.RS.R[key].C3,
          isbn: data.RS.R[key].C4,
          key: data.RS.R[key].C3,
        });
      }
      setBooksList(loadedBooks);
    } catch (e) {
      console.log(e);
      setStatusMessage("Error loading books");
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const pushPop = () => {
    console.log("PUSHPOPLEFT");

    setAnimateClass("left");
    setAnimating(true);
    setTimeout(() => {
      let firstBook = booksList.shift();
      booksList.push(firstBook);

      //Om en vil scrolle gjennom flere bøker kan denne metoden brukes. Animasjonstiden må sannsynligvis endres.
      // let firstTwoBooks = booksList.splice(0, 2);
      // console.log(booksList);
      // console.log(firstTwoBooks);
      // firstTwoBooks.forEach((book) => {
      //   booksList.push(book);
      // });

      let updatedBooks = [...booksList];

      setBooksList(updatedBooks);
      setAnimateClass(null);
      setAnimating(false);
    }, 1000);
  };

  const popPush = () => {
    setAnimateClass("right");
    setAnimating(true);
    setTimeout(() => {
      console.log("called animating right timeoutfunction");

      let firstBook = booksList.pop();
      booksList.unshift(firstBook);
      let updatedBooks = [...booksList];
      setBooksList(updatedBooks);
      setAnimateClass(null);
      setAnimating(false);
    }, 1000);
  };

  const onHover = (book) => {
    setHoveredBook(book);
  };

  const offHover = () => {
    setHoveredBook({});
  };

  // const hooverLeftHandler = () => {
  //   setHooverLeftAnimation((hooverLeftAnimation) => !hooverLeftAnimation);
  // };

  // const onHoverStarterLeft = () => {
  //   console.log("called onhoverstarterleft");
  //   setInterval(pushPop, 2020);
  // };
  // const offHoverStopper = () => {
  //   console.log("called off");
  // };

  // useEffect(() => {
  //   let leftInterval = setInterval(pushPop, intervalTime);
  //   return () => {
  //     console.log("når skjer dette");
  //     clearInterval(leftInterval);
  //   };
  // }, []);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     pushPop();
  //   }, intervalTime);

  //   return () => clearInterval(interval);
  // });

  return (
    <div className={classes["karusell-div"]}>
      <p>Våre mest utlånte</p>

      <div className={classes["btn-carousel"]}>
        <button
          className={classes["button-left"]}
          onClick={pushPop}
          disabled={animating}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z" />
          </svg>
        </button>

        <button
          className={classes["button-right"]}
          onClick={popPush}
          disabled={animating}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z" />
          </svg>
        </button>
        <BooksList
          animate={animateClass}
          onHover={onHover}
          offHover={offHover}
          books={booksList}
        />
      </div>

      {statusMessage && <p>{statusMessage}</p>}

      <div className={classes["title-author"]}>
        <TitleAuthorField book={hoveredBook} />
      </div>
    </div>
  );
}

export default App;
