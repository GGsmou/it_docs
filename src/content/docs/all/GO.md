---
title: GO
---

## Possible Architecture
- layering
	- handlers - external interface for http, rpc, message broker, that converts internal models to external
	- service - contains logic and operate with internal models with a help of repo & external service
	- external service - can be directly RPC service OR wrapped with custom interface
	- repo - contains logic to retrieve data from DB by executing SQL (or similar) queries
		- basically a sub-type of external service
		- might or might not have own models and errors
- everything is passed through DI for testability
- commonly tests are done on each component as units, repo tests with lightweight DB AND functional tests when you spin-up your app and execute actions with it through public interface
	- e2e is also a possibility, when you aren't mocking external services, but using them
- context is stored as global var that populated on start
- logs can be written to VL or similar solution
- graphana+prometheus can be used for alerts and metrics
