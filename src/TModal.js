import React, { useEffect, useState } from "react";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  IconButton,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Button,
  ModalFooter,
  Image,
  Text,
  background,
} from "@chakra-ui/react";
// import { ViewIcon } from '@chakra-ui/icons'
import { Box, Input } from "@chakra-ui/react";
import { useUsersState } from "./Context/UsersProvider";
import { useNavigate } from "react-router-dom";

export default function TModal({amount, setAmount, children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  let { users, setUsers, transList, setTransList } = useUsersState();
  const [selectedOption, setSelectedOption] = useState("");

  // const [amount, setAmount] = useState(0);
  const [title, setTitle] = useState("");
  const [check, setCheck] = useState({});
  // const navigate = useNavigate();
  useEffect(() => {
    setCheck((prevCheck)=>{
      const newCheck = {};
      for(let key in prevCheck){
        newCheck[key] = false;
      }
      return newCheck;
    })
    setSelectedOption("");
    setTitle("");
    setAmount("");

  }, [transList]);

  const handleCheck = (u) => {
    setCheck((prevCheck) => ({
      ...prevCheck,
      [u]: !prevCheck[u],
    }));
    
  };
  const handleAddExpense=()=>{
    if(!amount){
      alert("Please add the amount first");
    }else{
      onOpen();
    }
  }
  const handleFinalExpense=()=>{
    // console.log("spentBy: ", selectedOption, "spentBw: ", check, "Amount: ", amount);
    console.log(title, typeof(title));
    let t = title;
    t = t.trim();
    let spentBws = [];
    let spentBy = selectedOption;
    for(let key in check){
      if(check[key]===true) spentBws.push(key);
    }
    if(t==="" || selectedOption===""|| spentBws.length===0){
      alert("All fields are necessary");
      return;
    }
    let obj = {spentBy, amount: {num: parseInt(amount), den: 1}, spentBws, title};
    console.log(obj);
    setTransList([obj, ...transList]);
    
    
    onClose();
  }


  return (
    <>
      <span onClick={handleAddExpense}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent background={'rgba(109, 222, 188, 0.9)'} textAlign={"center"}>
          <ModalHeader padding={"5"} fontSize={"4xl"} textShadow={'0px 0px 10px white'}>
            Enter transactions
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Input bg={'white'} boxShadow={'4px 4px 8px 0.1px #242626'} onChange={(e)=>setTitle(e.target.value)} type="text" placeholder="Please enter the title for transaction..."/>
            </Box>
            <Box 
              my={7}
              textAlign={"left"} 
              fontSize={16}
              // border={'2px'}
              padding={4}
              borderRadius={9}
              background={'#6ddebc'}
              boxShadow={'4px 4px 8px 0.1px #242626'}
            >
              <label style={{fontSize: '25px', fontFamily: 'cursive'}}>Spent by: </label>
              <select
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
                style={{marginLeft: '13px', background: '#ccf0e5', borderRadius: '5px'}}
              >
                <option value="" disabled>Select users</option>

                {users.map((u, i) => (
                  <option key={i}>{u}</option>
                ))}
              </select>
            </Box>

            <Box
              display={"flex"} 
              mt={5}
              p={4}
              borderRadius={9}
              background={'#6ddebc'}
              boxShadow={'4px 4px 8px 0.1px #242626'}
            >
              <Box textAlign={'left'} width={"135px"} fontSize={25} fontFamily={'cursive'}>
                Spent b/w:
              </Box>
              <form style={{ marginTop: "4px" }}>
                <Box display={"flex"} flexWrap={"wrap"}>
                  {users.map((u, i) => (
                    <Box key={i} mx={2} fontSize={20}>
                      <label>
                        <input
                          type="checkbox"
                          key={i}
                          value={u}
                          checked={check[u]}
                          onChange={() => handleCheck(u)}
                        />
                        {u}
                      </label>
                    </Box>
                  ))}
                </Box>
              </form>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleFinalExpense}>
              Add expense
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
