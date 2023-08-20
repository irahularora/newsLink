import "./App.css";
import { useState } from "react";
import React from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import ErrorPage from "./components/ErrorMsg";

const routeConfig = [
  { path: "/", key: "general", category: "general" },
  { path: "/business", key: "business", category: "business" },
  { path: "/health", key: "health", category: "health" },
  { path: "/science", key: "science", category: "science" },
  { path: "/sports", key: "sports", category: "sports" },
  { path: "/entertainment", key: "entertainment", category: "entertainment" },
  { path: "/technology", key: "technology", category: "technology" },
];

const GetApiUrl = (category) => {
  let apiKey = process.env.REACT_APP_NEWAPI_KEY || "";
  const country = "in";
  return `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;
};

const App = () => {
  const [progress, setProgress] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  return (
    <div>
      
      <Router>
        <Navbar setSearchTerm={setSearchTerm} setError={setError} />
        <LoadingBar height={3} color="#f11946" progress={progress} />
        {error ? (
          <ErrorPage errorMessage={errorMsg} />
        ) : (
          <Routes>
            {routeConfig.map(({ path, key, category }) => (
              <Route
                key={key}
                exact
                path={path}
                element={
                  <News
                    key={key}
                    setError={setError}
                    setErrorMsg={setErrorMsg}
                    setProgress={setProgress}
                    apiUrl={GetApiUrl(category)}
                    searchTerm={searchTerm}
                    category={category}
                  />
                }
              />
            ))}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        )}
      </Router>
    </div>
  );
};
export default App;
