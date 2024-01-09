/* eslint-disable no-unused-vars */
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./components/UserContext";
// import GameDetails from "./components/GameDetails/GameDetails";
import Spinner from "./utilities/common/Spinner/Spinner";
import Navbar from "./components/Navbar/Navbar";
// import Home from "./components/Home/Home";
// import Catalog from "./components/Catalog/Catalog";
// import Backlog from "./components/Backlog/BacklogPage";
// import Collection from "./components/Collection/CollectionPage";
import Footer from "./components/Footer/Footer";

// import CustomCursor from "./components/CustomCursor/CustomCursor";

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
// const Wishlist = React.lazy(() =>
//   import("./components/Wishlist/Wishlist")
// );
const Collection = React.lazy(() =>
  import("./components/Collection/CollectionPage")
);
const Backlog = React.lazy(() =>
  import("./components/Backlog/BacklogPage")
);
const Catalog = React.lazy(() => import("./components/Catalog/Catalog"));
const Home = React.lazy(() => import("./components/Home/Home"));
const GameDetails = React.lazy(() => import("./components/GameDetails/GameDetails"));


function App() {
  return (
    <div className="App">
      {/* <CustomCursor/> */}
      <React.Suspense fallback={<Spinner />}>
        <UserProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/searchresults" element={<SearchResultsPage />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/backlog" element={<Backlog />} />
              <Route path="/games/:id" element={<GameDetails />} />
              <Route path="/collection" element={<Collection />} />
              {/* <Route path="/wishlist" element={<Wishlist />} /> */}
              <Route path="/404" element={<h1>404 Not Found!</h1>} />
              <Route path="*" element={<h1>404 Not Found!</h1>} />
            </Routes>
            <Footer />
          </Router>
        </UserProvider>
      </React.Suspense>
    </div>
  );
}

export default App;
