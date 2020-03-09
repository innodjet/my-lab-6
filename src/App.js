import React from "react";
import "./App.css";
import Nav from "./Components/Nav";
import Footer from "./Components/Footer";
import Visualization from "./Components/Visualization";

function App() {
  return (
    <div className="App">
      <Nav></Nav>
      <Visualization></Visualization>
      <Footer></Footer>
    </div>
  );
}

export default App;
