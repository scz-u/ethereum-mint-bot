import { JsonFragment } from '@ethersproject/abi'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import ContractContext from '../../context/ContractContext'
import Section from '../Section/Section'
import ContractMethodCard from './ContractMethodCard'
import { Text } from '@chakra-ui/layout'
import { Accordion } from '@chakra-ui/accordion'

export default function ContractMethods() {
    const contractContext = useContext(ContractContext)
    const [contractMethods, setContractMethods] = useState<any[]>([])

    const resetContractMethods = () => {
        setContractMethods([]);
    }

    useEffect(() => {
        if (!contractContext.contract || !contractContext.contractABI) {
            resetContractMethods()
            return
        }

        const payableFunctions = (
            contractContext.contractABI as Array<JsonFragment>
        )?.filter((item: JsonFragment) => {
            return item.stateMutability === 'payable'
        })

        setContractMethods(payableFunctions || [])
    }, [contractContext.contract, contractContext.contractABI])

    return (
        <Section>
            <Text>Payable Functions</Text>
            <Accordion allowToggle>
                {contractMethods.map((item: JsonFragment) => {
                    return <ContractMethodCard data={item} />
                })}
            </Accordion>
        </Section>
    )
}
