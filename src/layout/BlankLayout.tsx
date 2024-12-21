import { Outlet } from 'react-router-dom'; 
function FullLayout(){
return (<>
<div style={{height:'100%'}}>
        <Outlet />  {/* This will render the child routes */}
</div>
</>)
}
export default FullLayout