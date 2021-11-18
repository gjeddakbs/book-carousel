const TitleAuthorField = (props) => {
  return (
    <div>
      <p>{props.book.title}</p>
      <p>{props.book.author}</p>
    </div>
  );
};

export default TitleAuthorField;
