import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { ConfigProvider } from 'antd';
import './assets/css/index.css'
import App from './widgets/app/App';
import stores from './stores'


ReactDOM.render(
  <ConfigProvider csp={{ nonce: 'YourNonceCode' }}>
    <Provider {...stores}>
        <App/>
      </Provider>
  </ConfigProvider>,
  document.getElementById('root')
);

ConfigProvider.config({
  theme: {
    primaryColor: '#5FA1DB',
  },
});
