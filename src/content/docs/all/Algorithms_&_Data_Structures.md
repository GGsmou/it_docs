---
title: Algorithms and Data Structures
---

## Algorithms

#### Linear Search
- SOL: Check all data one by one
- O(n)

#### Binary Search
- only for sorted data
- SOL: check in the middle of data, if smaller go to the right, else go to the left and repeat
- O(logn)

#### Selection Sort
- SOL: find smallest element index(by checking each element), remove element from old array and add to new, repeat for each element
- O(n^2)

#### Quick Sort
- one of the quickest and oftenly used as base sorting algororithm
- SOL:
	- if len === 0 or len === 1 -> return arr
	- if len === 2 -> swap elements if needed, return arr
	- if len === 3 -> find base element, create two arrays for elements less and more then base, use quick sort for both arrays, concat all parts and return arr
	- if len >= 4 -> same for 3
- O(n\*logn) - mean
	- O(n^2) - worst
	- we calculating Big-O as len(n) \* height of stack, so if we dividing by 2 we ideally have log, otherwise n
	- to have mean value we need to just take random pointer index each time
- we can say that quick sort works for all len by induction prove(if I can do it for 1 element and for 2, so I can do it for 3 elements etc)
	- going from 1 to 2, from 2 to 3 etc - induction translation

#### Merge Sort
- O(n\*logn)

#### Divide and Conquer (task solving)
- used for recursive tasks
- SOL: find easiest base case, break task until it is similar to base case

for example you need to find sum of all elements inside array with recursion:
- base case - 1 element array(sum === element)
- so we need to sum 1 element with array of others recursievly

for array tasks base case often empty array

#### Hash Function
- accepts data and return number
- for same input always must be same result
- different inputs must have different results
- return only valid indexes(based on array size)

good function spreads elements evenly across hash table

usually based on SHA algorithm

#### Breadth-First Search (пошук в ширину)
- used with unweighted graphs
- detects if there is a path from A to B and what is the shortest one
- we check list of connections one by one
	- if connection is found -> stop
	- else -> add all of its connections to end of arr(queue data struct is used here), check other connection in list
	- !!! while checking we need to avoid infinite loops, thats why we always track and ignore checked nodes
- complexity: O(V + E)
	- V - number of nodes
	- E - number of edges

#### Dijkstra
- used to find fastest path from A to B
- used with weighted, directed, acyclic graphs, where all weights are positive
	- if graph is acyclic it is also be directed, because undirected connection is a cycle, so Dijkstra works with DAGs (directed acyclic graphs)
	- for negative weighted graphs there is bellman-ford algorithm
- while we have unprocessed nodes: set current_node to nearest(with least weight inside hash map OR starting node for first iteration) node, for each neighbor(if neighbor weight+current_node weight less than in hash map change its weight and parent), add current_node to processed, change current_node to nearest + when all nodes are processed: find path by traversing parents, calculate cost
	- we keep track all weights and parent in hash maps(node - weight, node - parent)
	- by default weights in hash map are +infinity, parents are null

#### Greedy algorithm (task solving)
- simple and fast
- don't give most optimal solution, but it is close and ok to use if other variants are to slow
- SOL: find the most optimal solution on each step(locally optimal solution)
- used to solve NP-full tasks

#### Dynamic programing (task solving)
- helps solving(or making solving algorithm faster) complex tasks that can be broken to simpler sub-tasks
- start with table that represent all sub-tasks, iteratively fill it layer by layer for each subtask
	- we don't need to reevaluate all table if we need to add new item
	- order doesn't matter
	- table header can be float values to
	- each tasks must be atomic
	- answer can be in any cell of table
- often used to find most optimized value according to restrictions
- example:
	- task: you need to fill max items(by cost) in space of 4 kilos
	- write to each sell value by formula `cell[i][j] = max(cell[i-1][j], item_price + cell[i-1][j-item_weight])`

table example:

| | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| item1 | price | price | price | price |
| item2 | ... | ... | ... | ... |
| item3 | ... | ... | ... | ... |

#### K-neighbors algorithm
- usages:
	- classify object by similarities to its neighbors
		- example: we have two groups: oranges and lemons and we need to understand what is type of fruit that looks like one or another
	- regression(predict what will be some characteristic based on mean value of neighbors characteristic)
	- one of basis for machine learning(training stage is needed first to collect data)
- check group of closest neighbors to object and its type likely will be the type of most count of neighbors
	- to find distance between two dots we can use pythagoras formula `((x1 - x2) ^ 2 + (y1 - y2) ^ 2) ^ 0.5`
		- if we have n characteristics of object our coordinate system becomes n-dymensional, and formula is just extended to all coordinate diffs
	- we can use normalization of characteristics based on mean value so results will be more objective
	- better approach will be to use близькість косинусів formula(founds angle between vectors and not distance, don't need normalization, more precise, harder)
- k means count of closest neighbors we are checking
	- good value is k = N^0.5, where N is amount of objects in data set
- to have good predictions data sets must be:
	- related to subject
	- cover full subject, not only part of it

#### Fourier
Basically about decomposing big structures to some small peaces(song -> list of waves)

#### MapReduce
Based on Map and Reduce functions and helps to process big amount of data in parallel(on one or many computers)

#### Blume filter
- family of algorithms that can return boolean for some value mostly truelly(if algorithms says false - 100% false, if true it is likely true, but maybe false)
- used if we need to process huge amount of data with possibility of errors
	- for this amount of data hash tables will be too big

#### HyperLogLog
- used to approximately count uniq values in array
- similar to blume filter

#### SHA
Secure Hash Algorithm

- gets str and returns string(hash code)
	- different from typical hash algorithm, where we return number(index of array element)
	- hash codes are big, so often we can use part of it
- SHA is one-way encoding
- there are family of SHA algorithms(0, 1, 2, 3, where 0 and 1 are compromised)
- SHA is locally non sensitive, means that if we change one letter, we will get different string
	- there is Simhash that is locally sensitive and outputs similar hashes for similar inputs
		- USAGE:
			- plagiarism check
			- find simmular strings
			- check if something is similar to protected information
- USAGE:
	- compare two files by their hash code
	- hashing passwords and storing hash only to ensure safety

#### Diffie Hellman key exchange
- solves tasks about private exchange of information
- we encrypt message with public key and decrypt only with private key that is stored one one machine and never shared
- father of RSA

## Data Structures
#### Array
- elements are stored sequentially(one-by-one) inside memory

to add new element we need to relocate memory(O(n) operation)
work-around is to reserve some more space that needed

good for situations when you need full set of data or data from different parts of set(accessing some element is O(1))
#### Linked List
- elements are stored randomly in memory
- each element have a pointer to next element

adding is O(1) operation

good for sequential reading, but to access last element you need to execute O(n) operation

#### Stack
Stack has two operations: add to top of stack, delete+read from top of stack

PC is using stack inside of Call Stack. Call stack is managing order of func execution
For example: firstly we call f1(), it adds to stack, saves all its data inside memory, performs some action and than freezes in memory until inner f2() is not finished, after f2() is finished and removed from stack we resume f1() and later also remove it from stack

In call stack we make scoped variables for each level which can't be accessed from different layers of stack

Last In First Out
#### Hash Table
- based on hash func
- stores data in array where index of item is calculated from data itself by hash func
- read/write/delete: mean O(1) || worst O(n)

Example of usage: caching, duplicate removal, setting data relations

Dealing with collisions(when different data points to same index):
- if we have collision make linked list instead of just element(makes hash table slower)
To maintain low collision keep coef_of_fullness(data_size / array_size) low

If we have high(0.7+) coef_of_fullness it is better to double(make bigger) array size and re-hash all data
- we can't just move data because hash func is dependent on arr size
- this is heavy operation so better not to use too often

#### Graph
- used to represent data and connections between data
- graph consists of nodes(vertices) and edges(ребра)
- two connected graphs are called neighbors

Based on hash table(Node: \[Node, Node, Node] relation)

Can be
- directed(can get from A to B, but not backwards: A -> B)
- undirected(can get from A to B and from B to A: A - B)
- weighted(have some data associated with edge)
- unweighted(no data associated with edge)

If we convert graph to list we get topologicaly sorted list(sorted based on graph)

#### Tree
- it is graph, but with condition that edges can't point backwards(only from downwards)

binary tree
- it is a tree where left children are less that parent and right are more(for example by alphabetic sorting)
- complexity
	- search: worst O(n), mean O(logn)
	- add/delete: O(logn)
- worst than sorted array+binary search in search, but better overall because of add/deletion is faster
	- can't give direct access to elements
	- can be very bad if unbalanced, so it is better to use red-black trees, because they can balance themselfs
- used in DBs

#### Queue
Similar to stack(supports only adding and deleting), but we add to back and remove from front

First In - First Out

#### Set
Similar to array, but all elements are unique

Operations with sets:
- union - merge two sets
- difference - remove elements B from A
- intersection - elements that are present int two sets

#### Inverted indexes
Hash table that stores words -> place where that word was found, so we can build primitive search engine this way

## Other
There are two ways to check complexity of algorithm

- By time(Big-O)
- By memory

#### Big-O
Don't helps calculating time, but used to find how many operations we need for n size data set(how fast operation count grows)
Shows worst case scenario. Also useful to check mean scenario

- don't depends on data set size - 1
- logarithmic - log(n)
- linear - n
- n\*logn
- quadratic - n^2
- factorial - n!

Good example of n! task is Задача о Комівояжоре
- Комівояжору необхідно обʼїхати n міст за найкоротшу відстань, а щоб знайти відстань потрібно перебрати всі комбінації міст і просумувати, тобто отримаємо O(n!) складність

When figuring Big-O we often exclude constants, so forEach and sleep+forEach are same O(n), but have different constants
Usually constant is not impactful but in MergeSort vs QuickSort constant difference is so huge that mean O(n\*logn) for QuickSort is better for same Big-O worst case scenario in MergeSort

#### Recursion
Usually slower then loops but can make code easier
Can take a lot of memory and lead to stack overflow problem
- ways to deal: rewrite with loops, use tail recursion

Some algorithms are purely based on recursion

Every recursion code must have a _base case_ that will stop code from endless recursion and recursion case to continue running

#### NP-full tasks
- to detect that task is NP-full
	- need to find all possible combinations for sets or sequences
	- O(n!) complex
	- can't be divided to smaller sub tasks
	- similar to task about комівояжоре or task about set coverage
- better to solve approximately with greedy algorithm

#### Parallel algorithms
To make more of PC power we can make our algorithms work in parallel(if it is possible for algorithms), but it doesn't mean that for double core CPU we will twice the performance, because:
- load balancing: we need to spread equally heavy and easy tasks for both cores
- data transferring: it is costly to merge two arrays from each core, so it slows down algorythm

#### Linear programing
Methods used to solve tasks, where we have constrains(some amount of money) and we need to maximize outcome(bought materials)
- graphs tasks are part of linear programing
- simplex method is often used inside linear programing
