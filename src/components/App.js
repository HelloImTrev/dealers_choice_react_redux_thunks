import React from "react";
import BookList from "./bookList";
import store from "../redux/store";
import { getBooks } from "../redux/store";


class App extends React.Component {
  async componentDidMount() {
    store.dispatch(getBooks())
  }

  render() {
    return (
      <div>
        <div className="header">
          <h1>ACME Bookify</h1>
          <h4>Your Personal Library</h4>
        </div>
        <div className="container">
          <BookList />
        </div>
      </div>
    );
  }
}

export default App;
