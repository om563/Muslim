
import { Outlet } from 'react-router-dom';
import Nav from './../Nav/Nav';
// import Footer from './../Footer/Footer';

const Layout = () => {


    return <>
        <Nav />
        <Outlet />
    </>
}

export default Layout;
