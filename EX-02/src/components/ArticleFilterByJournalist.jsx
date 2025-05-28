import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ArticleFilterByJournalist() {
  const [articles, setArticles] = useState([]);
  const [journalists, setJournalists] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedJournalist, setSelectedJournalist] = useState('');

  useEffect(() => {
    fetchJournalists();
    fetchCategories();
    fetchArticles();
  }, []);

  const fetchJournalists = async () => {
    const res = await axios.get('http://localhost:5000/journalists');
    setJournalists(res.data);
  };

  const fetchCategories = async () => {
    const res = await axios.get('http://localhost:5000/categories');
    setCategories(res.data);
  };

  const fetchArticles = async () => {
    const params = {};
    if (selectedJournalist) params.journalistId = selectedJournalist;

    const res = await axios.get('http://localhost:5000/articles', { params });
    setArticles(res.data);
  };

  const handleApplyFilters = () => fetchArticles();

  const handleResetFilters = () => {
    setSelectedJournalist('');
    fetchArticles();
  };

  const getJournalistName = (id) => {
    const j = journalists.find(j => j.id === id);
    return j ? j.name : 'Unknown Journalist';
  };

  const getCategoryName = (id) => {
    const c = categories.find(c => c.id === id);
    return c ? c.name : 'Unknown Category';
  };

  return (
    <div>
      <h2>Articles by Journalist</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <label>Journalist:</label>
        <select
          value={selectedJournalist}
          onChange={(e) => setSelectedJournalist(e.target.value)}
        >
          <option value="">All Journalists</option>
          {journalists.map(j => (
            <option key={j.id} value={j.id}>{j.name}</option>
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
