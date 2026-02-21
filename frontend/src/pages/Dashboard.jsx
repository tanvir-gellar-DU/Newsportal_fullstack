import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
    const { user, token } = useAuth();
    const [news, setNews] = useState([]);
    const [formData, setFormData] = useState({ title: '', content: '', category: '', image: '' });
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) navigate('/login');
        fetchMyNews();
    }, [token]);

    const fetchMyNews = async () => {
        try {
            const res = await api.get('/news');
            // In a real app, maybe filter by author on server or client
            setNews(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/news', formData);
            setFormData({ title: '', content: '', category: '', image: '' });
            fetchMyNews();
        } catch (err) {
            alert('Failed to create news');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await api.delete(`/news/${id}`);
                fetchMyNews();
            } catch (err) {
                alert('Failed to delete');
            }
        }
    };

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <p>Welcome, {user?.name}</p>

            {(user?.role === 'admin' || user?.role === 'editor') && (
                <section className="create-news">
                    <h3>Create News</h3>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                        <textarea placeholder="Content" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} required></textarea>
                        <input type="text" placeholder="Category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
                        <input type="text" placeholder="Image URL" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} />
                        <button type="submit">Publish</button>
                    </form>
                </section>
            )}

            <section className="my-news">
                <h3>Latest News</h3>
                <div className="news-grid">
                    {news.map(item => (
                        <div key={item.id} className="news-card">
                            <Link to={`/news/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                {item.image && <img src={item.image} alt={item.title} />}
                                <h2>{item.title}</h2>
                                <p className="category">{item.category}</p>
                                <p>{item.content.substring(0, 100)}...</p>
                            </Link>
                            {(user?.role === 'admin' || item.authorId === user?.id) && (
                                <div style={{ padding: '1rem', borderTop: '1px solid #eee', textAlign: 'right' }}>
                                    <button onClick={() => handleDelete(item.id)} className="delete-btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem' }}>Delete</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
