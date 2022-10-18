import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {store} from "./reduxToolkit/index";
import {Provider} from 'react-redux'
import {ChakraProvider, extendTheme} from '@chakra-ui/react'

const theme = extendTheme({
    fonts: {
        body: `'Nunito', sans-serif`
    },
})
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ChakraProvider theme={theme}>
        <Provider store={store}>
            <App/>
        </Provider>
    </ChakraProvider>
);
