import {
    Button,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Text } from '@chakra-ui/react'
import { utils, BigNumber } from 'ethers'
import React, { useContext, useEffect, useState } from 'react'
import ContractContext from '../../context/ContractContext'
import {
    FragmentInputs,
    JsonFragmentInput,
} from '../ContractMethods/ContractMethodCard'
import ContractMethodInput from '../ContractMethods/ContractMethodInput'

interface Props {
    fragmentInputs: FragmentInputs
    isOpen: boolean
    onClose: () => void
}
export default function TransactionConfigModal({
    fragmentInputs,
    isOpen,
    onClose,
}: Props) {
    const [inputs, setInputs] = useState<JsonFragmentInput[]>([])
    const contractContext = useContext(ContractContext);
    const initialRef = React.useRef<any>()
    const finalRef = React.useRef<any>()
    const [gasLimit, setGasLimit] = useState(1000000)
    const [maxFee, setMaxFee] = useState(0)
    const [maxPriorityFee, setMaxPriortiyFee] = useState(0)
    const [maxCost, setMaxCost] = useState('')
    const [minCost, setMinCost] = useState('')

    useEffect(() => {
        const oneGwei = BigNumber.from('1000000000')
        const maxPriceInEth = utils.formatEther(
            BigNumber.from(gasLimit).mul(BigNumber.from(maxFee)).mul(oneGwei)
        )
        const minPriceInEth = utils.formatEther(
            BigNumber.from(gasLimit)
                .mul(BigNumber.from(maxPriorityFee))
                .mul(oneGwei)
        )
        setMinCost(minPriceInEth)
        setMaxCost(maxPriceInEth)
    }, [maxFee, maxPriorityFee, gasLimit])

    useEffect(() => {
        setInputs(fragmentInputs.inputs)
    }, [fragmentInputs.inputs])

    const handleUpdate = (value: string, index: number) => {
        const updated = inputs.map((item, i) => {
            if (i === index) {
                return {
                    ...item,
                    value,
                }
            }
            return item
        })

        setInputs(updated)
    }

    return (
        <>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
                size="xl"
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        Function: {fragmentInputs.fragment.name}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Tabs align="center">
                            <TabList>
                                <Tab>Inputs</Tab>
                                <Tab>Gas</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    {inputs.map((input, index) => {
                                        return (
                                            <ContractMethodInput
                                                key={input.name}
                                                input={input}
                                                onChange={(value: string) => {
                                                    handleUpdate(value, index)
                                                }}
                                            />
                                        )
                                    })}
                                </TabPanel>

                                <TabPanel>
                                    <FormLabel>Gas Limit</FormLabel>
                                    <Input
                                        placeholder="Gas Limit"
                                        value={gasLimit}
                                        onChange={(e) =>
                                            {   
                                                const newValue = Number(e.target.value);
                                                if(!Number.isNaN(newValue)){
                                            setGasLimit(newValue)
                                                }}
                                        }
                                    />
                                    <FormLabel>
                                        Max Fee Per Gas (gwei)
                                    </FormLabel>
                                    <Input
                                        placeholder="Max Fee Per Gas"
                                        value={maxFee}
                                        onChange={(e) =>
                                            {   
                                                const newValue = Number(e.target.value);
                                                if(!Number.isNaN(newValue)){
                                                    setMaxFee(newValue)
                                                }
                                            }
                                        }
                                    />
                                    <FormLabel>
                                        Max Priority Fee Per Gas (gwei)
                                    </FormLabel>
                                    <Input
                                        placeholder="Max Priority Fee"
                                        value={maxPriorityFee}
                                        onChange={(e) => {
                                            const newValue = Number(
                                                e.target.value
                                            )
                                            if(Number.isNaN(newValue)){
                                                return;
                                            }
                                            else if (newValue > maxFee) {
                                                setMaxPriortiyFee(maxFee)
                                            } else {
                                                setMaxPriortiyFee(
                                                    newValue
                                                )
                                            }
                                        }}
                                    />
                                    <Text>Max Cost {maxCost}ETH</Text>
                                    <Text>Min Cost {minCost}ETH</Text>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button colorScheme="blue" ml={3} disabled>
                            Simulate 
                        </Button>
                        <Button colorScheme="blue" ml={3} disabled>
                            Mint
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
