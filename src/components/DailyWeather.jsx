import React, { useState } from 'react'
import { ReactComponent as CalendarIcon } from '../assets/icons/forecastIcons/calendar.svg'
import { ReactComponent as TempIcon } from '../assets/icons/forecastIcons/temp-f.svg'
import { ReactComponent as WindIcon } from '../assets/icons/forecastIcons/wind-f.svg'
import { ReactComponent as CloudIcon } from '../assets/icons/forecastIcons/cloud-f.svg'
import { ReactComponent as HumidityIcon } from '../assets/icons/forecastIcons/humidity-f.svg'
import { ReactComponent as EmailIcon } from '../assets/icons/forecastIcons/email.svg'
import { ReactComponent as MsgIcon } from '../assets/icons/forecastIcons/mobile.svg'
import { Backdrop } from '@mui/material'

import { formatDate } from '../formats/formatDate'
import SendMobile from './SendMobile.jsx'
import Email from './Email.jsx'

const DailyWeather = ({ forecastData }) => {
    const cityInfo = forecastData.cityInfo
    const [emailWindowForm, setEmailWindowForm] = useState(false)
    const [mobileWindowForm, setMobileWindowForm] = useState(false)
    const [passingWeatherInfo, setPassingWeatherInfo] = useState('')

    const sendForecastData = (cityInfo, date, type) => {
        const [lat, lon] = cityInfo.location.split(" ")
        const unit = cityInfo.unit
        const name = cityInfo.label
        setPassingWeatherInfo({ name, lat, lon, unit, date })
        if (type === "mobile") {
            setMobileWindowForm(true)
            setEmailWindowForm(false)
        }
        if (type === "email") {
            setEmailWindowForm(true)
            setMobileWindowForm(false)
        }
    }

    const formatDaily = (d, type) => {
        const date = formatDate(d, "daily")
        return (type === "md") ? date.substring(0, 3).split(" ")[0] : date.split(" ").slice(-2).join(" ");
    }

    const windowFormChange = () => {
        setEmailWindowForm(false)
        setMobileWindowForm(false)
    }

    return (
        <div>
            <div className='flex justify-center '>
                {forecastData !== undefined &&
                    <div className='bg-[#fffff] shadow-card rounded-[6px] py-[30px] px-8.5 w-full lg:w-9/12 '>
                        <div className='flex flex-row gap-[11px]'>
                            <CalendarIcon />
                            <span className='font-B font-semibold text-xl text-[#262b40]'>7 Day Forecast</span>
                        </div>
                        <div className='grid gap-2 pt-2.5 lg:grid-cols-7'>
                            {forecastData.forecastD.map((day, index) =>
                                <div className='rounded border-[1px] border-[#dfe6e9] bg-[#dde4ea] py-10 px-7' key={index}>
                                    <div className='flex items-center h-[76px] lg:flex-col lg:items-center'>
                                        <div className='flex flex-col lg:space-x-1 lg:flex-row'>
                                            <span className='font-J font-bold text-base'>{formatDaily(day.dt, "md")}</span>
                                            <span className='font-J text-xs lg:font-bold lg:text-base'> {formatDaily(day.dt, "large")}</span>
                                        </div>
                                        <img className='order-first lg:order-last' alt="weather" src={`${process.env.REACT_APP_WEATHER_URL}${day.icon}`} />
                                    </div>
                                    <div className='flex justify-center'>
                                        <div className='grid grid-cols-2 lg:pt-10 lg:grid-cols-1 border-t-2 lg:border-none '>
                                            <div className='p-4 font-J flex flex-row items-start lg:flex-col'>
                                                <div className='flex flex-col lg:flex-row-reverse'>
                                                    <span className='text-xs text-[#757575] lg:pt-2 lg:pl-1'>Temperature</span>
                                                    <TempIcon />
                                                </div>
                                                <span className='font-bold relative right-7 top-5 lg:pl-8 lg:right-0 lg:top-0'>
                                                    {Math.round(day.min)}°/{Math.round(day.max)}°
                                                </span>
                                            </div>
                                            <div className='p-4 font-J flex flex-row items-start lg:flex-col'>
                                                <div className='flex flex-col lg:flex-row-reverse'>
                                                    <span className='text-xs text-[#757575] lg:pt-2 lg:pl-1'>Wind</span>
                                                    <WindIcon />
                                                </div>
                                                <span className='font-bold relative left-1 top-5 lg:pl-8 lg:right-0 lg:top-0'>
                                                    {Math.round(day.wind)} {forecastData.cityInfo.unit === "metric" ? "mps" : "mph"}</span>
                                            </div>
                                            <div className='p-4 font-J flex flex-row items-start border-t-2 lg:border-none lg:flex-col'>
                                                <div className='flex flex-col lg:flex-row-reverse'>
                                                    <span className='text-xs text-[#757575] lg:pt-2 lg:pl-1'>Cloud</span>
                                                    <CloudIcon />
                                                </div>
                                                <span className='font-bold relative left-1 top-5 lg:pl-8 lg:right-0 lg:top-0'>{day.clouds}%</span>
                                            </div>
                                            <div className='p-4 font-J flex flex-row items-start border-t-2 lg:border-none lg:flex-col'>
                                                <div className='flex flex-col lg:flex-row-reverse'>
                                                    <span className='text-xs text-[#757575] lg:pt-2 lg:pl-1'>Humidity</span>
                                                    <HumidityIcon />
                                                </div>
                                                <span className='font-bold relative right-3 top-5 lg:pl-8 lg:right-0 lg:top-0'>
                                                    {Math.round(day.humidity)}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className='pt-4 border-t-2 border-gray-300 flex justify-center gap-2'
                                        data-testid="table_formIcon">
                                        <div className='group relative'>
                                            <MsgIcon className='cursor-pointer w-9 h-9'
                                                onClick={() => sendForecastData(cityInfo, day.dt, "mobile")}
                                                data-testid="msg_icon" />
                                            <div className="opacity-0 w-28 bg-blue-500 text-white text-center text-xs rounded-lg py-2 absolute bottom-9 right-[2px] group-hover:opacity-100 ml-14 px-3 pointer-events-none">
                                                Send to mobile
                                            </div>
                                        </div>
                                        <div className='group relative'>
                                            <EmailIcon
                                                className='cursor-pointer w-9 h-9'
                                                onClick={() => sendForecastData(cityInfo, day.dt, "email")}
                                                data-testid="email_icon" />
                                            <div className="opacity-0 w-28 bg-blue-500 text-white text-center text-xs rounded-lg py-2 absolute bottom-9 right-[-75px] group-hover:opacity-100 ml-14 px-3 pointer-events-none">
                                                Send to email
                                            </div>
                                        </div>
                                    </div>
                                </div>)

                            }

                        </div>
                    </div>}
                <div className='fixed flex justify-center top-[150px]'>
                    {emailWindowForm &&
                        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={emailWindowForm}>
                            <Email passingWeatherInfo={passingWeatherInfo} form={windowFormChange} />
                        </Backdrop>}
                    {mobileWindowForm &&
                        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={mobileWindowForm}>
                            <SendMobile passingWeatherInfo={passingWeatherInfo} form={windowFormChange} />
                        </Backdrop>}
                    {/* {emailWindowForm && <Email passingWeatherInfo={passingWeatherInfo} form={windowFormChange} />}
                        {mobileWindowForm && <SendMobile passingWeatherInfo={passingWeatherInfo} form={windowFormChange} /> } */}
                </div>
            </div>
        </div>
    )
}

export default DailyWeather