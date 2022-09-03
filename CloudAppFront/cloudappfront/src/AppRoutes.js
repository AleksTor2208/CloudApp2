import { Route, Navigate, Routes } from 'react-router-dom';
import LoginForm from './components/loginForm';
import RegisterForm from "./components/registerForm"
import NotFound from './components/notFound';
import Cloud from './components/cloud';
import Teams from './components/teams';
import Stats from './components/stats';
import NavBar from './components/navbar';
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";

const AppRoutes = [
    {
      index: true,
      element: <Cloud />
    },
    {
      path: '/counter',
      element: <Counter />
    },
    {
        path: '/register',
        element: <RegisterForm />
    },
    {
        path: '/login',
        element: <LoginForm />
    },
    //{
    //    path: '/cloud',
    //    element: <Cloud />
    //},
    {
        path: '/teams',
        element: <Teams />
    },
    {
        path: '/stats',
        element: <Stats />
    },
    {
        path: '/not-found',
        element: <NotFound />
    }
];


//<Route path="/register" component={RegisterForm}></Route>
//<Route path="/login" component={LoginForm}></Route>
//<Route path="/cloud" component={Cloud}></Route>
//<Route path="/teams" component={Teams}></Route>
//<Route path="/stats" component={Stats}></Route>
//<Route path="/not-found" component={NotFound}></Route>

export default AppRoutes;
