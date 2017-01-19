const express = require('express');
const bodyParser = require('body-parser');
const Cassandra = require('cassandra-driver');
require('dotenv').config();

const authProvider = new Cassandra.auth.PlainTextAuthProvider(
  process.env.DB_USER,
  process.env.DB_PASSWORD);
const db = new Cassandra.Client({
  contactPoints: [
    '40.69.136.174',
  ],
  keyspace: 'urlinfo',
  queryOptions: {
    prepare: true,
  },
  authProvider,
});
const app = express();
const dbQuery = 'SELECT url_id, filter_level, safe FROM urls WHERE hostname = ? AND port = ? AND path = ? AND query_string = ? ALLOW FILTERING';

app.set('query parser', string => string);
app.use(bodyParser.json());

app.get(/urlinfo\/v1\/(.*):([0-9]{1,5})\/(.*)/, (req, res) => {
  const hostname = req.params[0];
  const port = req.params[1];
  const path = req.params[2];
  const queryString = `?${req.query}`;

  db.execute(dbQuery, [hostname, port, path, queryString])
    .then((result) => {
      const row = result.first();
      res.send(row);
    })
    .catch((err) => {
      res.status(502).send(err);
    });
});

app.post('/urlinfo/v1', (req, res) => {
  const urls = req.body.urls;
  const updateQuery = 'INSERT INTO urls (url_id, hostname, port, path, query_string, filter_level, safe, created, updated) VALUES (uuid(), ?, ?, ?, ?, ?, ?, now(), now())';

  Promise.all(urls.map((url) => {
    const params = [
      url.hostname,
      url.port,
      url.path,
      url.queryString,
      url.filterLevel,
      url.safe ? 1 : 0,
    ];

    return db.execute(updateQuery, params);
  }))
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.send(error);
    });
});

app.listen(3000);

