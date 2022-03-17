import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axios from "axios";

const bookReducer = (books = [], action) => {
  switch(action.type) {
    case "GET_BOOKS":
      books = action.books;
    default:
      return books
  }
};

const authorReducer = (authors = ['Trevor', 'Latimer'], action) => {
  switch(action.type){
    default:
      return authors
  }
}

const reducer = combineReducers({
  books: bookReducer,
  authors: authorReducer
})

const store = createStore(reducer, applyMiddleware(thunk));

export default store;