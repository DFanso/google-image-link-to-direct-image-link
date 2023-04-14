const express = require('express');
const ejs = require('ejs');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});
app.use(express.static('public'));
app.post('/generate', async (req, res) => {
  const shareLink = req.body.shareLink;
  try {
    const fileID = shareLink.match(/[-\w]{25,}/);
    if (fileID) {
      const directLink = `https://drive.google.com/uc?export=view&id=${fileID[0]}`;
      res.send({ directLink });
    } else {
      res.status(400).send({ error: 'Invalid sharing link' });
    }
  } catch (err) {
    res.status(500).send({ error: 'Failed to generate direct link' });
  }
});

const PORT = 1212;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
