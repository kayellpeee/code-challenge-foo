CREATE KEYSPACE urlinfo
  WITH REPLICATION = {
    'class': 'NetworkTopologyStrategy',
    'datacenter1': 2
  };
