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
