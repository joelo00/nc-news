import {Link} from 'react-router-dom'

function Header() {
    return (
      <>
        <h1>NC NEWS</h1>
      <nav>
        <Link to = "/">Home </Link>
        <Link to="/articles">Articles</Link> 
        <Link to = "/users"> Users</Link>
      </nav>
      </>
    );
  }

export default Header