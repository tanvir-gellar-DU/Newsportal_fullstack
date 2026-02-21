const { News, User } = require('../models');

exports.getAllNews = async (req, res) => {
    try {
        const news = await News.findAll({
            include: [{ model: User, as: 'author', attributes: ['name', 'email'] }],
            order: [['createdAt', 'DESC']]
        });
        res.json(news);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getNewsById = async (req, res) => {
    try {
        const news = await News.findByPk(req.params.id, {
            include: [{ model: User, as: 'author', attributes: ['name', 'email'] }]
        });
        if (!news) return res.status(404).json({ message: 'News not found' });
        res.json(news);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createNews = async (req, res) => {
    try {
        const { title, content, category, image } = req.body;
        const news = await News.create({
            title,
            content,
            category,
            image,
            authorId: req.user.id
        });
        res.status(201).json(news);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateNews = async (req, res) => {
    try {
        const { title, content, category, image } = req.body;
        let news = await News.findByPk(req.params.id);
        if (!news) return res.status(404).json({ message: 'News not found' });

        // Check ownership or admin role
        if (news.authorId !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        news = await news.update({ title, content, category, image });
        res.json(news);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteNews = async (req, res) => {
    try {
        let news = await News.findByPk(req.params.id);
        if (!news) return res.status(404).json({ message: 'News not found' });

        if (news.authorId !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        await news.destroy();
        res.json({ message: 'News deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
