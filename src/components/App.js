import React from "react";
import Nav from "./nav";

class App extends React.Component {
  
  render() {
    return(
      <div>
        <div className="header">
          <h1>ACME Bookify</h1>
          <h4>Your Personal Library</h4>
        </div>
        <Nav />
      </div>
    )
  }
}

export default App;