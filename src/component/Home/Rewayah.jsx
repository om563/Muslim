
import { useDispatch, useSelector } from "react-redux";
import { getRewayahData, handleRewayah } from "../../Redux/RewayahSlice";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";




const Rewayah = () => {

    // hooks========================================>
    const { allRewayah, selectReyahaName } = useSelector((store) => store.rewayah);
    const { t } = useTranslation()
    const dispatch = useDispatch();
    const language = localStorage.getItem("language");
    const [handelOpenRewaya, setHandelOpenRewaya] = useState("false")
    const { reciterId } = useSelector((store) => store.reciters);



    // handleSelectRewayah=============================>
    const handleSelectRewayah = async (name, rewayahDataForSurah) => {
        dispatch(handleRewayah({ rewayahDataForSurah, name }));
    }


    useEffect(() => {
        if (reciterId) {
            dispatch(getRewayahData(reciterId));

        }
    }, [dispatch, reciterId])


    return <>
        {/* reciters==================================> */}


        {/* rewayah===============================> */}
        <div className='colum2  text-center position-relative'>






            {/* listOfName=====================================> */}
            <div dir={`${language === "ar" ? "ltr" : "rtl"}`} className="listOfName  position-relative d-flex flex-column justify-content-center align-items-center  ">

                <button className="fs-5 py-1" onClick={() => setHandelOpenRewaya(handelOpenRewaya === "true" ? "false" : "true")} >
                    {selectReyahaName || t("chooseTheRewayah")}
                    <i className={`fa-solid fa-caret-down ${language === "ar" ? "ps-2" : "pe-2"}`}></i>
                </button>

                {allRewayah ? <div className={`listContent b shadow-lg dropdown-menu    p-2 rounded-1 ${handelOpenRewaya === "false" ? "d-none" : "d-block"}`}>


                    <div className='names rewayahName border '>
                        {allRewayah?.map((item) =>

                            <h6 key={item.id} className=' cursorPointer dropdown-item d-flex justify-content-end' onClick={() => {
                                setHandelOpenRewaya(handelOpenRewaya === "true" ? "false" : "true");
                                handleSelectRewayah(item.name, item);
                            }
                            }>
                                {item.name}
                            </h6>
                        )}
                    </div>

                </div> :
                    <div className={`listContent hiddenListContent b shadow-lg dropdown-menu   p-2 rounded-1 ${handelOpenRewaya === "false" ? "d-none" : "d-block"}`}>



                        <div className='names border  hiddenNames '>

                            <h6 className=' cursorPointer  fw-medium fs-5 m-0 p-0' onClick={() => {
                                setHandelOpenRewaya(handelOpenRewaya === "true" ? "false" : "true");

                            }
                            }>
                                {t("chooseTheReciter")}

                            </h6>

                        </div>

                    </div>}


            </div>

        </div>


    </>

}

export default Rewayah; 
