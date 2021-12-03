import { FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Box } from '@chakra-ui/layout'
import React from 'react'
import { JsonFragmentInput } from './ContractMethodCard'

interface Props {
    input: JsonFragmentInput
    onChange: (value: string) => void
}
export default function ContractMethodInput({ input, onChange }: Props) {
    return (
        <Box m="0.25rem">
            <FormLabel>
                {input.name} ({input.type})
            </FormLabel>
            <Input
                value={input.value}
                placeholder={`${input.name} (${input.type})`}
                onChange={(e) => onChange(e.target.value)}
            />
        </Box>
    )
}
