---
title: BackEnd
---

## Pagination
#### Limit/Offset
you have response with `{ total: number }`(number of all elements) and request with `{ limit: number, offset: number }`(how many per page, offset from start)

pros:
- easy to make back/forward tables on front-end
cons:
- unoptimized on DB side
- hard to scale

#### PageToken(NextPageToken)
you have response with `{ next_page_token }`(beginning of next part of data) and request with `{ page_token }`(sets beginning of next part of data)

pros:
- infinitely scalable on back-end
- lightweight for DB
cons:
- harder to deal with on front-end
- possibility of corner cases
- token should be encrypted with custom algorithm for safety

## Docker
notes:
- clean-up package manager's cache to reduce image size
- container runs root user, from security standpoint it might be better to use non-root one
- structure
	- Dockerfile defines how to create/build image, that is stored in some registry, pulled on needed machine and can be built into self-contained container with needed envs
- use existing docker images as bases for your env (ex: clean Node image)
- container will loose all data inside after been stopped and removed
	- to overcome mount external storage (can be even shared between containers)
	- use volumes for container managed folder OR binds for container to access some files
- docker caches each layer (defined by command) when building image
- reduce image size by:
	- using minimalistic base images (alpine)
	- using multi-staged builds
	- removing redundant files
	- combining commands to reduce layers number
- tag your images on CI/CD level, by adding commit hashes, build dates, semantic release versions
- security:
	- use secure docker image (up to date, official)
	- execute only secure source code
	- define proper access control for machine resources (least privilege)
	- monitor for strange behavior
	- ensure audits
	- limit available resources
- CLI
	- containers:
		- docker run
			- combines create and start operations
			- -d used to run in bg
		- docker ps // ls containers
		- docker stop
		- docker exec // go into container
	- network:
		- docker network create
		- docker network ls
		- docker network connect // attach container to network
		- docker run -p <host_port>:<container_port> // run with port binding
	- volume:
		- docker volume create
		- docker volume ls
		- docker run -v // run with volume mounted
	- image:
		- docker build -t <image_name> .
		- docker pull // pull image from remote
- network types:
	- bridge - isolated channel to communicate with container (through some mapped port)
	- host - container uses host network directly
	- none - isolated container
	- overlay - network over several hosts (for Docker Swarm)
	- macvlan & ipvlan - container is treated as separate device with Mac OR as IP address under parent's Mac
- docker compose is used to ran several containers, define networks, define volumes etc in YAML format
- use hot reload utils and bind mounts for hot reload
- containers can be used for tests

## SQL
### Syntax
keywords:
- SELECT - select data
	- FROM - specify table(s)
- INSERT INTO - add 1 to N of new data
- UPDATE - update 1 to N data entry (filtered with WHERE)
- DELETE - delete data (filtered with WHERE)
- WHERE - filter
- HAVING - filter on groups
- ORDER BY - sort
	- ASC (default) or DESC
- JOIN - data combination from different tables
	- INNER - intersection of two tables
	- LEFT - all left rows and matched right (or null)
	- RIGHT - all right rows and matched left (or null)
	- FULL - join both tables (with null placeholders on match miss)
	- SELF - match table's columns against itself
	- CROSS - returns all possible combinations of tables
	- UNION - return deduplicated set of both tables (only for same number of columns with same data types)
- GROUP BY - group data by some param
	- use in combination with aggregate fns
- \---
- CREATE - create non-data item (table)
- ALTER - modify non-data item
- DROP - delete non-data item
- TRUNCATE - clear non-data item
- \---
- COUNT() - count rows
- SUM() - add values
- AVG() - calculate the average
- MIN() - find the minimum value
- MAX()-  find the maximum value
- \---
- AS - alias some definition
- WITH _ AS () - alias result of query

operators:
- arithmetic
- comparison
- logical (AND, OR, NOT)
	- combine conditions in query
- set (UNION, INTERSECT, EXCEPT)

notes:
- keywords are uppercased for readability
- SELECT, INSERT, UPDATE, and DELETE are part of Data Manipulation Language (DML), a subset of SQL
- CREATE, ALTER, DROP, and TRUNCATE are part of Data Definition Language (DDL), a subset of SQL
- COUNT(), SUM(), AVG(), MIN(), and MAX() are aggregate queries that reduce data to single row within a group of rows
	- all can be combined with WHERE
	- SUM, AVG, MIN, MAX ignore nulls
	- MIN and MAX will work based on dictionary order for strings 

### Data
types:
- numeric: INTEGER, DECIMAL
- strings: CHAR, VARCHAR
- unicode strings: NVARCHAR
- date-time: DATE, TIMESTAMP
- binary: BINARY
- miscellaneous: BLOB, JSONB

constraints:
- PRIMARY KEY - uniq, not null, can be composed
- FOREIGN KEY
- UNIQUE - force uniqueness across the column
- CHECK - custom rule to enforce on data
- NOT NULL
