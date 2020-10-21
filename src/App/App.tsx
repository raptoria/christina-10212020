import React from 'react';
import DocumentManager from '../DocumentManager/DocumentManager';
import './app.scss';

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('../mocks/browser');
  worker.start();
}

function App() {
  return <DocumentManager />;
}

export default App;
