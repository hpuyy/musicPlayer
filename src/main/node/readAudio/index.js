let express = require('express');
let router = express.Router();

router.get('/loadSrc', function (req, res) {
  res.sendFile(req.query.url);
});

module.exports = router;
