import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AlertMessageProvider from "./components/alert/AlertMessageProvider";
import LoadingProvider, { useLoader } from "./components/loading/LoadingProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LoadingProvider>
      <AlertMessageProvider>
        <App />
      </AlertMessageProvider>
    </LoadingProvider>
  </React.StrictMode>
);