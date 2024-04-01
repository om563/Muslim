
import { Link, NavLink } from 'react-router-dom';
import './Nav.css'
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import NavModal from './NavModal';



const Nav = () => {

    //hooks ================================================>
    const [switcherMode, setswitcherMode] = useState(localStorage.getItem("theme") ?? "light");
    const { t, i18n } = useTranslation();

    // themeToggle==========================================>
    useEffect(() => {
        localStorage.setItem("theme", localStorage.getItem("theme") ?? "dark");
        document.body.classList.add(localStorage.getItem("theme"));
        i18n.changeLanguage(localStorage.getItem("language") ?? "ar");
        localStorage.setItem("language", localStorage.getItem("language") ?? "ar");
    }, [i18n])

    // handleTheme===================================>

    const handleTheme = () => {
        localStorage.setItem("theme", localStorage.getItem("theme") === "light" ? "dark" : "light");
        setswitcherMode(localStorage.getItem("theme"))
        if (localStorage.getItem("theme") === "light") {
            document.body.classList.remove("dark")
            document.body.classList.add("light")
        } else {
            document.body.classList.remove("light")
            document.body.classList.add("dark")
        }
    }

    // languageToggle====================================>
    const languageToggle = () => {

        localStorage.setItem("language", localStorage.getItem("language") === "ar" ? "en" : "ar");
        i18n.changeLanguage(localStorage.getItem("language"));
      
    }

    return <>



        <div className='NavModal'>
            <NavModal />
        </div>

        <nav className='py-3 fixed-top '>

            <div className='container  d-flex align-items-center justify-content-between'>

                {/* navItems======================================> */}
                <Link className='logo fs-4 fw-bold '>{t("muslim")}</Link>

                <div className='navItem'>

                    <ul className=' m-0 fs-5 fw-semibold d-flex  justify-content-between '>
                        <NavLink activeclassname="active" to={"alsalah"}  >{t("alsalah")}</NavLink>
                        <NavLink activeclassname="active" to={"radio"}  >{t("radio")}</NavLink>
                        <NavLink activeclassname="active" to={"tafser"}  >{t("tafser")}</NavLink>
                        <NavLink activeclassname="active" to={""} >{t("home")}</NavLink>
                    </ul>
                </div>

                {/* languageAndTheme================================> */}
                <div className='languageAndTheme   d-flex justify-content-center align-items-center'>

                    <h6 onClick={() => languageToggle()} className='m-0 cursorPointer me-3 fw-semibol '>{localStorage.getItem("language") === "ar" ? "EN" : "AR"}</h6>

                    <div onClick={() => handleTheme()} className="themeIcon position-relative ">
                        <div className='pe-1'>🌙</div>
                        <div className=''>🌚</div>
                        <div style={switcherMode === "light" ? { right: 0 } : { left: 0 }} className='switcher position-absolute m-0' />
                    </div>

                    <i className="fa-solid fa-bars text-white ps-4 fs-4 cursorPointer d-none menu" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                </div>

            </div>
        </nav>
    </>
}

export default Nav;
