import { JsonFragment } from '@ethersproject/abi'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import ContractContext from '../../context/ContractContext'
import Section from '../Section/Section'
import ContractMethodCard, {
    FragmentInputs,
    JsonFragmentInput,
} from './ContractMethodCard'
import { Center, Text } from '@chakra-ui/layout'
import { Accordion } from '@chakra-ui/accordion'
import TransactionConfigModal from '../TransactionConfigModal/TransactionConfigModal'
import { useDisclosure } from '@chakra-ui/react'

export default function ContractMethods() {
    const contractContext = useContext(ContractContext)
    const [contractMethods, setContractMethods] = useState<any[]>([])
    const [currentFragment, setCurrentFragment] = useState<
        FragmentInputs | undefined
    >()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const onConfigure = (item: FragmentInputs) => {
        setCurrentFragment(item)
        onOpen()
    }

    const resetContractMethods = () => {
        setContractMethods([])
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
            <Center>
                <Text fontSize="xl">Payable Functions</Text>
            </Center>
            <Accordion allowToggle>
                {contractMethods.map((item: JsonFragment) => {
                    return (
                        <ContractMethodCard
                            data={item}
                            onClickAction={(input: FragmentInputs) =>
                                onConfigure(input)
                            }
                        />
                    )
                })}
            </Accordion>

            {currentFragment && (
                <TransactionConfigModal
                    fragmentInputs={currentFragment}
                    isOpen={isOpen}
                    onClose={onClose}
                />
            )}
        </Section>
    )
}
