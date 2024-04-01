
import { useSelector } from "react-redux";

const Audio = () => {
    const { SurahLink } = useSelector((store) => store.surah);

 

    return (
        <div className="w-100 d-flex justify-content-center mt-4 homeAudio">
            <audio className="w-75" src={`${SurahLink}`} controls />

        </div>

    );
};

export default Audio;
