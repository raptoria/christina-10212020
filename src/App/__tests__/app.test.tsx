import {
  getByLabelText,
  getByText,
  getByTestId,
  queryByTestId,
  waitFor,
  fireEvent,
} from '@testing-library/dom';

import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import App from '../App';
import React from 'react';
import { StoreProvider } from '../../store/store';
import { server } from '../setupTests';
import { act } from 'react-dom/test-utils';

describe('App', () => {
  beforeAll(() => {
    server.listen();
    render(
      <StoreProvider>
        <App />
      </StoreProvider>
    );
  });

  // Reset any request handlers that we may add during the tests,
  // so they don't affect other tests.
  afterEach(() => server.resetHandlers());
  // Clean up after the tests are finished.
  afterAll(() => server.close());

  it('App contains the expected components', async () => {
    let searchInputNode = screen.getByPlaceholderText('Search documents');
    expect(searchInputNode).toBeInTheDocument();
  });

  /*   it('the login form has validation', async () => {
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => screen.getByRole('alert'));
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Please input a valid address'
    );

    fireEvent.change(addressInputNode, { target: { value: 'Banana' } });
    await waitFor(() => screen.getByRole('alert'));
    expect(addressInputNode.value).toBe('Banana');

      fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText(/Jobcoin History Graph/i)).toBeInTheDocument();
  }); */
});
