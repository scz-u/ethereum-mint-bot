import { Input } from '@chakra-ui/input'
import { Box } from '@chakra-ui/layout'
import {
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Button,
} from '@chakra-ui/react'
import { JsonFragment } from '@ethersproject/abi'
import React from 'react'

interface Props {
    data: JsonFragment
}

export default function ContractMethodCard(props: Props) {
    return (
        <AccordionItem>
            <h2>
                <AccordionButton>
                    <Box flex="1" textAlign="left">
                        {props.data.name}
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
                {props.data.stateMutability === 'payable' && (
                    <Box m="0.25rem">
                        <Input placeholder="payable amount (ether)" />
                    </Box>
                )}
                {props.data?.inputs?.map((input) => {
                    return (
                        <Box m="0.25rem">
                            <Input
                                placeholder={`${input.name} (${input.type})`}
                            />
                        </Box>
                    )
                })}
                <Box m="0.25rem">
                <Button bg="teal" color="white"> Write </Button>
                </Box>
            </AccordionPanel>
        </AccordionItem>
    )
}
