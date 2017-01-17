const express = require('express');

const app = express();

app.get('/urlinfo/v1/:url', (req, res) => {
  const url = req.params.url;
  const body = {
    safe: true,
    url,
  };
  res.send(body);
});

app.listen(3000);

