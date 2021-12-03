import { Input } from '@chakra-ui/input'
import { Box, Text } from '@chakra-ui/layout'
import {
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Button,
    FormLabel,
} from '@chakra-ui/react'
import { JsonFragment } from '@ethersproject/abi'
import React, { useEffect, useState } from 'react'
import ContractMethodInput from './ContractMethodInput'

interface Props {
    data: JsonFragment
    onClickAction: (inputs: FragmentInputs) => void
}

export interface FragmentInputs {
    fragment: JsonFragment,
    inputs: JsonFragmentInput[]
}

export interface JsonFragmentInput {
    name: string
    type: string
    value: string
}

export default function ContractMethodCard(props: Props) {
    const [inputs, setInputs] = useState<JsonFragmentInput[]>([]);

    useEffect(() => {
        let functionInputs: JsonFragmentInput[] = [];
        if(props.data.stateMutability === "payable"){
            functionInputs.push({
                name: "payable",
                type: "ether",
                value: ""
            });
        }

        const temp = (props.data.inputs || []).map((item) => {
            return {
                name: item.name || "",
                type: item.type || "",
                value: ""
            }
        });

        functionInputs = [...functionInputs, ...temp];
        setInputs(functionInputs);
    }, [props.data]);

    const handleUpdate = (value: string, index: number) => {
        const updated = inputs.map((item, i) => {
            if(i === index) {
                return {
                    ...item,
                    value
                };
            }
            return item;
        });

        setInputs(updated);
    }

    return (
        <AccordionItem borderColor="teal">
            <h2>
                <AccordionButton>
                    <Box flex="1" textAlign="left">
                        <Text fontSize="xl">{props.data.name}</Text>
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
                {inputs.map((input, index) => {
                    return (
                        <ContractMethodInput key={input.name} input={input} onChange={(value: string) => {
                            handleUpdate(value, index)
                        }} />
                    )
                })}
                <Box m="0.25rem">
                    <Button
                        bg="teal"
                        color="white"
                        onClick={() => props.onClickAction({inputs, fragment: props.data})}
                    >
                        Configure
                    </Button>
                </Box>
            </AccordionPanel>
        </AccordionItem>
    )
}
