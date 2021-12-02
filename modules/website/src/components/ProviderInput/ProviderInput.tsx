import { Input, InputGroup } from '@chakra-ui/input'
import { Center, Text } from '@chakra-ui/layout'
import React, { useContext } from 'react'
import ContractContext from '../../context/ContractContext'
import NetworkSelector from '../NetworkSelector/NetworkSelector'
import Section from '../Section/Section'

export default function ProviderInput() {
    const { providerURL, setProviderURL } = useContext(ContractContext)

    return (
        <Section>
            <Text>JSON RPC Provider URL</Text>
            <Center p="1rem">
                <InputGroup size="md">
                    <Input
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
        </Section>
    )
}
