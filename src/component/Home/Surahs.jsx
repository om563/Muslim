import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleSuran } from "../../Redux/SurahSlice";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";



const Surahs = () => {


    // hooks========================================>
    const [allsurahs, setallsurahs] = useState(null);
    const { selectReyahaData } = useSelector((store) => store.rewayah);
    const { selectSura } = useSelector((store) => store.surah);
    const [allSurahsForSearch, setAllSurahsForSearch] = useState(null);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { selectReyahaName } = useSelector((store) => store.rewayah);
    const [handelOpenSurah, setHandelOpenSurah] = useState("false");


    // surah======================================>
    const surah = async () => {

        return await axios.get(`https://mp3quran.net/api/v3/suwar?language=${language === "en" ? "eng" : "ar"}`);
    }
    const language = localStorage.getItem("language")



    const { data } = useQuery(["surah", language], surah);



    useEffect(() => {
        if (selectReyahaData) {

            const numbersArray = selectReyahaData?.surah_list.split(',');

            const numbers = numbersArray?.map(str => parseInt(str));
            const surahs = data?.data?.suwar.filter(element => numbers?.includes(element.id));
            setallsurahs(surahs);
            setAllSurahsForSearch(surahs);

        }

    }, [language, selectReyahaData, data])



    // handleSelectSuran==============================>
    const handleSelectSuran = (name, id) => {
        const padId = id.toString().padStart(3, '0');

        dispatch(handleSuran({ selectReyahaData, padId, name }))

    }

    // handleSurahSearch=================================>
    const handleSurahSearch = (event) => {

        const searchValue = event.target.value;
        const surahsFilter = allSurahsForSearch.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()));
        setallsurahs(surahsFilter);

    }




    return <>

        {/* surah===============================> */}
        <div className='colum3  mb-0 text-center  d-flex flex-column align-items-center'>



            {/* drapdowns menu=======================================>
            <div dir={`${language === "ar" ? "ltr" : "rtl"}`} className="dropdown mt-3 ">

                <button className="btn btn-secondary fs-5 py-1 shadow d-flex align-items-center justify-content-center ps-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {selectSura || t("chooseTheSurah")} <i className={`fa-solid fa-caret-down ${language === "en" ? "pe-2" : "ps-2"}`}></i>
                </button>

                {selectReyahaName ? <ul className="dropdown-menu  ">

                    <div className="mx-1 mb-2">
                        <input dir={`${language === "ar" ? "rtl" : "ltr"}`} onChange={handleSurahSearch} className="form-control" type="text" placeholder="أبحث" />
                    </div>

                    <div className="allSurahs ">

                        {allsurahs?.map((item) => (
                            <li className='cursorPointer' key={item.id}>
                                <h6 className="dropdown-item d-flex justify-content-end" onClick={() => handleSelectSuran(item.name, item.id, item)}>
                                    {item.name}
                                </h6>
                            </li>

                        ))}
                    </div>

                </ul> : <ul className="dropdown-menu hiddenDropdown  ">



                    <div className="allSurahs">


                        <li className='cursorPointer' >
                            <h5 className="dropdown-item d-flex justify-content-center ">
                                {(t("chooseTheRewayahAndTheReciter"))}
                            </h5>
                        </li>


                    </div>

                </ul>}
            </div> */}

            {/* listOfNames=================================================> */}
            <div dir={`${language === "ar" ? "ltr" : "rtl"}`} className="listOfName  position-relative d-flex flex-column justify-content-center align-items-center  ">

                <button className="fs-5 py-1" onClick={() => setHandelOpenSurah(handelOpenSurah === "true" ? "false" : "true")} >
                    {selectSura || t("chooseTheSurah")}
                    <i className={`fa-solid fa-caret-down ${language === "ar" ? "ps-2" : "pe-2"}`}></i>
                </button>

                {selectReyahaName ? <div className={`listContent b shadow-lg dropdown-menu   p-2 rounded-1 ${handelOpenSurah === "false" ? "d-none" : "d-block"}`}>

                    <div className='d-flex justify-content-center   ' >
                        <input onChange={handleSurahSearch} className={`mb-2 w-100  ${language === "ar" ? "text-end" : "text-start"}`} type="text" placeholder={t("search")} />
                    </div>
                    <div className='names border '>
                        {allsurahs?.map((item) =>

                            <h6 key={item.id} className=' cursorPointer dropdown-item d-flex justify-content-end' onClick={() => {
                                setHandelOpenSurah(handelOpenSurah === "true" ? "false" : "true");
                                handleSelectSuran(item.name, item.id, item)
                            }
                            }>
                                {item.name}
                            </h6>
                        )}
                    </div>

                </div> :
                    <div className={`listContent hiddenListContent b shadow-lg dropdown-menu   p-2 rounded-1 ${handelOpenSurah === "false" ? "d-none" : "d-block"}`}>



                        <div className='names border h-auto hiddenNames '>

                            <h6 className=' cursorPointer  fw-medium fs-5 m-0 p-0' onClick={() => {
                                setHandelOpenSurah(handelOpenSurah === "true" ? "false" : "true");

                            }
                            }>
                                {(t("chooseTheRewayah"))}

                            </h6>

                        </div>

                    </div>}


            </div>


        </div>

    </>

}

export default Surahs;
