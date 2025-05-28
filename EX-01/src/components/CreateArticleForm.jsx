import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ArticleForm() {
  const [form, setForm] = useState({
    title: '',
    content: '',
    journalistId: '',
    categoryId: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.content || !form.journalistId || !form.categoryId) {
      alert('Please fill all fields.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/articles', form);
      navigate('/'); 
    } catch (error) {
      console.error('Error adding article:', error);
      alert('Failed to add article.');
    }
  };

  return (
    <div>
      {/* Navigation Links */}
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '10px' }}>📄 View Articles</Link>
        <Link to="/add">➕ Add Article</Link>
      </nav>

      <h2>Articles</h2>
      <form onSubmit={handleSubmit}>
        <h3>Add New Article</h3>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          required
        /><br />
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Content"
          required
        /><br />
        <input
          name="journalistId"
          value={form.journalistId}
          onChange={handleChange}
          placeholder="Journalist ID"
          required
        /><br />
        <input
          name="categoryId"
          value={form.categoryId}
          onChange={handleChange}
          placeholder="Category ID"
          required
        /><br />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
