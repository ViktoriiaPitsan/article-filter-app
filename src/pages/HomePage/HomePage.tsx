import React, { useState } from 'react';
import ArticleCard from '../../components/ArticleCard/ArticleCard';
import SearchBar from '../../components/SearchBar';
import { useArticles } from '../../hooks/useArticles';
import './HomePage.scss';

const HomePage: React.FC = () => {
  const { articles, loading } = useArticles();
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const filteredArticles = articles
    .filter(article => {
      const keyword = searchKeyword.toLowerCase();
      const titleMatch = article.title?.toLowerCase().includes(keyword);
      const summaryMatch = article.summary?.toLowerCase().includes(keyword);

      return titleMatch || summaryMatch;
    })
    .sort((a, b) => {
      const keyword = searchKeyword.toLowerCase();
      const aInTitle = a.title?.toLowerCase().includes(keyword);
      const bInTitle = b.title?.toLowerCase().includes(keyword);

      if (aInTitle && !bInTitle) {
        return -1;
      }

      if (!aInTitle && bInTitle) {
        return 1;
      }

      return 0;
    });

  if (loading) {
    return <div className="home-container">Loading articles...</div>;
  }

  return (
    <main className="home-container">
      <section className="search-wrapper">
        <label htmlFor="search-input">
          Filter by keywords
        </label>
        <SearchBar keyword={searchKeyword} setKeyword={setSearchKeyword} />
      </section>

      <div className="results-count">
        Results: {filteredArticles.length}
      </div>

      <section className="articles-grid">
        {filteredArticles.map(article => (
          <ArticleCard
            key={article.id}
            article={article}
            searchKeyword={searchKeyword}
          />
        ))}
      </section>
    </main>
  );
};

export default HomePage;
