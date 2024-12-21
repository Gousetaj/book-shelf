import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import NotFound from "../pages/NotFound";
import { mainRoutes } from "./MainRoutes";
import { authRoutes } from "./AuthRoutes";
import RouterWrapper from "./RouterWrapper";
function AppRouter(){

return (<>
<Router>
    <Routes>
        {RouterWrapper(authRoutes)}
        {RouterWrapper(mainRoutes)}
        <Route path="*" element={<NotFound/>}/>
    </Routes>
</Router>
</>)
}
export default AppRouter