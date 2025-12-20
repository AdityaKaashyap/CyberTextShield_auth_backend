const axios = require("axios");

const NEWS_API_KEY = process.env.NEWS_API_KEY;

const CYBER_KEYWORDS = [
  "cyber attack",
  "data breach",
  "phishing",
  "ransomware",
  "malware",
  "hacking",
  "cyber crime",
  "bank fraud",
  "UPI fraud",
  "digital scam"
];

exports.fetchCyberNews = async () => {
  try {
    const query = CYBER_KEYWORDS.join(" OR ");

    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
      query
    )}&language=en&sortBy=publishedAt&pageSize=10`;

    const response = await axios.get(url, {
      headers: {
        "X-Api-Key": NEWS_API_KEY
      }
    });

    return response.data.articles.map(article => ({
      title: article.title,
      description: article.description,
      source: article.source.name,
      url: article.url,
      published_at: article.publishedAt
    }));

  } catch (err) {
    console.error("Cyber News Fetch Error:", err.message);
    throw new Error("Failed to fetch cybercrime news");
  }
};
