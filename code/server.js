const express = require('express');
const Cassandra = require('cassandra-driver');
require('dotenv').config();

const authProvider = new Cassandra.auth.PlainTextAuthProvider(
  process.env.DB_USER,
  process.env.DB_PASSWORD,
);
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
const dbQuery = 'SELECT url_id, filter_level, safe FROM urls WHERE url_id = ?';
const Uuid = Cassandra.types.Uuid;

app.set('query parser', string => string);

app.get(/urlinfo\/v1\/(.*):([0-9]{1,5})\/(.*)/, (req, res) => {
  const hostname = req.params[0];
  const port = req.params[1];
  const path = req.params[2];
  const query_string = req.query;

  const url = {
    hostname,
    port,
    path,
    query_string,
  };

  console.log('querying db');
  db.execute(dbQuery, ['6f83c85c-9264-48cf-b2b2-0326aff5f510'])
    .then((result) => {
      console.log('back from db');
      const row = result.first();
      console.log(row);
    })
    .catch((err) => {
      console.log(err);
    });

  const body = {
    safe: true,
    url,
  };
  res.send(body);
});

app.listen(3000);

