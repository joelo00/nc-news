import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { getUsers } from '../../axios'
import { UserContext, UserProvider } from '../users/UserContext';

function Home() {
    const { user, setUser } = useContext(UserContext);
    const [users, setUsers] = useState([]);
    const [loadingHome, setLoadingHome] = useState(true);
    useEffect(() => {
      const fetchUsers = async () => {
        const { data:{users} } = await getUsers();
        setUsers(users);
        setLoadingHome(false)
       };
  
      fetchUsers();
    },[]);
    const handleSignIn = (username) => {
      setUser(username);

    };
  
    return (
        loadingHome ? <h2>Loading...</h2> :
     
      user ? <>
      <h1>Welcome {user}</h1>
      <button onClick={()=>setUser('')}>Change User</button> 
      </>
      :
      <>
        <h1>Click on a user to sign in</h1>
        <div className="users-container">
          {users.map((user) => {
            return (
              <div key={user.username} className="user">
                <h2>Username: {user.username}</h2>
                <p>Name: {user.name}</p>
                <button onClick={() => handleSignIn(user.username)}>
                  Sign in as {user.username}
                </button>
              </div>
            );
          })}
        </div>
      
      </>
      
    );
  }
export default Home