import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ArticleFilterByCategory() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [journalists, setJournalists] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchCategories();
    fetchJournalists();
    fetchArticles();
  }, []);

  const fetchCategories = async () => {
    const res = await axios.get('http://localhost:5000/categories');
    setCategories(res.data);
  };

  const fetchJournalists = async () => {
    const res = await axios.get('http://localhost:5000/journalists');
    setJournalists(res.data);
  };

  const fetchArticles = async () => {
    const params = {};
    if (selectedCategory) params.categoryId = selectedCategory;

    const res = await axios.get('http://localhost:5000/articles', { params });
    setArticles(res.data);
  };

  const handleApplyFilters = () => fetchArticles();

  const handleResetFilters = () => {
    setSelectedCategory('');
    fetchArticles();
  };

  const getCategoryName = (id) => {
    const c = categories.find(c => c.id === id);
    return c ? c.name : 'Unknown Category';
  };

  const getJournalistName = (id) => {
    const j = journalists.find(j => j.id === id);
    return j ? j.name : 'Unknown Journalist';
  };

  return (
    <div>
      <h2>Articles by Category</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <label>Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <button onClick={handleApplyFilters}>Apply Filters</button>
        <button onClick={handleResetFilters}>Reset Filters</button>
      </div>

      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <strong>{article.title}</strong><br />
            <small>
              By {getJournalistName(article.journalistId)} | Category: {getCategoryName(article.categoryId)}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
}
