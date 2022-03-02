import React, {useState, useEffect} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page}&category=${props.category}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);

    props.setProgress(100);
  };
  useEffect(() => {
    document.title =
      props.category === "general"
        ? "NewsPanda - home"
        : `${props.category.charAt(0).toUpperCase() + props.category.slice(1)} - NewsPanda`;
    updateNews();
  }, []);
  // testing commit

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=${
      props.apiKey
    }&pageSize=${props.pageSize}&page=${page + 1}&category=${props.category}`;
    setPage(page + 1);
    setLoading(true);
    let data = await fetch(url);

    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setLoading(false);
  };

  return (
    <>
      <h1 className="text-center" style={{margin: "35px 0px", marginTop: "90px"}}>
        NewsPanda - Top {props.category.charAt(0).toUpperCase() + props.category.slice(1)} Headlines
      </h1>

      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={
          <h4>
            <Spinner />
          </h4>
        }
      >
        <div className="container">
          <div className="row">
            {articles.map((element, key) => {
              return (
                <div
                  className="col-md-4 "
                  key={key}
                  style={{display: "flex", justifyContent: "center"}}
                >
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    url={element.url}
                    urlToImage={element.urlToImage}
                    author={element.author}
                    date={element.publishedAt}
                    name={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};
News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
export default News;
