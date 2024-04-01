
import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";



const NavModal = () => {
    // hooks===========================================>
    const { t } = useTranslation();

    return <>



        <div className="modal fade border" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">

            <div className="modal-dialog   ">

                <div className="modal-content  ">

                    <div className="modal-header d-flex justify-content-between  border-0">
                        <Link className='logo fs-4 fw-bold '>{t("muslim")}</Link>
                        <i data-bs-dismiss="modal" aria-label="Close" className="fa-solid fa-xmark fs-5 cursorPointer"></i>
                    </div>


                    <div dir="" className='navItem hiddenNav  '>
                        <ul className='  d-flex flex-column p-0 justify-content-center   align-items-center fs-5 pt-2 pb-5 '>
                            <NavLink activeclassname="active " to={""} >{t("home")}</NavLink>
                            <NavLink activeclassname="active " to={"tafser"}  >{t("tafser")}</NavLink>
                            <NavLink activeclassname="active " to={"radio"}  >{t("radio")}</NavLink>
                            <NavLink activeclassname="active " to={"alsalah"}  >{t("alsalah")}</NavLink>
                        </ul>
                    </div>

                </div>
            </div>

        </div>

    </>
}

export default NavModal;
