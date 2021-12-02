import React, { useContext, useEffect, useState } from 'react'
import ContractContext from './context/ContractContext'
import { getContractABI } from './services/contract.service'
import { providers } from 'ethers'
import { Box, Center, Container } from '@chakra-ui/layout'
import ContractSelector from './components/ContractSelector/ContractSelector'
import Title from './components/Title/Title'

function App() {
    const [jsonProviderRPC, setJSONProviderRPC] = useState('')
    const contractContext = useContext(ContractContext)

    useEffect(() => {
        contractContext.setProvider(
            new providers.JsonRpcProvider(jsonProviderRPC, {
                chainId: 1,
                name: 'mainnet',
            })
        )
    }, [jsonProviderRPC])

    useEffect(() => {
        console.log(contractContext.contractABI)
    }, [contractContext])

    return (
        <Container>

            <Title/>
            <ContractSelector />



        </Container>
    )
}

export default App
