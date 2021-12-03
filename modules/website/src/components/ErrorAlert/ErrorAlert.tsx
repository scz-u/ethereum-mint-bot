import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
} from '@chakra-ui/modal'
import { Button } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { ErrorContext } from '../../context/ErrorContext'

export default function ErrorAlert() {
    const errorContext = useContext(ErrorContext)

    return (
        <AlertDialog
            isOpen={errorContext.isOpen}
            leastDestructiveRef={undefined}
            onClose={() => {}}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    {errorContext.title && (
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            {errorContext.title}
                        </AlertDialogHeader>
                    )}
                    <AlertDialogBody>Error: {errorContext.message}</AlertDialogBody>
                    <AlertDialogFooter>
                        <Button
                            colorScheme="red"
                            onClick={() => errorContext.close()}
                            ml={3}
                        >
                            Close
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}
