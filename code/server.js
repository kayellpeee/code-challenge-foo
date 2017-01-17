const express = require('express');

const app = express();

app.set('query parser', string => string);

app.get(/urlinfo\/v1\/(.*):([0-9]{1,5})\/(.*)/, (req, res) => {
  const hostname = req.params[0];
  const port = req.params[1];
  const path = req.params[2];
  const queryString = req.query;

  let url = `${hostname}:${port}/${path}`;
  if (queryString) {
    url += `?${queryString}`;
  }
  const body = {
    safe: true,
    url,
  };
  res.send(body);
});

app.listen(3000);

