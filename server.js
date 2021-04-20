const express = require('express');
const cors = require('cors');
require('dotenv').config();
const multer = require('multer');
const app = express();


app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/uploads', express.static(process.cwd() + '/uploads'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) =>{
      cb(null, "uploads");
  },
  filename: (req, file, cb) =>{
      cb(null, file.originalname);
  }
});
app.use(multer({storage:storageConfig}).single("upfile")); // must be same as "name" value  in <input>

app.post("/api/fileanalyse", function(req, res) {
  console.log('uploaded file:',req.file);
  res.json({
    name: req.file.originalname,
    size: req.file.size,
    type: req.file.mimetype
  });
});



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
