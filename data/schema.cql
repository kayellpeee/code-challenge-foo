USE urlinfo;

CREATE TABLE urls (
  url_id uuid PRIMARY KEY,
  hostname text,
  port text,
  path text,
  query_string text
  filter_level float,
  safe boolean,
  created timeuuid,
  updated timeuuid
);
