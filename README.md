# Christina - 10/21/2020

## Installation

### install dependencies

npm install

### run the client in development mode

npm run start

## Security

Things that have been addressed:
added GPG key for github so each commit is signed & verified

Not been addressed:
The serviceWorker doesn't work with a self-signed cert used for development.
If this was a real backend server it would play nicely with SSL so I could get https working.

## Improvements

Since the API is a mock it uses simplistic data structures to lookup and store file data. If this was a real API, I would use a DB with better storage and search capabilities. Moreover, since the API is a mock, it is saving data about the images but not the images themselves. It would be nice to have this fully fleshed out so I could demonstrate security with regards to real APIs (eg. use express validator);

Given more time, I'd also like to:

- get the functional test working for uploading a document
- add unit tests for mb/kb conversion and extract it out so it’s reusable
- add unit tests for Uploader, especially for format validation
- Add more breakpoints for adapting grid layout for different size devices

## Libraries

// What external libraries have you used and why?
conditional expression
antd
use-debounce
dom-purify
whatwg-fetch

## API

// Any general observation about the API?
// document each endpoint using the following template: ```

### GET /resources

// Description of the endpoint:
// - what does the endpoint do?
// - what does it return?
// - does it accept specific parameters? ```

---

## Other notes

// Anything else you want to mention
