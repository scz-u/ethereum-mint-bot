import { Box, Center, Text } from '@chakra-ui/layout'
import React from 'react'

export default function Title() {
    return (
        <Box>
            <Center>
                <Text fontSize="4xl">EtherMint</Text>
            </Center>
            <Center>
                <Text fontSize="xs" padding="1rem">
                    Buy me a ☕️, drop me an NFT 😄 0x22c3b13EC38cbE06Cf3a4C49c100C65ce830A662
                </Text>
            </Center>
        </Box>
    )
}
