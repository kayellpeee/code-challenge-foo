INSERT INTO urls
  (url_id, url, safe, created, updated)
VALUES (uuid(), {
  hostname: 'test',
  port: '80',
  path: 'foo',
  query_string: '?bar=34'
  }, true, now(), now());
