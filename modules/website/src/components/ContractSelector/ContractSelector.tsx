import React, { useContext, useEffect } from 'react'
import { Box, Center, Text } from '@chakra-ui/layout'
import { useState } from 'react'
import ContractContext from '../../context/ContractContext'
import { getContractABI } from '../../services/contract.service'
import { Spinner } from '@chakra-ui/spinner'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import { Button } from '@chakra-ui/button'
import { ethers } from 'ethers'

export default function ContractSelector() {
    const contractContext = useContext(ContractContext)
    const [isLoading, setIsLoading] = useState(false)
    const [isValid, setIsValid] = useState(true)
    const [query, setQuery] = useState<string>('')

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
            const { result, error } = await getContractABI(query)
            if (result) {
                contractContext.setContractAddress(query)
                contractContext.setContractABI(result)
            } else if (error) {
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
                    <Text>
                        Contract Address: {contractContext.contractAddress}{' '}
                    </Text>
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
                <Text>Contract Address</Text>
                <Center p="1rem">
                    <InputGroup size="md">
                        <Input
                            pr="4.5rem"
                            type="text"
                            placeholder="Enter contract address"
                            isInvalid={!isValid}
                            errorBorderColor="crimson"
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value)
                            }}
                        />
                        <InputRightElement width="4.5rem" pr="5px">
                            <Button
                                h="1.75rem"
                                size="sm"
                                onClick={() => fetchContractABI()}
                            >
                                Search
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </Center>
            </>
        )
    }

    return (
        <Box borderWidth="1px" borderRadius="lg" borderColor="teal" p="1rem">
            {isLoading ? <Spinner color="blue" /> : <Contract />}
        </Box>
    )
}
