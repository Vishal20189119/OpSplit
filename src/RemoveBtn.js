import React, { useEffect } from "react";
import { useUsersState } from "./Context/UsersProvider";
import { Box } from "@chakra-ui/react";


export default function RemoveBtn({users, transList, index}) {
    const {setUsers, setTransList} = useUsersState();
    const handleRemove=(index, e)=>{
        e.stopPropagation();
        console.log("Remove tbn: ", users, transList, index);
        if(users) setUsers(users.filter((e, i)=>i!==index));
        else setTransList(transList.filter((e, i)=>i!==index));
    }
    // useEffect(()=>{
    //     console.log("Remove tbn: ", users, transList, index);
    // },[])


  return (
    <Box
      alignSelf={"center"}
      borderRadius={8}
      py={0.5}
      px={2}
      onClick={(e) => handleRemove(index, e)}
      background={"brown"}
      textShadow={"1.6px 1.6px 2px black"}
      boxShadow={"0px 0px 2px 1.5px brown"}
      _hover={{
        cursor: "pointer",
        boxShadow: "none",
        boxShadow: "0px 0px 5px 0.5px black",
        background: "red",
      }}
      fontFamily={"cursive"}
    >
      Remove
    </Box>
  );
}
