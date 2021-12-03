import React, { useContext, useEffect } from 'react'
import { Center, Text } from '@chakra-ui/layout'
import { useState } from 'react'
import ContractContext from '../../context/ContractContext'
import { getContractABI } from '../../services/contract.service'
import { Spinner } from '@chakra-ui/spinner'
import { Input,InputGroup } from '@chakra-ui/react'

import { Button } from '@chakra-ui/button'
import { ethers } from 'ethers'
import Section from '../Section/Section'

import { getNetworkName } from '../../utils/getNetworkName'
import { ErrorContext } from '../../context/ErrorContext'
import NetworkSelector from '../NetworkSelector/NetworkSelector'

export default function ContractSelector() {
    const contractContext = useContext(ContractContext)
    const [isLoading, setIsLoading] = useState(false)
    const [isValid, setIsValid] = useState(true)
    const [query, setQuery] = useState<string>('')
    const errorContext = useContext(ErrorContext)
    const [provider, setProvider] = useState(contractContext.providerURL || '')

    useEffect(() => {
        if (query) {
            setIsValid(ethers.utils.isAddress(query))
        } else {
            setIsValid(true)
        }
    }, [query])

    const fetchContractABI = async () => {
        if (isValid) {
            setIsLoading(true)

            const { result, error } = await getContractABI(
                query,
                contractContext.chainId
            )
            if (result) {
                contractContext.setContractAddress(query)
                contractContext.setContractABI(result)
            } else if (error) {
                errorContext.showError(error, 'Error getting contract')
                console.error(error)
            }
            setIsLoading(false)
        }
    }

    const resetContract = () => {
        setQuery('')
        contractContext.setContractABI(undefined as any)
        contractContext.setContractAddress('')
    }

    const onSubmit = () => {
        contractContext.setProviderURL(provider);
        fetchContractABI()
    }

    const Contract = () => {
        const contractSet =
            contractContext.contractAddress && contractContext.contractABI
        if (contractSet) {
            return (
                <>
                    <Text>Contract: {contractContext.contractAddress} </Text>
                    <Text>
                        Network: {getNetworkName(contractContext.chainId)}
                    </Text>
                    <Text>Provider URL: {contractContext.providerURL}</Text>
                    <Center p="1rem"></Center>
                    <Center>
                        <Button
                            h="1.75rem"
                            size="sm"
                            marginBottom="1rem"
                            marginLeft="1rem"
                            onClick={() => resetContract()}
                        >
                            Clear
                        </Button>
                    </Center>
                </>
            )
        }
        return (
            <>
                <Text>JSON RPC Provider URL</Text>
                <Center p="1rem">
                    <InputGroup size="md">
                        <Input
                            type="text"
                            placeholder="Enter JSON RPC Provider URL"
                            value={provider}
                            onChange={(e) => {
                                setProvider(e.target.value)
                            }}
                        />
                    </InputGroup>
                </Center>
                <Text>Network</Text>
                <Center p="1rem">
                    <NetworkSelector />
                </Center>
                <Text>Contract Address</Text>
                <Center p="1rem">
                    <InputGroup size="md">
                        <Input
                            type="text"
                            placeholder="Enter contract address"
                            isInvalid={!isValid}
                            errorBorderColor="crimson"
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value)
                            }}
                        />
                    </InputGroup>
                </Center>
                <Center>
                    <Button
                        disabled={
                            !query || !isValid || !provider
                        }
                        bg="teal"
                        color="white"
                        onClick={onSubmit}
                    >
                        Search
                    </Button>
                </Center>
            </>
        )
    }

    return (
        <Section>{isLoading ? <Spinner color="blue" /> : <Contract />}</Section>
    )
}
