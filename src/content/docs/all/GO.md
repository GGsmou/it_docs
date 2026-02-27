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

## Roadmap
- intro
	- great lang for BE services, CLI tools and distributed systems with GC, strong types, compilation (to single binary) and strong std, that features performance, great error handling and concurrency management
	- simplistic & easy to learn
	- `go` command features:
		- `mod` - depth management
		- `build` - compilation
		- `run` - dev run
		- `test` - testing
		- `fmt` - formatting
		- etc
- syntax
	- vars:
		- changeable: `var` OR `:=` shorthand
			- `var` declares AND allows to avoid initialization & assignment
				- if value is not provided, go will assign default values:
					- `0`, `""`, `false` OR `nil` (pointers, slices, maps)
			- `:=` always must have value, infers type, can be used inside fn only
		- unchangeable: `const` 
			- you can use `itoa` keyword to create int sequence starting from 0 (will start from zero per `const` block)
		- can have explicit type OR infer it
		- go has concept of shadowing AND scoping (block, fn, package)
		- data types:
			- int8-64, uint8-64, float32/64, complex numbers, boolean, string, bytes (alias for uint8), rune (alias for int32)
				- usually you should use just `int`, which is often int32 OR 64, based on architecture
				- go strict with types and require conversion
				- for bools go have: &&, !, ||, \==, != logical operations and checks
			- statically typed and will error at compile time
		- composite data types:
			- array - fixed size sequence of sam-type elements
				- size is part of type
				- initialize with zero values
				- passed as value
			- slice - more robust version of array, that supports dynamic sizing, append and copy operations
				- each slice has capacity (can be pre-allocated: `make([]T, length, capacity)`; for performance), that determines when memory re-allocation occurs
					- `make` also creates maps `make(map[string]int)` and channels `make(chan int)` 
					- you can convert slice to array `[N]T(slice)` (will panic if slice has lower then `N` elements)
					- if you need to operate on array memory as a slice you can convert it: `array[:]` OR `array[start:end]` 
			- map - key/value data type, that supports data storage (with keys of comparable types)
				- except basic map operations you can idiomatically check for existence `value, ok := map[key]` 
					- comma-ok idiom used to distinguish presence in map, even in case if value is default
					- same idiom can be used to check type assertion without panic: `value, ok := interface.(Type)` AND if channel closed: `values, ok <-ch` 
			- string - immutable (manipulations will copy string) sequence of bytes (always encoded as UTF-8)
				- to effectively iterate over UTF-8 strings you can use `rune`, that will represent UTF-8 char
				- note that `len` prints number of bytes in str, not runes
				- `rune` can also be created via `''` 
				- \`\` can be used to define strings without escape sequences and WITH formatting preservation
				- `""` define regular strings with escape sequences
				- note:
					- `for range` will iterate string by runes, BUT index access will return bytes
			- struct - used to define interface for object with methods only
				- functions attached separately
				- struct support tags, that define how to serialize data into struct, ex: `json:"name,omitempty"` 
					- `omitempty` wont add field to JSON if it has zero value
					- `json:"-"` will prevent (un)marshal
					- note that not exported fields are ignored in (un)marshal process
				- struct can be embedded with other struct, enabling composition pattern
					- ```go
type Address struct {
	Street, City, State string
}

type Person struct {
    Name string
    Address
}

p := Person{
    Name:    "Alice",
    Address: Address{"123 Main St", "Anytown", "CA"},
}
fmt.Println(p.Street)
					  ```
	- conditions:
		- `if` and `if-else`
			- `if` supports initialization in condition: `if num := 9; num < 0 {...}` 
		- `switch` 
			- supports: multiple values per case, type switch, expression & fallthrough (need to define by `fallthrough` keyword)
	- loops
		- `for` is basic and single loop in go, supports condition, post statement, initialization, `continue` and `break` with labels for nested loops
			- `for initialisation; condition; post { ... }` 
		- `for range` iterator style syntax that can be used for arrays, slices, maps, strings, and channels
			- returns index/key (except channel), value for all types
			- `_` syntax is used to omit value
			- notes:
				- map:
					- can't be modified on iteration (except deletion)
					- iterates in random order
				- string:
					- iterates by runes
		- `goto` can be used to move control flow to chosen label within fn
	- docs
		- go has Godoc for comments as docs
			- you can add comment before fn to act as inline doc AND at start of file to act as doc for whole file
			- supports markup
			- can be parsed by Godoc package to form HTML view of docs
			- you can write specific types of tests, that will act as example, by using specific file name `example_{FUNCTIONALITY_NAME}_test.go` AND fn name (starts with `Example`)
