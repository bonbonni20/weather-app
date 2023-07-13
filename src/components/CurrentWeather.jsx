import React from 'react'
import { ReactComponent as Logo } from '../assets/icons/openweather-logo.svg'
import SearchBox from './SearchBox.jsx'
import CurrentDescription from './CurrentDescription.jsx'
import CurrentMiniCards from './CurrentMiniCards.jsx'
import DailyWeather from './DailyWeather'

const CurrentWeather = ({ currentData, searchInfo, forecastData }) => {
    const toggleChange = (toggleInfo) => { searchInfo(toggleInfo) }
    return (
        <>
            <div className='flex  justify-center bg-[#deeaff] px-4 pb-7'>
                    <div className='header py-10  w-full h-[193px] lg:h-[369px]'>
                        <div className='leading-content h-[100px] flex justify-center'>
                            <Logo />
                        </div>
                        <div className='py-6'>
                        <div className='content flex justify-center'>
                            <div className='container-input text-white bg-fit lg:bg-cover px-8.5 pb-5 rounded-[6px] shadow-card w-full lg:w-9/12 '
                                style={{ backgroundImage: `url(${currentData.currentD.bg})` }}>
                                <SearchBox cityInfo={currentData.cityInfo.label} searchInfo={toggleChange} />
                                <CurrentDescription currentData={currentData} searchInfo={toggleChange} />
                                <CurrentMiniCards currentData={currentData} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <DailyWeather forecastData={forecastData} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CurrentWeather