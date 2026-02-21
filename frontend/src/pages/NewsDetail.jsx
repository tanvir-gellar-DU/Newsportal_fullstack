import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const NewsDetail = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [news, setNews] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [commentError, setCommentError] = useState('');

    useEffect(() => {
        const fetchNewsAndComments = async () => {
            try {
                const [newsRes, commentsRes] = await Promise.all([
                    api.get(`/news/${id}`),
                    api.get(`/news/${id}/comments`)
                ]);
                setNews(newsRes.data);
                setComments(commentsRes.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchNewsAndComments();
    }, [id]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        setCommentError('');
        try {
            const res = await api.post(`/news/${id}/comments`, { content: newComment });
            setComments([...comments, res.data]);
            setNewComment('');
        } catch (err) {
            setCommentError(err.response?.data?.message || 'Error posting comment');
        }
    };

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

            <div className="comments-section" style={{ marginTop: '40px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                <h3>Comments</h3>
                <div className="comments-list">
                    {comments.length > 0 ? comments.map(comment => (
                        <div key={comment.id} className="comment-item" style={{ marginBottom: '15px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                            <div className="comment-header" style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                                {comment.user?.name} <span style={{ fontSize: '0.85em', color: '#888', fontWeight: 'normal' }}>on {new Date(comment.createdAt).toLocaleString()}</span>
                            </div>
                            <div className="comment-body" style={{ whiteSpace: 'pre-wrap' }}>{comment.content}</div>
                        </div>
                    )) : <p>No comments yet. Be the first to comment!</p>}
                </div>

                {user ? (
                    <form onSubmit={handleCommentSubmit} className="comment-form" style={{ marginTop: '20px' }}>
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add a comment..."
                            style={{ width: '100%', padding: '12px', minHeight: '100px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ccc', resize: 'vertical' }}
                            required
                        ></textarea>
                        {commentError && <p style={{ color: 'red' }}>{commentError}</p>}
                        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Post Comment</button>
                    </form>
                ) : (
                    <p style={{ marginTop: '20px' }}><Link to="/login" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>Log in</Link> to post a comment.</p>
                )}
            </div>
        </div>
    );
};

export default NewsDetail;
