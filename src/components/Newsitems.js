import React from 'react'

const Newsitems = (props) => {
  let { title, description, imgUrl, newsUrl, pubDate } = props

  return (

    <div className="card" style={{ width: "18rem", margin: 'auto' }}>
      <a href={newsUrl} style={{ textDecoration: "none", color: "black" }}>
        <img src={imgUrl} className="card-img-top cardImg" alt="..." />
        <div className="card-body">
          <h4>{title}</h4>
          <p className="card-text">
            {description}
          </p>
          <p className="card-text"><small className="text-muted">On {new Date(pubDate).toUTCString()}</small></p>
        </div>
      </a>
    </div>

  )
}
export default Newsitems;