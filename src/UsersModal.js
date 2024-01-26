import React from 'react'
import { useDisclosure } from '@chakra-ui/hooks'
import { IconButton, Modal, ModalOverlay, ModalHeader, ModalContent, ModalCloseButton, ModalBody, Button, ModalFooter, Image, Text } from '@chakra-ui/react'
// import { ViewIcon } from '@chakra-ui/icons'
import {Box} from '@chakra-ui/react';
import { useUsersState } from './Context/UsersProvider';

export default function UsersModal({spentBws, children, users}) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    

  return (
    <>

      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
            textAlign={'center'}
            background={'rgba(109, 222, 188, 0.7)'}
        >
          <ModalHeader textShadow={'1px 1px 1px white'} fontFamily={'monospace'} padding={'5'} fontSize={40}>{spentBws?<span>Spent between</span>:<span>Total Users</span>}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box fontSize={25}>
                {users.map((u, i)=><Box fontWeight={'bold'} fontFamily={'cursive'} key={i}>{u}</Box>)}
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
