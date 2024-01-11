## Things to Learn
1. *Build Data Pipelines*
2. *Setup Kafka Using Docker*
3. *Use CMD Line Tools to Publish & Consume Data*
4. *Build Apache Kafka Clients Using Node.js*

### Docker Knowledge Required
- Powershell
  - `docker ps` (list running containers)
  - `docker exec -it kafka-broker /bin/bash` (log into container)

### Creating New Topic and Partition Commands
```bash
./kafla-topics.sh 
--bootstrap-server localhost:29092
--create
--topic Topic1
--partitions 1
--replication-factor 1
