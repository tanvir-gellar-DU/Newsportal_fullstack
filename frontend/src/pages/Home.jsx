import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Home = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await api.get('/news');
                setNews(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchNews();
    }, []);

    return (
        <div className="home-page">
            <h1>Latest News</h1>
            <div className="news-grid">
                {news.map((item) => (
                    <Link to={`/news/${item.id}`} key={item.id} className="news-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                        {item.image && <img src={item.image} alt={item.title} />}
                        <h2>{item.title}</h2>
                        <p className="category">{item.category}</p>
                        <p>{item.content.substring(0, 150)}...</p>
                        <div className="author">By: {item.author?.name}</div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Home;
