import { Outlet, useNavigate } from 'react-router-dom'; 
import './fullLayout.css'
function FullLayout(){
  const navigate=useNavigate()
  const handleLogout=()=>{
    localStorage.removeItem('isLoggedIn')
    navigate('/')
  }

return (<>
    <div className='layout'>
      <header className='header' >
        <button className="align-right" onClick={handleLogout}>Logout</button>
      </header>
      <nav className='navigation text-center'>Navigation</nav>
      <main className='main-container'>
        {Outlet && <Outlet />}  {/* This will render the child routes */}
      </main>
    </div>
</>)
}
export default FullLayout