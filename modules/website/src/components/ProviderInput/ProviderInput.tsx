import { Input, InputGroup } from '@chakra-ui/input'
import { Center, Text } from '@chakra-ui/layout'
import { Box } from '@chakra-ui/react'

import React, { useContext } from 'react'
import ContractContext from '../../context/ContractContext'
import NetworkSelector from '../NetworkSelector/NetworkSelector'

export default function ProviderInput() {
    const { providerURL, setProviderURL } = useContext(ContractContext)

    return (
        <Box borderWidth="1px" borderRadius="lg" borderColor="teal" p="1rem">
            <Text>JSON RPC Provider URL</Text>
            <Center p="1rem">
                <InputGroup size="md">
                    <Input
                        pr="4.5rem"
                        type="text"
                        placeholder="Enter JSON RPC Provider URL"
                        value={providerURL}
                        onChange={(e) => {
                            setProviderURL(e.target.value)
                        }}
                    />
                </InputGroup>
            </Center>
            <Center p="1rem">
                <NetworkSelector />
            </Center>
        </Box>
    )
}
