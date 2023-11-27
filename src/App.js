/* eslint-disable no-unused-vars */
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GameDetails from "./components/GameDetails/GameDetails";
import Spinner from "./utilities/common/Spinner/Spinner";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Catalog from "./components/Catalog/Catalog";
const SearchResultsPage = React.lazy(() =>
  import("./components/SearchResults/SearchResults")
);
const LoginPage = React.lazy(() => import("./components/LoginPage/LoginPage"));
const SignUpPage = React.lazy(() =>
  import("./components/SignUpPage/SignUpPage")
);
const AccountPage = React.lazy(() =>
  import("./components/AccountPage/AccountPage")
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
            <Route path="/catalog" element={<Catalog />}></Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/games/:id" element={<GameDetails />}/>
            <Route path="/404" element={<h1>404 Not Found!</h1>} />
            <Route path="*" element={<h1>404 Not Found!</h1>} />
          </Routes>
        </Router>
      </React.Suspense>
    </div>
  );
}

export default App;
