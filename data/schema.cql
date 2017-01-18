USE urlinfo;

CREATE TYPE url (
  hostname text,
  port text,
  path text,
  query_string text
);

CREATE TABLE urls (
  url_id uuid PRIMARY KEY,
  url frozen <url>,
  filter_level float,
  safe boolean,
  created timeuuid,
  updated timeuuid
);
