import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useUsersState } from './Context/UsersProvider';
import finalTransactions from './transactionLogic';
import { Box, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import styleslist from './css/list.module.css'

let obj = {color: 'black', fontFamily: 'cursive'};

export default function OptimalSplit() {
    let [opList, setOpList] = useState([]);
    
    const {users, transList} = useUsersState();
    useEffect(()=>{
        setOpList(finalTransactions(transList, users));
    }, []);

  return (
    <>
        <Header/>
        <Box my={3}>
            {opList.length===0?<Box fontSize={20}>No Transaction Needed...</Box>:("")}
            {opList.map(e=><Box my={3} color={'white'} className={styleslist.list} fontSize={20} borderRadius={22} px={4} py={2} ><span style={obj}>{e[0]}</span> owe <span style={obj}>{e[1]}</span> to <span style={obj}>{e[2]}</span></Box>)}
        </Box>
        {/* {(users.length>0)?(<Link to={'/'}><Button fontSize={20} my={1} ml={2} width={'97%'}>Go back to homepage</Button></Link>):("")} */}
        {(users.length>0)?(<Link to={'/'}>
            <Button
                fontSize={20} mt={5} 
                width={'100%'}
                bg={'rgb(6, 213, 6)'}
                boxShadow={'0px 0px 7px 0.5px green'}
                _hover={{
                    background: 'green'
                }}
            >
                Go back to home page
            </Button></Link>):("")}
    </>
  )
}
