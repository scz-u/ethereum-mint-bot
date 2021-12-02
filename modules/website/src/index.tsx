import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { ContractContextProvider } from './context/ContractContext'
import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.render(
    <React.StrictMode>
        <ContractContextProvider>
            <ChakraProvider>
                <App />
            </ChakraProvider>
        </ContractContextProvider>
    </React.StrictMode>,

    document.getElementById('root')
)
