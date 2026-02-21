const { Comment, User, News } = require('../models');

exports.addComment = async (req, res) => {
    try {
        const newsId = req.params.id;
        const { content } = req.body;
        const userId = req.user.id;

        // Verify news exists
        const news = await News.findByPk(newsId);
        if (!news) {
            return res.status(404).json({ message: 'News not found' });
        }

        const comment = await Comment.create({
            content,
            newsId,
            userId
        });

        // Fetch the created comment with user info to return to frontend
        const commentWithUser = await Comment.findByPk(comment.id, {
            include: [{ model: User, as: 'user', attributes: ['name', 'email'] }]
        });

        res.status(201).json(commentWithUser);
    } catch (err) {
        console.error('Error adding comment:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getCommentsByNews = async (req, res) => {
    try {
        const newsId = req.params.id;

        const comments = await Comment.findAll({
            where: { newsId },
            include: [{ model: User, as: 'user', attributes: ['name', 'email'] }],
            order: [['createdAt', 'ASC']]
        });

        res.json(comments);
    } catch (err) {
        console.error('Error fetching comments:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
