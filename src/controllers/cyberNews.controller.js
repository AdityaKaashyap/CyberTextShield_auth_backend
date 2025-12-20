const { fetchCyberNews } = require("../utils/cyberNews");

exports.getCyberNews = async (req, res) => {
  try {
    const news = await fetchCyberNews();

    return res.json({
      message: "Cybercrime news fetched successfully",
      count: news.length,
      articles: news
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
