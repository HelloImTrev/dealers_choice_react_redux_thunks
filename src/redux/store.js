import { createStore, combineReducers, applyMiddleware } from "redux";
import thunks from "redux-thunk";
import axios from "axios";

//REDUCERS
const bookReducer = (books = [], action) => {
  switch (action.type) {
    case "GET_BOOKS":
      books = action.books;
    case "DELETE_BOOK":
      books = books.filter((book) => {
        return book.id !== action.book});
    default:
      return books;
  }
};

//THUNKS
export const getBooks = () => {
  return async (dispatch) => {
    const res = await axios.get("/api/books");
    dispatch({ type: "GET_BOOKS", books: res.data });
  };
};

export const deleteBook = (book) => {
  return async (dispatch) => {
    await axios.delete(`/api/books/${book.id}`);
    dispatch({ type: "DELETE_BOOK" , book: book.id});
  };
};

//ROOT REDUCER
const reducer = combineReducers({
  books: bookReducer,
  //TODO: Add author reducer
});

const store = createStore(reducer, applyMiddleware(thunks));

export default store;
