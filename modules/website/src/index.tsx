import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { ContractContextProvider } from './context/ContractContext'
import { ChakraProvider } from '@chakra-ui/react'
import { ErrorContextProvider } from './context/ErrorContext'

ReactDOM.render(
    <React.StrictMode>
        <ContractContextProvider>
            <ErrorContextProvider>
                <ChakraProvider>
                    <App />
                </ChakraProvider>
            </ErrorContextProvider>
        </ContractContextProvider>
    </React.StrictMode>,

    document.getElementById('root')
)
