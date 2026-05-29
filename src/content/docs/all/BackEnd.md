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
#### Syntax
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
- WITH _ AS () - alias result of query (Common Table Expression)
- \---
- GRANT/REVOKE - add/remove permission from user
- \---
- PIVOT - transform rows into columns
- UNPIVOT - revers of PIVOT
- \---
- WITH RECURSIVE - makes query execute recursively until condition is met OR MAXRECURSION option hit

operators:
- arithmetic
- comparison
- logical (combine conditions in query)
	- AND
	- OR
	- NOT
	- CASE+END with WHEN+THEN and ELSE
	- NULLIF(expr1, expr2) // if val1 == val2 -> null otherwise val1
	- COALESCE(...exprN) // returns first non null val in passed expressions
- set (UNION, INTERSECT, EXCEPT)
- math (FLOOR, ABS, MOD, ROUND, CEILING)
- string (LENGTH, CHAR_LENGTH, REPLACE, LOWER, UPPER, SUBSTRING)
- date (DATEPART (extract some part from date), DATEADD)
- window fns
	- ROW_NUMBER - assign incremental uniq integer for selected set with optional partitioning (use-case: add IDs, find Nth number)
	- LEAD/LAG - show next/prev value relative to current one by N steps with fallback (default is NULL)
	- RANK/DENSE_RANK - give each entry rank (with/without gap on same values) based on ordering

notes:
- keywords are uppercased for readability
- SELECT, INSERT, UPDATE, and DELETE are part of Data Manipulation Language (DML), a subset of SQL
- CREATE, ALTER, DROP, and TRUNCATE are part of Data Definition Language (DDL), a subset of SQL
- COUNT(), SUM(), AVG(), MIN(), and MAX() are aggregate queries that reduce data to single row within a group of rows
	- all can be combined with WHERE
	- SUM, AVG, MIN, MAX ignore nulls
	- MIN and MAX will work based on dictionary order for strings
- query can be executed as part of other query (subquery)
	- use-cases: dynamic criteria, comparing sets etc
	- it can be nested (result used by outer query) OR correlated (subquery executed per each row of query)
- be aware that functionality or syntax can vary between implementations
- DB can store functions (do input->output computation) and procedures (ready-made queries) for reusability

#### Data
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

notes:
- row == record == tuple
- scalar: identifies single data item OR fn/query that returns single item
- indexes
	- for often queried or joined data index is a way to go
	- speed-up reads and slow-down wrights
	- types: single-column, composite (for multi-column WHEREs, ordering of columns matter), UNIQUE (guarantees uniqueness of a column)
	- manual reorganization (light) and reindex (heavy) operations may be required from time to time to optimize: index layout, remove stale and dead references
- transactions - way to group several operations as single ACID unit of work
	- BEGIN - start transaction
	- COMMIT - end successful transaction
	- ROLLBACK - end failed transaction
	- SAVEPOINT - way to label part of transaction and ROLLBACK to it later

#### Other
optimizations:
- indexes
- SELECT only needed data
- reduce wildcard chars (especially at the start of string)
- layout:
	- denormalization + pre-computation + pre-normalization
	- break large or less queried data separately
	- partitioning
- paginate by keyset (more efficient then LIMIT+OFFSET)
- EXIST() > COUNT()
- reduce subqueries
	- can be replaced with JOIN or Common Table Expressions
- EXPLAIN or EXPLAIN PLAN show how DB approaches query
- filter before JOIN

triggers (PostgreSQL) - execute procedure on INSERT / UPDATE / DELETE / TRUNCATE transaction
- types: BEFORE (abort or modify result), AFTER (logs)
- level: on each row OR on entire statement
- can reference view via INSTEAD OF

migrations (schema OR data) for PostgreSQL
- problems:
	- almost all ALTER operations (except some: SELECT, ADD COLUMN with DEFAULT) will require hard table locking
	- active DB with large migration can freeze DB due to limit in transactions IDs
- todos:
	- always do SET lock_timeout to avoid locking whole poole due to single long-running migration
	- batch large migrations
	- prefer CREATE INDEX CONCURRENTLY over CREATE INDEX to avoid blocking writes 
		- CREATE INDEX CONCURRENTLY can run in transactions, slower AND can fail if new data break index rules
	- break adding new column to: add nullable, add constraint for new data, backfill in batches AND validate and fix remaining cases
	- monitor
	- migrate against copy first
- tools to manage migration:
	- flyway, golang-migrate etc
- tools to enhance migrations:
	- pgroll - maintains several views of data during rolling migration (app can use both versions if needed)
	- pg_osc - similar to pgroll but builds whole shadow copy of table in bg and than do atomic hot-swap
		- helps with locking behavior, BUT requires double of disk size temporarily
	- pg_repack - tool to remove bloat from db in pg_osc manner (can't ALTER tables)

## PromQL (Prometheus Query Language)
- functional query language for time-series data
- to gain some info you need to: choose data, filter via label, focus via window

#### Syntax
basics:
- `metric_name {relevant_filter="value"} [5m]` 
- can be wrapped with fns, like `rate(...)` 
- selectors (for filtering)
	- exact - lbl="value"
	- negative exact - lbl!="value"
	- regex - lb~="pattern"
	- negative regex - lb!~="pattern"
- time modifiers
	- offset 5m - jump back 5 min from now
	- @1678900000 - fix evaluation at 1678900000 unix timestamp

data:
- scalar - single numeric value (constants, result of calcs)
- instant vector - set of time series with single data per timestamp
- range vector - set of time series with many data points over timewindow
- string - string literal

metrics types:
- counter - monotonically increasing number
	- tracking accumulated totals 
	- only increases or can be reset
	- visualized via line charts
- gauge - single metric values
	- used for values (temperature) or two-way counters (concurrent requests)
	- can go up or down
	- can't calculate rates, increases, resets
	- single number OR time series
- histograms - samples observations with their counts into configurable bucket
	- used for percentiles
	- histogram is cumulative (each bucket includes prev buckets)
	- heatmaps, percentile charts
- summary - samples observations with their counts and sums values over sliding window
	- used for quantile real-time calculations within single node/app (without aggregation over nodes)
	- more accurate than histograms
	- line charts per quantile

standard fns:
- rate - apply per-second rate calculations over data to see how fast/slow things change
	- time based
	- use `$__rate_interval]` or 4x of your scrape interval
- irate - more reactive version of rate (produces spikes)
	- time based
	- should be used for short scrape intervals to detect spikes, debugging etc
- increase - tell how counter that resets increased over time
	- time based
	- rate is per second, while increase is whole in time window
- sum - sum-up data
	- aggregation
	- can be used to view summed data for labeled metric
		- for granularity use `sum by (label)` to keep break-down by `label` (ex: sum all requests over all instances, but keep separation by `http_status`)

notes:
- main diff from SQL is layering and nesting
- time based fn is fn that works over time window and used to track some metrics "motion"
