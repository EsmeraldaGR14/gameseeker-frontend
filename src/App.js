import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Spinner from "./utilities/common/Spinner/Spinner";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
const SearchResultsPage = React.lazy(() => import("./components/SearchResults/SearchResults")
);

function App() {

  return (
    <div className="App">
      <React.Suspense fallback={<Spinner />}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/searchresults" element={<SearchResultsPage />} />
            <Route path="/404" element={<h1>404 Not Found!</h1>} />
            <Route path="*" element={<h1>404 Not Found!</h1>} />
          </Routes>
        </Router>
      </React.Suspense>
    </div>
  );
}

export default App;
