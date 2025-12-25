import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import type { Article } from "../../types";
import "./ArticleCard.scss";

interface ArticleCardProps {
  article: Article;
  searchKeyword: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  searchKeyword,
}) => {
  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) {
      return text;
    }

    const parts = text.split(new RegExp(`(${highlight})`, "gi"));

    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <mark key={i}>{part}</mark>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  const date = new Date(article.published_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Card className="article-card">
      <img src={article.image_url} alt={article.title} className="card-image" />

      <CardContent className="card-content">
        <div className="date-wrapper">
          <CalendarTodayIcon sx={{ fontSize: 16 }} />

          {date}
        </div>

        <Typography className="title">
          {highlightText(article.title, searchKeyword)}
        </Typography>

        <Typography className="summary">
          {highlightText(article.summary?.slice(0, 100) || "", searchKeyword)}
          ...
        </Typography>

        <Link
          to={`/article/${encodeURIComponent(article.id)}`}
          className="read-more"
        >
          Read more <ArrowForwardIcon sx={{ fontSize: 18 }} />
        </Link>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
