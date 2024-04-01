
import { useTranslation } from 'react-i18next';
import './Radio.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRadioData, handleRadioName } from '../../Redux/RadioSlice';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

const Radio = () => {




    // hooks=======================================>
    const language = localStorage.getItem("language");
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { radioData, radioName, radioUrl, isFetching } = useSelector((store) => store.radio);
    const [radioNames, setRadioNames] = useState(null);
    const [hideListContent, setHideListContent] = useState("false");


    // handleRadio===============================>
    const handleRadio = (url, name) => {
        dispatch(handleRadioName({ name, url }));

    }
    // handelInSearch=============================>
    const handelInSearch = (event) => {
        const radioName = event.target.value;

        const filterRadioData = radioData?.filter((item) => item.name.toLowerCase().includes(radioName.toLowerCase()));
        setRadioNames(filterRadioData)

    }
    // compoenent Did Mount========================>

    useEffect(() => {
        dispatch(getRadioData())
    }, [dispatch, language])

    useEffect(() => {
        setRadioNames(radioData);

    }, [radioData])






    return <>
        <section className='radio pb-5'>
            {!isFetching ? <LoadingScreen /> : ""}
            <div className=' vh-100 radioMainContent d-flex flex-column justify-content-center align-items-center pb-5 '>



                {/* listOfName========================================> */}
                <div dir={`${language === "ar" ? "ltr" : "rtl"}`} className="listOfName mb-4 position-relative d-flex flex-column justify-content-center align-items-center  ">

                    <button className='fs-5 py-1' onClick={() => setHideListContent(hideListContent === "true" ? "false" : "true")} >
                        {radioName || t("chooseTheRadio")}
                        <i className={`fa-solid fa-caret-down ${language === "ar" ? "ps-2" : "pe-2"}`}></i>
                    </button>

                    <div className={`listContent b shadow-lg dropdown-menu   p-2 rounded-1 ${hideListContent === "false" ? "d-none" : "d-block"}`}>


                        <div className='d-flex justify-content-center   ' >
                            <input onChange={handelInSearch} className={`mb-2 w-100  ${language === "ar" ? "text-end" : "text-start"}`} type="text" placeholder={t("search")} />
                        </div>

                        <div className='names border '>
                            {radioNames?.map((item) =>

                                <h6 key={item.id} className=' cursorPointer dropdown-item d-flex justify-content-end' onClick={() => {
                                    setHideListContent(hideListContent === "true" ? "false" : "true");
                                    handleRadio(item.url, item.name)
                                }
                                }>
                                    {item.name}
                                </h6>
                            )}
                        </div>
                    </div>

                </div>



                <audio autoPlay muted className=" " src={radioUrl} controls />


            </div>


        </section >
    </>
}

export default Radio;
