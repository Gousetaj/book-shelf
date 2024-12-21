import { lazy } from "react";
export const authRoutes={
    name:'blank Layout',
    path:'/auth',
    meta:{requiresAuth:false},
    element:lazy(() => import('./../layout/BlankLayout')),
    children:[
        {path:'/auth/login',name:'Login Form',element:lazy(()=>import('./../pages/authentication/Login'))},
        {path:'/auth/signup',name:'Login Form',element:lazy(()=>import('./../pages/authentication/SignUp'))}
    ]}


