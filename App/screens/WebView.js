import React from 'react';
import {WebView} from 'react-native-webview';

const WebViewScreen = () => {
  return (
    <WebView
      source={{
        uri: 'https://accounts.google.com/signin/v2/identifier?continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&service=mail&sacu=1&rip=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin',
      }}
    />
  );
};

export default WebViewScreen;
