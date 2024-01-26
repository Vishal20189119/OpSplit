import {createContext, useContext, useState} from 'react';

const UsersContext = createContext();

const UsersProvider = ({children})=>{
    const [users, setUsers] = useState([]);
    const [transList, setTransList] = useState([]);
    return <UsersContext.Provider value={{users, setUsers, transList, setTransList}}>{children}</UsersContext.Provider>
}

export const useUsersState = ()=> useContext(UsersContext);
export default UsersProvider;