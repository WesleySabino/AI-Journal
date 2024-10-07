import express from 'express';
const router = express.Router();
import * as ArticleController from '../controllers/ArticleController.js';

router.get('/', ArticleController.getAllArticles);
router.get('/:id', ArticleController.getArticleById);
router.post('/', ArticleController.createArticle); // Should be protected

export default router;
