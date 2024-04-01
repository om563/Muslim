
import React, { useEffect, useState } from 'react'
import image1 from "../../Assets/Images/AlSalahImage/fajr-prayer (1).png"
import image2 from "../../Assets/Images/AlSalahImage/dhhr-prayer-mosque.png"
import image3 from "../../Assets/Images/AlSalahImage/asr-prayer-mosque.png"
import image4 from "../../Assets/Images/AlSalahImage/sunset-prayer-mosque (1).png"
import image5 from "../../Assets/Images/AlSalahImage/night-prayer-mosque.png"
import axios from 'axios'
import './Alsalah.css'
// moment ar=====================================>
import moment from 'moment/moment'
import 'moment/locale/ar-dz';
moment.locale("ar")




export default function AlSalah() {

    // hooks and variables===============================================>
    const language = localStorage.getItem("language");
    const [handelOpenSalah, setHandelOpenSalah] = useState("false");
    const [selectedCity, setSelectedCity] = useState("القاهرة");
    const [prayer, setPrayer] = useState([])
    const [today, setToday] = useState("");
    const [governorates, setGovernorates] = useState(null);


    //get getAllPrayers=========================================================>
    async function getAllPrayers(city) {
        let { data } = await axios.get(`https://api.aladhan.com/v1/timingsByCity?country=EG&city=${city}`);
        setPrayer(data?.data.timings);
        setSelectedCity(city);
    }

    // A counter to reach the next prayer===========================================>
    const prayersArray = [
        { key: "Fajr", displayName: "الفجر" },
        { key: "Dhuhr", displayName: "الظهر" },
        { key: "Asr", displayName: "العصر" },
        { key: "Sunset", displayName: "المغرب" },
        { key: "Isha", displayName: "العشاء" },
    ];
    
    const [nextPrayer, setnextPrayer] = useState();
    const [remainingTime, setRemainingTime] = useState("");

    // setupCountDownTimer==========================================================>
    const setupCountDownTimer = () => {
        const momentNow = moment();
        let prayerIndex = null;

        if (prayer && Object.keys(prayer).length > 0) {
            if (
                momentNow.isAfter(moment(prayer["Fajr"], "hh:mm")) &&
                momentNow.isBefore(moment(prayer["Dhuhr"], "hh:mm"))
            ) {
                prayerIndex = 1;
            } else if (
                momentNow.isAfter(moment(prayer["Dhuhr"], "hh:mm")) &&
                momentNow.isBefore(moment(prayer["Asr"], "hh:mm"))
            ) {
                prayerIndex = 2;
            } else if (
                momentNow.isAfter(moment(prayer["Asr"], "hh:mm")) &&
                momentNow.isBefore(moment(prayer["Sunset"], "hh:mm"))
            ) {
                prayerIndex = 3;
            } else if (
                momentNow.isAfter(moment(prayer["Sunset"], "hh:mm")) &&
                momentNow.isBefore(moment(prayer["Isha"], "hh:mm"))
            ) {
                prayerIndex = 4;
            } else {
                prayerIndex = 0;
            }

            setnextPrayer(prayerIndex);

            const nextPrayerObject = prayersArray[prayerIndex];
            const nextPrayerTime = prayer[nextPrayerObject?.key];
            const nextPrayerTimeMoment = moment(nextPrayerTime, "hh:mm");

            let remainingTime = moment(nextPrayerTime, "hh:mm").diff(momentNow);

            if (remainingTime < 0) {
                const midnightDiff = moment("23:59:59", "hh:mm:ss").diff(momentNow);
                const fajrToMidnightDiff = nextPrayerTimeMoment.diff(moment("00:00:00", "hh:mm:ss"));
                const totalDiffernce = midnightDiff + fajrToMidnightDiff;
                remainingTime = totalDiffernce;
            }

            const durationRemainingTime = moment.duration(remainingTime);
            setRemainingTime(
                `${durationRemainingTime.hours()}: ${durationRemainingTime.minutes()} : ${durationRemainingTime.seconds()} `
            );
        }
    };


    const allCity = [
        "القاهرة",
        "الإسكندرية",
        "الجيزة",
        "الإسماعيلية",
        "أسوان",
        "أسيوط",
        "البحر الأحمر",
        "البحيرة",
        "بني سويف",
        "بورسعيد",
        "دمياط",
        "السويس",
        "الشرقية",
        "الغربية",
        "الفيوم",
        "القليوبية",
        "قنا",
        "كفر الشيخ",
        "مطروح",
        "المنوفية",
        "المنيا",
        "الوادي الجديد",
        "شمال سيناء",
        "جنوب سيناء",
        "سوهاج",
        "الأقصر",
        "قناة السويس"
    ];



    // handleCitySearch=============================================================>
    const handleCitySearch = (event) => {
        const searchValue = event.target.value;
        const filterGovernorates = allCity.filter((item) => item.includes(searchValue));
        setGovernorates(filterGovernorates);
    }


    // all useEffect===============================================================>
    useEffect(() => {
        getAllPrayers(selectedCity);
    }, [selectedCity])

    useEffect(() => {
        const t = moment();
        setToday(t.format("MMM Do Y | h:mm"));
        setGovernorates(allCity);
        getAllPrayers(selectedCity)
    }, [])


    useEffect(() => {

        const time = setInterval(() => {
            setupCountDownTimer()
        }, 1);

        return () => { // The function will be executed if the unmounting fase 
            clearInterval(time);
        }

    }, [prayer])





    return <>

        <section className='alsalah position-relative'>

            <div className="d-flex justify-content-center flex-column  ">



                <div>


                    {/* listOfName================================> */}

                    <div className="listOfName mb-3 b  position-relative d-flex flex-column justify-content-center align-items-center  ">
                        <h2 className='mb-3 '>أختر المدينة</h2>
                        <button className="fs-5 py-1" onClick={() => setHandelOpenSalah(handelOpenSalah === "true" ? "false" : "true")} >
                            {selectedCity}
                            <i className={`fa-solid fa-caret-down ${language === "ar" ? "ps-2" : "pe-2"}`}></i>
                        </button>

                        <div className={`listContent b shadow-lg dropdown-menu   p-2 rounded-1 ${handelOpenSalah === "false" ? "d-none" : "d-block"}`}>


                            <div className='d-flex justify-content-center    ' >
                                <input onChange={handleCitySearch} className={`mb-2 w-100 text-end  `} type="text" placeholder='أبحث' />
                            </div>

                            <div className='names border '>
                                {governorates?.map((item, index) =>

                                    <h6 key={index} className=' cursorPointer dropdown-item d-flex justify-content-end' onClick={() => {
                                        setHandelOpenSalah(handelOpenSalah === "true" ? "false" : "true");
                                        setSelectedCity(item)
                                    }
                                    }>
                                        {item}
                                    </h6>
                                )}
                            </div>

                        </div>


                    </div>




                    <div className='d-flex justify-content-around align-items-center'>

                        <div>
                            <h6 className='mainColor time '>متبقي حتي صلاه {prayersArray[nextPrayer]?.displayName}</h6>
                            <h1 className='text-reversed '>{remainingTime}</h1>
                        </div>

                        <div dir='rtl'>
                            <h6 className='mainColor date fs-6 d-flex justify-content-end'>{today} </h6>

                            <h2>{selectedCity}</h2>


                        </div>

                    </div>

                </div>





















                <div className="d-flex gap-3 flex-wrap AlsalahCart mt-4 justify-content-center  ">

                    {/* 1 */}
                    <div className=" cart">
                        <div className=' '>

                            <div className='img d-flex flex-column justify-content-center text-center'>
                                <img className='w-100' src={image5} alt="" />
                            </div>

                            <h5 className='white d-flex justify-content-end mt-4 me-2 '>العشاء</h5>
                            <h1 className='me-2 mt-3 d-flex justify-content-end  '>{prayer?.Isha}</h1>

                        </div>
                    </div>

                    {/* 2 */}
                    <div className="  cart ">


                        <div className='img d-flex  flex-column justify-content-center text-center'>
                            <img className=' w-100' src={image4} alt="" />
                        </div>

                        <h5 className=' d-flex justify-content-end mt-4 me-2 '>المغرب</h5>
                        <h1 className='me-2 mt-3 d-flex justify-content-end '>{prayer?.Maghrib}</h1>

                    </div>

                    {/* 3 */}
                    <div className="  cart">


                        <div className='img d-flex flex-column justify-content-center text-center'>
                            <img className='w-100' src={image3} alt="" />
                        </div>

                        <h5 className='white d-flex justify-content-end mt-4 me-2 '>العصر</h5>
                        <h1 className='me-2 mt-3 d-flex justify-content-end  pb-2'>{prayer?.Asr}</h1>

                    </div>

                    {/* 4 */}
                    <div className=" cart">


                        <div className='img d-flex flex-column justify-content-center text-center'>
                            <img className='w-100' src={image2} alt="" />
                        </div>

                        <h5 className='white d-flex justify-content-end mt-4 me-2 '>الظهر</h5>
                        <h1 className='me-2 mt-3 d-flex justify-content-end  pb-2'>{prayer?.Dhuhr}</h1>

                    </div>

                    {/* 5 */}
                    <div className="  cart">

                        <div className='img d-flex flex-column justify-content-center text-center'>
                            <img className='w-100' src={image1} alt="" />
                        </div>

                        <h5 className='white d-flex justify-content-end mt-4 me-2 '>الفجر</h5>
                        <h1 className='me-2 mt-3 d-flex justify-content-end  pb-2'>{prayer?.Fajr}</h1>
                    </div>


                </div>



            </div>
        </section>



    </>
}
