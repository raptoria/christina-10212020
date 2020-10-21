# Christina - 10/21/2020

## Installation

### install dependencies

npm install

### run the client in development mode

npm run start

## Security

Things that have been addressed:

- added GPG key for github so each commit is signed & verified by me
- the App sanitizes all user input

Not been addressed:

- The serviceWorker doesn't work with a self-signed cert used for development.
  If the app used a real backend server I would like to get SSL working for end to end encrpytion. If auth was in scope, I would use JWT stored inside an http only cookie with a CSRF token passed in a header so I can verify each subsequent request from the user, and expire the CSRF token on logout/timeout.

## Improvements

Since the API is a mock it uses simplistic data structures to lookup and store file data. If this was a real API, I would use a DB with better storage and search capabilities. Moreover, since the API is a mock, it is saving data about the images but not the images themselves. It would be nice to have this fully fleshed out so I could demonstrate security with regards to real APIs (eg. use express validator for sanitizing/validation on the server);

Given more time, I'd also like to:

- get the functional test working for uploading a document
- add unit tests for mb/kb conversion
- add unit tests for Uploader, especially for upload format validation
- Add more breakpoints for adapting grid layout for different size devices

## Libraries

- **conditional expression** - this is used inside middleware so a stream (Rx-like) syntax can be used, rather than vanilla switch statements. It was chosen for brevity and personal preference.
- **sass** - nested styles make CSS easier to read
- **css modules** - this is turned on so each file will have locally scoped CSS, so I don't have to worry about naming conflicts with CSS outside of my file
- **typesript** - typed JS makes code easier to reason through, debug, organize, etc
- **antd** - a UI framework to simplify component design/construction. They cover a large range of widgets and I find the API to be very intuitive
- **msw** - a mock service worker, this is used to mock APIs in the browser. A server implementation of msw is used for running Jest mocks
- **use-debounce** - to debounce callbacks so the server doesn't get hammered as the user types into inputs
- **dom-purify** - to purify/sanitize user inputs
- **whatwg-fetch** - polyfill fetch in Node.js environment to get Jest tests running
- **jest** - test runner
- **react testing library** - a lightweight framework for testing react components. I like that it allows you to test from the user's perspective, with acccessibility baked in

## API

Mocked APIs

### GET /resources

```
  /**
   * retrieves all documents. If a query param is sent
   * it will return the list of filtered documents
   * @api {GET} /api/documents?searchString=str
   * @apiParam searchString
   * @param req the request object
   * @param res the response object
   * @param ctx the context
   * @return the response object containing documentList OR an error message
   */


  /**
   * creates a document
   * @api {POST} /api/documents
   * @param req the request object
   * @param res the response object
   * @param ctx the context
   * @return responds that a document has successfully been created OR an error message
   */


  /**
   * delete a document
   * @api {DELETE} /api/documents
   * @param req the request object
   * @param res the response object
   * @param ctx the context
   * @return responds with a no content success message OR an error message
   */
```

---

## Other notes
