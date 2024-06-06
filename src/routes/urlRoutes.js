const express = require('express');
const { handleGenerateNewShortUrl, handleRedirectShortUrl, handleGetAnalytics } = require("../controllers/urlController")

const router = express.Router();

router.post("/", handleGenerateNewShortUrl);

router.get('/:shortId', handleRedirectShortUrl )

router.get('/analytics/:shortId', handleGetAnalytics )

module.exports = router;
