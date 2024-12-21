import { Link } from "react-router-dom"
import './authentication/Login.css'
function NotFound(){
    return (<>
    <div className="main-div">
    <div>Page not found</div>
    <Link to="/">Go back to Dashboards</Link>
    </div>
    </>)
}
export default NotFound