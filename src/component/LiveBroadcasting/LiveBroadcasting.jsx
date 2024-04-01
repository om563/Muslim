
import { useTranslation } from 'react-i18next';
import './LiveBroadcasting.css'
import ReactPlayer from 'react-player';
import { useEffect, useState } from 'react';

const LiveBroadcasting = () => {
    const { t, i18n } = useTranslation();
    const [channelUrl, setchannelUrl] = useState(null);
    const language = localStorage.getItem("language");

    useEffect(() => {
        i18n.changeLanguage(language)
    }, [i18n, language])



    return <>


        <section className='liveBroadcasting'>
            <h3 className='  text-center  pt-4'>{t("chooseTheLiveBroadcastChannel")}</h3>


            <div className='liveBroadcastingMainContent mt-4'>

                <div className='channels d-flex justify-content-center  '>
                    <button onClick={() => setchannelUrl(`https://youtu.be/-mr6TD6YxR8`)} className='shadow mx-3'>{t("sunnahChannel")}</button>
                    <button onClick={() => setchannelUrl(`https://youtu.be/moQtMet7F7w`)} className='shadow mx-3'>{t("quranChannel")}</button>
                </div>

                <div className='video d-flex justify-content-center mt-4 pb-4'>
                    <ReactPlayer url={`${channelUrl}`} controls playing width={"60%"} height={"470px"} />
                </div>

            </div>

        </section>
    </>
}

export default LiveBroadcasting;
