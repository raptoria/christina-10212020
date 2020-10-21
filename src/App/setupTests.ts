import { setupServer } from 'msw/node';
import { handlers } from '../mocks/handlers';
import 'whatwg-fetch';

// This configures a request mocking server with the given request handlers.
export const server = setupServer(...handlers);

Object.defineProperty(window, 'matchMedia', {
  value: () => {
    return {
      matches: false,
      addListener: () => {},
      removeListener: () => {},
    };
  },
});

Object.defineProperty(window, 'getComputedStyle', {
  value: () => {
    return {
      getPropertyValue: () => {},
    };
  },
});
