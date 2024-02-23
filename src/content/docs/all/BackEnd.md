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