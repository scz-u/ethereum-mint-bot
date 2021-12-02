import React, { useContext, useEffect } from 'react'
import ContractContext from './context/ContractContext'
import { Container, Spacer } from '@chakra-ui/layout'
import ContractSelector from './components/ContractSelector/ContractSelector'
import Title from './components/Title/Title'
import ProviderInput from './components/ProviderInput/ProviderInput'

function App() {
    const contractContext = useContext(ContractContext)

    useEffect(() => {
        console.log(contractContext.contractABI)
    }, [contractContext])

    return (
        <Container>
            <Title/>
            <ContractSelector />
            <Spacer margin="2rem"/>
            <ProviderInput/>
        </Container>
    )
}

export default App
