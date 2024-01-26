import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, Input, background } from '@chakra-ui/react';
import Header from './Header';
import { useUsersState } from './Context/UsersProvider';
import { Link } from 'react-router-dom';
import styles from './css/form.module.css';
import styleslist from './css/list.module.css';
import stylestext from './css/textShadow.module.css';
import stylesbtn from './css/button.module.css';
import RemoveBtn from './RemoveBtn';


export default function Home() {
    const {users, setUsers} = useUsersState();
    const [user, setUser] = useState("");
    const inputref = useRef();
    useEffect(()=>{
        inputref.current.focus();
    }, [users])
    const handleAddFriend=()=>{
        let req = user;
        req = req.trim();
        if(req===""){
            alert("Please enter the field first");
            setUser("");
            inputref.current.focus();
            return;
        }
        if(users.includes(req)){
            alert("Username already exist, please add a different username to prevent confusion in transaction");
            return;
        }
        setUsers([user, ...users]);
        setUser("");
    }

  return (
    <Box>
        <Header/>
        <form className={styles.formField}>
            <Input ref={inputref} value={user} onChange={(e)=>setUser(e.target.value)} placeholder='Type your friend name' mr={1}/>
            <Button onClick={handleAddFriend} ml={1}>Add friend</Button>
        </form>
        <Box>
            {users.map((u, index)=>(
                <Box key={index}
                    borderRadius={10}
                    display={'flex'}
                    // m={2}
                    my={3}
                    justifyContent={'space-between'}
                    py={1}
                    px={3}
                    className={`${styleslist.list} ${stylestext.blackTextShadow}`}
                    color={'white'}
                >
                    <Box
                        fontSize={25}
                        width={'80%'}
                    >
                        {u}
                    </Box>
                    <RemoveBtn users={users} index={index}/>

                </Box>
            ))}
        </Box>
        {(users.length>0)?(<Link to={'/transaction'}>
            <Button
                fontSize={20} mt={5} 
                width={'100%'}
                bg={'rgb(6, 213, 6)'}
                boxShadow={'0px 0px 7px 0.5px green'}
                _hover={{
                    background: 'green'
                }}
            >
                Proceed to optimal split
            </Button></Link>):("")}
    </Box>
  )
}
