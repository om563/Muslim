

import './Tafser.css'
import { useEffect, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSuarhs, getTafserData, handleSelectedTafser, handleSurahName } from '../../Redux/TafserSlice';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

const Tafser = () => {


    // hooks=======================================>
    const [elayat, SetElayat] = useState(null)
    const [selectedAyaData, setSelectedAyaData] = useState(null)
    const { t } = useTranslation();
    const language = localStorage.getItem("language")
    const dispatch = useDispatch();
    const { tafserData, allSuarhs, isFetching, selectedSurahName, surahId, selectedAya, TafserUrl } = useSelector((store) => store.tafser);
    const [allSurahNames, setAllSurahNames] = useState(null);
    const [handleOpenSurah, setHandleOpenSurah] = useState("false");
    const [handelOpenTafser, setHandelOpenTafser] = useState("false");



    // getAllSuarhs=================================>
    useEffect(() => {
        dispatch(getAllSuarhs());
        setAllSurahNames(allSuarhs);
    }, [isFetching])

    // handleSearch=================================>
    const handleSearch = (event) => {
        const searchValue = event.target.value;
        const surahsAfterFilter = allSuarhs?.filter((item) => item.name.includes(searchValue));
        setAllSurahNames(surahsAfterFilter);
    }


    // handleSelectedSurah==========================>
    const handleSelectedSurah = (name, id) => {
        dispatch(handleSurahName({ name, id }));
    }

    // getTafserData===============================>
    useEffect(() => {
        dispatch(getTafserData())
    }, [dispatch])

    useEffect(() => {
        const tafser = tafserData?.tafasir.soar.filter((item) => item.sura_id === surahId);
        SetElayat(tafser);
        setSelectedAyaData(tafser);
    }, [surahId]);


    // handleTafserChange===========================>
    const handleTafserChange = (event) => {
        const tafserName = event.target.value;
        const tafserAfterFilter = selectedAyaData.filter((item) => item.name.includes(tafserName));
        SetElayat(tafserAfterFilter)
    }

    // handleTafser====================================>
    const handleTafser = (tafserName, tafserUrl) => {
        dispatch(handleSelectedTafser({ tafserUrl, tafserName }))

    }


    return <>
        <section className='tafser d-flex justify-content-start align-items-center flex-column    '>
            <h2>{t("ConclusionFromAlTabarisInterpretation")}</h2>

            {!isFetching ? <LoadingScreen /> : ""}


            <div className='tafserContent    mt-5 mb-3   d-flex align-items-center  justify-content-center  w-100   '>

                {/* elayat==========================> */}
                <div className='aya d-flex justify-content-center align-items-center  flex-column  '>

                    {/* listOfName========================================> */}
                    <div  className="listOfName  position-relative d-flex flex-column justify-content-center align-items-center  ">

                        <button className='fs-5 py-1' dir={`${language === "ar" ? "ltr" : "rtl"}`} onClick={() => setHandelOpenTafser(handelOpenTafser === "true" ? "false" : "true")} >
                            {selectedAya || (t("chooseTheAya"))}
                            <i className={`fa-solid fa-caret-down ${language === "ar" ? "ps-2" : "pe-2"}`}></i>
                        </button>

                        {elayat ? <div className={`listContent b shadow-lg dropdown-menu   p-2 rounded-1 ${handelOpenTafser === "false" ? "d-none" : "d-block"}`}>


                            <div className='d-flex justify-content-center   ' >
                                <input onChange={handleTafserChange} className={`mb-2 w-100 text-end`} type="text" placeholder="أبحث" />
                            </div>

                            <div className='names border '>
                                {elayat?.map((item) =>

                                    <h6 key={item.id} className=' cursorPointer dropdown-item d-flex justify-content-end' onClick={() => {
                                        setHandelOpenTafser(handelOpenTafser === "true" ? "false" : "true");
                                        handleTafser(item.name, item.url)
                                    }
                                    }>
                                        {item.name}
                                    </h6>
                                )}
                            </div>

                        </div> :
                            <div className={`listContent hiddenListContent b shadow-lg dropdown-menu   p-2 rounded-1 ${handelOpenTafser === "false" ? "d-none" : "d-block"}`}>



                                <div className='names border h-auto hiddenNames '>

                                    <h6 className=' cursorPointer  fw-medium fs-5 m-0 p-0' onClick={() => {
                                        setHandelOpenTafser(handelOpenTafser === "true" ? "false" : "true");

                                    }
                                    }>
                                        {t("chooseTheSurah")}

                                    </h6>

                                </div>

                            </div>}

                    </div>




                </div>

                {/* surah===========================================> */}
                <div  className="listOfName  position-relative d-flex flex-column justify-content-center align-items-center  ">

                    <button className='fs-5 py-1' dir={`${language === "ar" ? "ltr" : "rtl"}`} onClick={() => setHandleOpenSurah(handleOpenSurah === "true" ? "false" : "true")} >
                        {selectedSurahName || (t("chooseTheSurah"))}
                        <i className={`fa-solid fa-caret-down ${language === "ar" ? "ps-2" : "pe-2"}`}></i>
                    </button>

                    <div className={`listContent b shadow-lg dropdown-menu   p-2 rounded-1 ${handleOpenSurah === "false" ? "d-none" : "d-block"}`}>


                        <div className='d-flex justify-content-center   ' >
                            <input onChange={handleSearch} className={`mb-2 w-100 text-end  `} type="text" placeholder="أبحث" />
                        </div>

                        <div className='names border '>
                            {allSurahNames?.map((item) =>

                                <h6 key={item.id} className=' cursorPointer dropdown-item d-flex justify-content-end' onClick={() => {
                                    setHandleOpenSurah(handleOpenSurah === "true" ? "false" : "true");
                                    handleSelectedSurah(item.name, item.id)
                                }
                                }>
                                    {item.name}
                                </h6>
                            )}
                        </div>

                    </div>


                </div>

            </div >


            <div className='mt-4'>

                <ReactAudioPlayer
                    src={TafserUrl}
                    autoPlay
                    muted
                    controls
                />

            </div>


        </section>
    </>
}

export default Tafser;
