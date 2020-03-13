import React, { useState, useEffect, useCallback } from "react";
import style from "./index.module.scss";
import ArticleHeader from "./ArticleHeader";
import Swiper from "../../components/Swiper";
import Axios from "axios";

export interface IArticleProps {
  children?: React.ReactNode;
}

function Article(props: IArticleProps) {
  const [datalist, setDatalist] = useState([]);
  useEffect(() => {
    Axios.get("/api/index/swiper").then(res => {
      const { data } = res.data;
      setDatalist(datalist => (datalist = data));
    });
  }, []);
  return (
    <div className={style.article}>
      <Swiper datalist={datalist} />
      <ArticleHeader />
      {props.children}
    </div>
  );
}

export default Article;
