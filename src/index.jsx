import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import './assets/css/index.css'
import App from './widgets/app/App';


ReactDOM.render(
  <ConfigProvider csp={{ nonce: 'YourNonceCode' }}>
    <App />
  </ConfigProvider>,
  document.getElementById('root')
);

ConfigProvider.config({
  theme: {
    primaryColor: '#5FA1DB',
  },
});
