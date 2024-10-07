import Article from '../models/Article.js';
import fs from 'fs-extra';
import path from 'path';

export const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.findAll({
      attributes: ['id', 'title', 'date_published'],
      order: [['date_published', 'DESC']],
    });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getArticleById = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    const filePath = path.join('articles', article.file_path);
    const content = await fs.readFile(filePath, 'utf8');
    res.json({
      title: article.title,
      date_published: article.date_published,
      content,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createArticle = async (req, res) => {
  // Implement authentication before this action
  try {
    const { title, date_published, content } = req.body;
    const safeTitle = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const fileName = `${Date.now()}-${safeTitle}.md`;
    const filePath = path.join('articles', fileName);

    // Save Markdown file
    await fs.outputFile(filePath, content);

    // Save metadata to database
    const article = await Article.create({
      title,
      date_published,
      file_path: fileName,
    });
    res.status(201).json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
