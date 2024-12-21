import { lazy } from 'react'
interface routes{
    path:string,
    name:string,
    meta?:object,
    element:React.ComponentType<any>,
    children?:routes[],
}

export const mainRoutes:routes={
    name:'full Layout',
    path:'/',
    meta:{requiresAuth:true},
    element:lazy(() => import('./../layout/FullLayout')),
    children:[
    {path:'/',name:'Dashboard',element:lazy(() => import('./../pages/Dashboard'))},
    {path:'/Bookshelf',name:'Bookshelf',element:lazy(()=> import('./../pages/Bookshelf'))},
    {path:'/Profile',name:'Profile',element:lazy(()=> import('./../pages/Profile'))},
]}