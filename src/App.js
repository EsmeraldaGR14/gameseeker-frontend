import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Spinner from "./components/common/Spinner/Spinner";
import SearchResultsPage from "./components/SearchResults/SearchResults";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/searchresults" element={<SearchResultsPage />} />
          <Route path="/404" element={<h1>404 Not Found!</h1>} />
          <Route path="*" element={<h1>404 Not Found!</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
