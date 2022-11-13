import React from 'react'
import { useEffect, useState } from 'react';
import Newsitems from './Newsitems'
import Spinnerloader from './Spinnerloader';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


const News = (props) => {
  const [article, setArticle] = useState([])
  const [loading, setLoading] = useState(true)
  const [mainurl, setMainurl] = useState("")
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)


  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  document.title = capitalizeFirstLetter(props.category);

  const fetchMoreData = async () => {
    setPage(page + 1)
    updateNews();
  };

  useEffect(() => {
    if (page <= 0) {
      setPage(page + 1)
      updateNews();
    }
  })
  const updateNews = async () => {
    props.setProgress(20)
    let mainurl = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api}`
    let url = '&page=' + page;
    let data = await fetch(mainurl + url);
    props.setProgress(50)
    let parseData = await data.json();
    setArticle(article.concat(parseData.articles))
    setTotalPages(parseData.totalResults)
    setLoading(false)
    setMainurl(mainurl)
    props.setProgress(100)
  }
  return (
    <div className='container' style={{ display: "flex", flexDirection: "column", alignItems: 'center' }}>
      <h2 style={{ margin: "5rem 0 2rem 0", textTransform: "capitalize"}}> NewsPlus+ - Top {props.category} Headlines</h2>
      <InfiniteScroll
        dataLength={article.length}
        next={fetchMoreData}
        hasMore={article.length <= totalPages}
        loader={<Spinnerloader />}
      >
        <div className="container">

          <div className="row">
            {article.map((element) => {
              return <div className="col-md-4 my-4">
                <Newsitems key={element.url} title={element.title ? element.title.slice(0, 45) + " ..." : " "} description={element.description ? element.description.slice(0, 75) + "... Read more" : ""} imgUrl={element.urlToImage == null ? "https://img.etimg.com/thumb/msid-93666827,width-1070,height-580,imgsize-154006,overlay-ettech/photo.jpg" : element.urlToImage} newsUrl={element.url} pubDate={element.publishedAt} />
              </div>
            })}
          </div>
        </div>
      </InfiniteScroll>

    </div>
  )
}

export default News;


News.defaultProps = {
  pageSize: 12,
  country: "in",
  category: 'technology',
}
News.propTypes = {
  pageSize: PropTypes.number,
  country: PropTypes.string,
  category: PropTypes.string,
}