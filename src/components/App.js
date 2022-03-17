import axios from "axios";
import React from "react";
import BookList from "./bookList";
import store from "../redux/store";
import Nav from "./nav";

class App extends React.Component {
  async componentDidMount() {
    let res = await axios.get("/api/books");
    store.dispatch({ type: "GET_BOOKS", books: res.data });
  }

  render() {
    return (
      <div>
        <div className="header">
          <h1>ACME Bookify</h1>
          <h4>Your Personal Library</h4>
        </div>
        <div className="nav-container">{/* <Nav /> */}</div>
        <div className="container">
          <BookList />
        </div>
      </div>
    );
  }
}

export default App;
