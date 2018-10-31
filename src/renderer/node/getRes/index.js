let express = require('express');
let router = express.Router();
let request = require('request');
let fs = require('fs');

router.get('/res', function (req, res) {
  let url = req.query.url;
  let name = url.substring(url.lastIndexOf('/') + 1);
  const dstpath = 'C:\\Program Files\\cloud-music\\cache' + '/' + name;
  downloadUrl(url, dstpath).then(() => {
    res.sendFile(dstpath);
  });
});

function downloadUrl(url, path) {
  return new Promise((resolve) => {
    fs.exists(path, (status) => {
      if(status) resolve();
      else{
        request(url).pipe(fs.createWriteStream(path))
          .on('close', function() {
            resolve();
          });
      }
    });
  });
}

module.exports = router;
