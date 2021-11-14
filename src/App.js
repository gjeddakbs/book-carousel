import React, { useState, useEffect, useCallback } from "react";
import BooksList from "./components/BooksList";
import classes from "./App.module.css";

function App() {
  const [booksList, setBooksList] = useState([]);
  const [hooverLeftAnimation, setHooverLeftAnimation] = useState(false);
  const [animateClass, setAnimateClass] = useState();
  const [animating, setAnimating] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  // setBooksList([]);

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
        // console.log();
        // console.log(data[key].R);
        // console.log("1");
        // console.log(key[R]);
      }
      setBooksList(loadedBooks);
      // distributeBooks(loadedBooks);
      // console.log(data);
    } catch (e) {
      console.log(e);
      setStatusMessage("Error loading books");
    }
  }, []);

  // const distributeBooks = (bookArr) => {
  //   bookArr.forEach((element) => {
  //     setBooksList((oldValue) => [...oldValue, element]);
  //   });
  // };

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const pushPop = () => {
    console.log("PUSHPOPLEFT");
    console.log(hooverLeftAnimation);

    setAnimateClass("left");
    setAnimating(true);
    setTimeout(() => {
      // let firstBook = booksList.shift();
      // booksList.push(firstBook);
      console.log(booksList.length);
      let firstTwoBooks = booksList.splice(0, 2);
      console.log(booksList);
      console.log(firstTwoBooks);
      firstTwoBooks.forEach((book) => {
        booksList.push(book);
      });
      console.log(booksList);
      let updatedBooks = [...booksList];

      setBooksList(updatedBooks);
      setAnimateClass(null);
      setAnimating(false);
    }, 2000);
  };

  // useEffect(() => {
  //   pushPop();
  // });

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
      {/* <button onClick={fetchBooks}>Fetch books</button> */}
      <BooksList
        animate={animateClass}
        // onHover={onHoverStopper}
        // offHover={offHoverStarter}
        books={booksList}
      />
      <div className={classes["buttons"]}>
        {!statusMessage && (
          <div>
            <button
              onClick={pushPop}
              // disabled={animating}
              onMouseOver={() => setHooverLeftAnimation(true)}
              onMouseLeave={() => {
                console.log("onmouseleave");
                setHooverLeftAnimation(false);
              }}
            >
              left
            </button>
            <button onClick={popPush} disabled={animating}>
              right
            </button>
          </div>
        )}
        {/* <p
          onMouseOver={() => (repeater = setInterval(pushPop, 1020))}
          onMouseLeave={clearInterval(repeater)}
        >
          BÆSJ
        </p> */}
        {statusMessage && <p>{statusMessage}</p>}
      </div>
    </div>
  );
}

export default App;
