import {
  waitFor,
  fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/dom';
import user from '@testing-library/user-event';

import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import App from '../App';
import React from 'react';
import { StoreProvider } from '../../store/store';
import { server } from '../setupTests';

describe('App', () => {
  beforeAll(() => {
    server.listen();
  });

  beforeEach(() => {
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
    const searchInputNode = screen.getByPlaceholderText('Search documents');
    expect(searchInputNode).toBeInTheDocument();

    const uploadButtonNode = screen.getByTestId('uploadButton');
    expect(uploadButtonNode).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('5 documents')).toBeInTheDocument();
    });
  });

  it('can filter documents', async () => {
    const searchInputNode = screen.getByPlaceholderText('Search documents');
    fireEvent.change(searchInputNode, { target: { value: 'Banana' } });

    await waitFor(() => {
      expect(screen.getByText('Banana.png')).toBeInTheDocument();
      expect(screen.getByText('banana2.png')).toBeInTheDocument();
    });
  });

  it('can delete a document', async () => {
    await waitFor(() => {
      expect(screen.getByTestId('deleteButton-Clove.jpg')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId('deleteButton-Clove.jpg'));
    await waitForElementToBeRemoved(() => screen.getByText('Clove.jpg'));
  });

  /*   it('uploading a new file', async () => {
    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    const uploadButton = document.querySelector('[type="file"]')!!;
    user.upload(uploadButton, file);

    await waitFor(() => {
      expect(screen.getByText('6 documents')).toBeInTheDocument();
    });
  }); */
});
