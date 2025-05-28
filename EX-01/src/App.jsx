import { Routes, Route } from 'react-router-dom';
import ArticleList from './components/ArticleList';
import ArticlePage from './components/ArticleViewer';
import ArticleForm from './components/CreateArticleForm';
import UpdateArticleForm from './components/UpdateArticleForm';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ArticleList />} />
      <Route path="/add" element={<ArticleForm />} />
      <Route path="/articles/:id" element={<ArticlePage />} />
      <Route path="/articles/update/:id" element={<UpdateArticleForm />} />
    </Routes>
  );
}
