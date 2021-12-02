import { Box } from '@chakra-ui/layout'
import React from 'react'

export default function Section(props: { children: React.ReactNode }) {
    return (
        <Box borderWidth="1px" borderRadius="lg" borderColor="teal" p="1rem" m="1rem">
            {props.children}
        </Box>
    )
}
