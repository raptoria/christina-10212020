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

// What could be added to the app / API?
Since the API is a mock it uses simplistic data structures to lookup and store file data. If this was a real API, I would use a real DB with better storage and search capabilities.

## Libraries

// What external libraries have you used and why?
conditional expression
antd
use-debounce

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
