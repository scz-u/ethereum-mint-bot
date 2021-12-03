import React, { useContext, useEffect } from 'react'
import { Center, Text } from '@chakra-ui/layout'
import { useState } from 'react'
import ContractContext from '../../context/ContractContext'
import { getContractABI } from '../../services/contract.service'
import { Spinner } from '@chakra-ui/spinner'
import { Input, InputGroup } from '@chakra-ui/input'
import { Button } from '@chakra-ui/button'
import { ethers } from 'ethers'
import Section from '../Section/Section'
import ProviderInput from '../ProviderInput/ProviderInput'
import { getNetworkName } from '../../utils/getNetworkName'
import { ErrorContext } from '../../context/ErrorContext'

export default function ContractSelector() {
    const contractContext = useContext(ContractContext)
    const [isLoading, setIsLoading] = useState(false)
    const [isValid, setIsValid] = useState(true)
    const [query, setQuery] = useState<string>('');
    const errorContext = useContext(ErrorContext);

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

            const { result, error } = await getContractABI(query, contractContext.chainId)
            if (result) {
                contractContext.setContractAddress(query)
                contractContext.setContractABI(result)
            } else if (error) {
                errorContext.showError(error, "Error getting contract");
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
                <ProviderInput />
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
                        disabled={!query || !isValid || !contractContext.providerURL}
                        bg="teal"
                        color="white"
                        onClick={() => fetchContractABI()}
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
