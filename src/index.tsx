import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import 'antd/dist/antd.css';
import { StoreProvider } from './store/store';

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById('root')
);
