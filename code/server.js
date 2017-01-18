const express = require('express');
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
const Uuid = Cassandra.types.Uuid;

app.set('query parser', string => string);

app.get(/urlinfo\/v1\/(.*):([0-9]{1,5})\/(.*)/, (req, res) => {
  const hostname = req.params[0];
  const port = req.params[1];
  const path = req.params[2];
  const queryString = `?${req.query}`;

  console.log(hostname, port, path, queryString);
  db.execute(dbQuery, [hostname, port, path, queryString])
    .then((result) => {
      const row = result.first();
      res.send(row);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.listen(3000);

