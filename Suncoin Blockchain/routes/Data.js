const express = require('express');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const data = await Data.find().sort({ timestamp: -1 }).limit(100);
    res.json(data);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
