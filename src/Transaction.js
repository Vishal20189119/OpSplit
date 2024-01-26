import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import { Box, Button, Input, Avatar } from "@chakra-ui/react";
import UsersModal from "./UsersModal";
import { useUsersState } from "./Context/UsersProvider";
import TModal from "./TModal";
import TransBox from "./TransBox";
import { Link } from "react-router-dom";
import stylesform from './css/form.module.css';

export default function Transaction() {
  const [uModal, setUModal] = useState(false);
  const [amount, setAmount] = useState();
  let {users, setUsers, transList} = useUsersState();
  let inputref = useRef();
  useEffect(()=>{
    inputref.current.focus();
  }, [transList])

  return (
    <>
      <Header />
      <UsersModal users={users}>
        <Box position={'absolute'}
          top={'23px'}
          left={'23px'}
        >
          <Avatar size={'lg'}/>
        </Box>
      </UsersModal>
      <form className={stylesform.formField}>
        <Input ref={inputref} mr={1} type="number" value={amount} onChange={(e)=> setAmount(e.target.value)} placeholder="Enter the amount" />
        <TModal amount={amount} setAmount={setAmount}>
          <Button ml={1}>
            Add expense
          </Button>

        </TModal>
      </form>
      
      <Box>
        {transList.map((t, index)=> <UsersModal key={index} spentBws={true} users={t.spentBws}><TransBox index={index} title={t.title} spentBy={t.spentBy} amount={t.amount.num}/></UsersModal>)}
      </Box>
      {(transList.length>0)?(<Link to={'/opsplit'}>
            <Button
                fontSize={20} mt={5} 
                width={'100%'}
                bg={'rgb(6, 213, 6)'}
                boxShadow={'0px 0px 7px 0.5px green'}
                _hover={{
                    background: 'green'
                }}
            >
                Calculate the optimal split
            </Button></Link>):("")}
    </>
  );
}
