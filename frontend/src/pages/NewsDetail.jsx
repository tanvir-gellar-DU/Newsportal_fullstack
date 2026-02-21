import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

const NewsDetail = () => {
    const { id } = useParams();
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await api.get(`/news/${id}`);
                setNews(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, [id]);

    if (loading) return <div className="content">Loading...</div>;
    if (!news) return <div className="content">News not found</div>;

    return (
        <div className="news-detail-page">
            <Link to="/" className="back-link">&larr; Back to Home</Link>
            <h1>{news.title}</h1>
            <p className="category">{news.category}</p>
            <div className="author">By: {news.author?.name} on {new Date(news.createdAt).toLocaleDateString()}</div>
            {news.image && <img src={news.image} alt={news.title} className="detail-image" />}
            <div className="news-content">
                {news.content.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </div>
        </div>
    );
};

export default NewsDetail;
