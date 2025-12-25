import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import type { Article } from "../../types";
import "./ArticlePage.scss";

const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (article) {
      document.title = `${article.title} | Environment News`;
    }

    return () => {
      document.title = "Environment News";
    };
  }, [article]);

  useEffect(() => {
    if (!id) {
      return;
    }

    const API_KEY = "4627ff5d-c097-449f-a90c-e842bfa3a378";
    const decodedId = decodeURIComponent(id);

    fetch(
      `https://content.guardianapis.com/${decodedId}?show-fields=thumbnail,body&api-key=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        const content = data.response.content;

        setArticle({
          id: content.id,
          title: content.webTitle,
          summary: content.fields?.body?.replace(/<[^>]*>?/gm, "") || "",
          image_url: content.fields?.thumbnail || "",
          published_at: content.webPublicationDate,
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="article-page">Loading...</div>;
  }

  if (!article) {
    return <div className="article-page">Article not found</div>;
  }

  return (
    <div className="article-page">
      <div
        className="banner-image"
        style={{ backgroundImage: `url(${article.image_url})` }}
      ></div>

      <Box className="content-container">
        <Typography
          component="h1"
          className="article-title"
          sx={{ marginBottom: "50px", fontSize: "24px" }}
        >
          {article.title}
        </Typography>

        <Typography component="p" className="article-text">
          {article.summary}
        </Typography>
      </Box>

      <Link to="/" className="back-link">
        <ArrowBackIcon sx={{ fontSize: 18 }} /> Back to homepage
      </Link>
    </div>
  );
};

export default ArticlePage;
