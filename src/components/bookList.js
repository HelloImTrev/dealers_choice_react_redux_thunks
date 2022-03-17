import React from "react";
import { connect } from "react-redux";

const BookList = (props) => {
  return (
    <div className="book-list">
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
          </tr>
          {props.books.map((book) => {
            return (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    books: state.books,
    author: state.authors,
  };
}

export default connect(mapStateToProps, {})(BookList);
