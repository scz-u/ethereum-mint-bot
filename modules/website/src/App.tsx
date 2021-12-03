import React, { useContext } from 'react'
import ContractContext from './context/ContractContext'
import { Container } from '@chakra-ui/layout'
import ContractSelector from './components/ContractSelector/ContractSelector'
import Title from './components/Title/Title'
import ContractMethods from './components/ContractMethods/ContractMethods'
import ErrorAlert from './components/ErrorAlert/ErrorAlert'

function App() {
    const contractContext = useContext(ContractContext)

    return (
        <Container>
            <ErrorAlert/>
            <Title/>
            <ContractSelector />
            { contractContext.contract && contractContext.contractABI && contractContext.contractAddress && <ContractMethods/> }
        </Container>
    )
}

export default App
