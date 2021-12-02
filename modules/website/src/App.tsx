import React, { useContext } from 'react'
import ContractContext from './context/ContractContext'
import { Container } from '@chakra-ui/layout'
import ContractSelector from './components/ContractSelector/ContractSelector'
import Title from './components/Title/Title'
import ProviderInput from './components/ProviderInput/ProviderInput'
import ContractMethods from './components/ContractMethods/ContractMethods'

function App() {
    const contractContext = useContext(ContractContext)


    return (
        <Container>
            <Title/>
            <ContractSelector />
            <ProviderInput/>
            { contractContext.contract && contractContext.contractABI && contractContext.contractAddress && <ContractMethods/> }


        </Container>
    )
}

export default App
