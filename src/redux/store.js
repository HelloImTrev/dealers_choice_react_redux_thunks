import { createStore, combineReducers, applyMiddleware } from "redux";
import thunks from "redux-thunk";
import axios from "axios";

const bookReducer = (books = [], action) => {
  switch(action.type) {
    case "GET_BOOKS":
      books = action.books;
    case "DELETE_BOOK":
      books = books.filter(book => book.id !== action.book)
    default:
      return books
  }
};

export const getBooks = () => {
  return async (dispatch) => {
    const res = await axios.get('/api/books');
    dispatch({ type: "GET_BOOKS", books: res.data})
  }
}

const reducer = combineReducers({
  books: bookReducer,
  //TODO: Add author reducer
})

const store = createStore(reducer, applyMiddleware(thunks));

export default store;