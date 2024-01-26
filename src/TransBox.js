import { Box, Input } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import styleslist from './css/list.module.css';
import RemoveBtn from './RemoveBtn';
import { useUsersState } from './Context/UsersProvider';

export default function TransBox({index, title, spentBy, amount}) {
  let {transList} = useUsersState();
  // useEffect(()=>{
  //   console.log("Transbox key: ", index);
  // }, []);
  
  return (
    <Box display={'flex'} justifyContent={'space-between'} color={'white'} className={styleslist.list} borderRadius={7} my={3} p={3} 
      _hover={{
        cursor: 'pointer',
        bg: '#0367ad',
        boxShadow: '4px 4px 7px 2px grey'
      }}
    >
        
        <Box width={'70%'} mt={-1.5}>
          <Box mb={1} textShadow={'2px 2px 2px black'} fontSize={30}><h1>{title}</h1></Box>
          <Box textShadow={'1px 1px 1px black'} fontSize={14}>Spent By: {spentBy} ({amount}/-)</Box>
        </Box>
        <RemoveBtn index={index} transList={transList}/>
    </Box>
  )
}
