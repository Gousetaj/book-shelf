import { Route } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute"
import { Suspense } from 'react'
const RouterWrapper=(mainRoutes:any)=>{
return <Route path={mainRoutes.path} element={<Suspense fallback={<div></div>}>
{mainRoutes?.meta?.requiresAuth?<ProtectedRoute><mainRoutes.element/>
    </ProtectedRoute>:<mainRoutes.element/>}
</Suspense>
}>
    {mainRoutes.children && mainRoutes.children.map((route:any)=>{
    return <Route key={route.name} path={route.path} element={<Suspense fallback={<div></div>}>
{mainRoutes?.meta?.requiresAuth?<ProtectedRoute><route.element /></ProtectedRoute>:<route.element />}
</Suspense>
} />
    }) }
    </Route>
}
export default RouterWrapper