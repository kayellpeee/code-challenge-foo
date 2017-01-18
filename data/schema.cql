USE urlinfo;

CREATE TABLE urls (
  url_id uuid PRIMARY KEY,
  hostname text,
  port text,
  path text,
  query_string text,
  filter_level float,
  safe boolean,
  created timeuuid,
  updated timeuuid
);

CREATE INDEX urls_index_hostname ON urls (hostname);
CREATE INDEX urls_index_path ON urls (path);
