
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HanReciterSelect, getRecitersData } from "../../Redux/RecitersSlice";
import { getRewayahData } from "../../Redux/RewayahSlice";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import LoadingScreen from './../LoadingScreen/LoadingScreen';


const Reciters = () => {


    // hooks========================================>
    const { recitersData, SelectedReciter, isFetching } = useSelector((store) => store.reciters);
    const [handelOpenReciters, setHandelOpenReciters] = useState('false');
   ;




    const [allReciters, setallReciters] = useState(null);
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const language = localStorage.getItem("language");




    // reciters======================================>
    useEffect(() => {

        if (recitersData) {
            setallReciters(recitersData?.reciters);
        }
    }, [recitersData]);


    // handleReciterSelect===========================>
    const handleReciterSelect = (reciterName, reciterId) => {
       
        dispatch(HanReciterSelect({ reciterName, reciterId }));
        dispatch(getRewayahData(reciterId));
    };

  

    // component Did mount =================================>
    const handleDispatch = async () => {
        dispatch(getRecitersData());
    }

    useQuery(["handleDispatch", language], handleDispatch);

    // handleSearch==============================>
    const handleSearch = (event) => {
        const reciterSearchValue = event.target.value;
        const allRecitersAfterFilter = recitersData?.reciters?.filter((item) => item.name.toLowerCase().includes(reciterSearchValue.toLowerCase()));
        setallReciters(allRecitersAfterFilter);
    }

    return <>

        {/* reciters===============================> */}
        <div className='colum1  text-center   '>
            {!isFetching ? <LoadingScreen /> : ""}


            {/* listOfName================================> */}

            <div dir={`${language === "ar" ? "ltr" : "rtl"}`} className="listOfName  position-relative d-flex flex-column justify-content-center align-items-center  ">

                <button className="fs-5 py-1" onClick={() => setHandelOpenReciters(handelOpenReciters === "true" ? "false" : "true")} >
                    {SelectedReciter || t("chooseTheReciter")}
                    <i className={`fa-solid fa-caret-down ${language === "ar" ? "ps-2" : "pe-2"}`}></i>
                </button>

                <div className={`listContent b shadow-lg dropdown-menu   p-2 rounded-1 ${handelOpenReciters === "false" ? "d-none" : "d-block"}`}>


                    <div className='d-flex justify-content-center   ' >
                        <input   onChange={handleSearch} className={`mb-2 w-100  ${language === "ar" ? "text-end" : "text-start"}`} type="text" placeholder={t("search")} />
                    </div>

                    <div className='names border '>
                        {allReciters?.map((item) =>

                            <h6 key={item.id} className=' cursorPointer dropdown-item d-flex justify-content-end' onClick={() => {
                                setHandelOpenReciters(handelOpenReciters === "true" ? "false" : "true");
                                handleReciterSelect(item.name, item.id);
                            }
                            }>
                                {item.name}
                            </h6>
                        )}
                    </div>

                </div>


            </div>



        </div>

    </>

}

export default Reciters;