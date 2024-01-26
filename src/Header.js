import React from 'react'
import {Box} from '@chakra-ui/react'
import styles from './css/textShadow.module.css'

export default function Header() {
  return (
    <Box
        textAlign={'center'}
        fontSize={60}
        className={styles.blackTextShadow}
        color={'brown'}
        mt={-4}
    >
        OpSplit
    </Box>
  )
}
