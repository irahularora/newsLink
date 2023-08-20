import React, { useEffect, useState } from "react";
import Newsitems from "./Newsitems";
import Spinnerloader from "./Spinnerloader";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from "react-router-dom";
import CryptoJS from "crypto-js";

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const News = (props) => {
  document.title = capitalizeFirstLetter(props.category);
  const [article, setArticle] = useState([]);
  const location = useLocation();
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setArticle([]);
    setTotalPages(0);
    fetchMoreData();
  }, [props.searchTerm]);

  const fetchMoreData = async () => {
    setPage(page + 1);
    updateNews();
  };

  const updateNews = async () => {
    props.setProgress(20);
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get("s");
    let url = props.apiUrl + `&page=${page}`;
    if (searchTerm) {
      url = props.apiUrl + `&q=${searchTerm}`;
    }

    const EncryptionKey = process.env.REACT_APP_ENCRYPTION_KEY || "";
    const encryptedURL = CryptoJS.AES.encrypt(url, EncryptionKey).toString();

    const ApiUrl = "https://newapi.irahularora.repl.co/news"; // Replace with your actual API endpoint
    const requestData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: encryptedURL }), // Replace with the URL you want to send
    };
    let data = await fetch(ApiUrl, requestData);

    props.setProgress(50);
    if (!data.ok) {
      props.setError(true);
      props.setErrorMsg("Api Not Working!!");
    } else {
      let parseData = await data.json();
      if (parseData.articles.length === 0 && searchTerm) {
        props.setError(true);
        props.setErrorMsg("Result Not Found!!!");
      } else {
        const newArticles = [...article, ...parseData.articles];
        var totalResults = parseData.totalResults;
        if (parseData.totalResults === parseData.articles.length) {
          totalResults = 1;
        }
        setArticle(newArticles);
        setTotalPages(totalResults);
      }
    }
    props.setProgress(100);
  };

  return (
    <div
      className="container"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1
        style={{
          margin: "0rem 0 2rem 0",
          fontWeight: "700",
          textTransform: "uppercase",
          borderBottom: "solid",
        }}
      >
        Top {props.category} Headlines
      </h1>
      <InfiniteScroll
        dataLength={article.length}
        next={fetchMoreData}
        hasMore={article.length < totalPages}
        loader={<Spinnerloader />}
      >
        <div className="container">
          <div className="row">
            {article.map((element) => {
              return (
                <div className="col-md-4 my-4">
                  <Newsitems
                    key={element.url}
                    title={element.title}
                    description={element.description}
                    imgUrl={element.urlToImage}
                    newsUrl={element.url}
                    pubDate={element.publishedAt}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default News;
