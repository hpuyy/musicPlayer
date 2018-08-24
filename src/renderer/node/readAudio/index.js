let express = require('express');
let router = express.Router();

router.get('/loadsrc', function (req, res) {
  res.sendFile(req.query.url);
});

module.exports = router;
