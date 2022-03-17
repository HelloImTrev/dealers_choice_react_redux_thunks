import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { connect } from "react-redux";
import { deleteBook } from "../redux/store";

const BookList = (props) => {

  const books = useSelector(state => state.books);
  const dispatch = useDispatch();

  return (
    <div className="book-list">
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
          </tr>
          {books.map((book) => {
            return (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td><button onClick={() => dispatch(deleteBook(book))}>Delete</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

// const mapState = (state) => {
//   return {
//     books: state.books,
//     author: state.authors,
//   };
// }

// const mapDispatch = (dispatch) => {
//   return{
//     delete: (book) => {
//       dispatch(deleteBook(book));
//     }
//   } 
// }

//export default connect(mapState, mapDispatch)(BookList);

export default BookList;