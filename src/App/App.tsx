import React from 'react';
import DocumentManager from '../DocumentManager/DocumentManager';
import './app.scss';
import { worker } from '../mocks/browser';

if (process.env.NODE_ENV === 'development') {
  worker.start();
}

function App() {
  return <DocumentManager />;
}

export default App;
