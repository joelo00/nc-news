import {Link} from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../users/UserContext';
import { getUsers } from '../../axios';

function Header() {
  const { user } = useContext(UserContext);
  return (
      <>
        <h1>NC NEWS</h1>
        {user && <div className='signed-in-box'>
          <h4 >Signed in as: {user}</h4>
          
          </div>
          }
      <nav>
        <Link to = "/">Home </Link>
        <Link to="/articles">Articles</Link> 
       {/*  <Link to = "/users"> Users</Link> */}
      </nav>
      </>
    )
  }

export default Header