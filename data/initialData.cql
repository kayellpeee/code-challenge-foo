INSERT INTO urls
  (url_id, hostname, port, path, query_string, safe, created, updated)
VALUES (uuid(), 'test', '80', 'foo', '?bar=34', true, now(), now());
