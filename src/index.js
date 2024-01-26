import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import UsersProvider from './Context/UsersProvider.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <UsersProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </UsersProvider>
  
);

