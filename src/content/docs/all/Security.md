---
title: Security
---

## Encryption
#### Symmetric
Alice and Bob have two identical Keys that can encrypt and decrypt messages
(Alice encrypts, sends + Bob receives, decrypts)

pros:
- easy to use, fast
cons:
- we can't safely exchange keys with this method

#### Asymmetric
Alice and Bob each have their own pair of Keys(Lock and Key OR Private and Public)
(Alice sends lock + Bob receives lock, decrypts, sends + Alice decrypts)

based on RSA algorithm

slow, but good for initial connection

one problem: middle man(where hacker can receive and change data in between messaging)

#### Certificate Authority
authority is signing public key of Alice, which includes meta-data that confirms that Alice is Alice + Bob checks if Alice is Alice and after that init connection

fixes middle man problem

## Web Security
#### Password Sending
- password field hides content
	- can be set by type
- form is sending requests in POST method

#### Auth
- login+pass can be set as cookie, so every request from client will contain this info
	- it is not safe, so we can instead generate some session token with lifetime and set it as cookie instead
		- session token is key for value(info about user)
		- session token can also be without auth, so server can track user cations before auth

#### Password
- brute force
	- we can send one joined error for password and username, so it is harder to find if user exists
	- number of login tries must be limmited
- safety
	- password must be hashed(transformed to some string that can't be used to calculate password back, but be identical for same inputs)
		- this prevents password leak if data base is stolen
	- password must be salted before hashing, so same passwords won't output same hashes
		- prevents possibility to just compare our hash with predefined list of hashes
		- salt is stored as part of user data and uniq for each user

#### CSRF Attack
CSRF - cross-site request forgery

some other site can sent request to our back-end with cookies inside our browser and appear as legit user

to prevent this we can use csrf token
- it is done by adding additional hidden field with csrf token as value
- this token is stored as part of session data
