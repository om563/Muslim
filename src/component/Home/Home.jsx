import './Home.css'
import Rewayah from './Rewayah';
import Audio from './Audio';
import Reciters from './Reciters';
import Surahs from './Surahs';
import LiveBroadcasting from '../LiveBroadcasting/LiveBroadcasting';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Footer from '../Footer/Footer';






const Home = () => {

    const { i18n } = useTranslation();
    // handleLanguage==========================================>
    useEffect(() => {
        i18n.changeLanguage(localStorage.getItem("language") ?? "ar");
        localStorage.setItem("language", localStorage.getItem("language") ?? "ar");
    }, [i18n])
    const language = localStorage.getItem("language");



    return <>
        <section className='home'>
            <div className='background' />

            <div className="container   h-100 d-flex align-items-center justify-content-center  ">

                <div dir={`${language === "en" ? "ltr" : "rtl"}`} className='mainContent     '>


                    <div className=' h-50 d-flex  flex-wrap align-items-center justify-content-around row1   '>



                        {/*reciter ==========================================> */}
                        <Reciters />

                        {/*rewayah ==========================================> */}
                        <Rewayah />

                        {/*Surahs ==========================================> */}
                        <Surahs />


                    </div>

                    {/* audio========================================> */}
                    <Audio />


                </div>
            </div>
        </section>
        <LiveBroadcasting />
        <Footer />
    </>
};

export default Home;
