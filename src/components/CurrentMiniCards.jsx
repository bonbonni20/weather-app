import React from 'react'
import { ReactComponent as TempIcon } from '../assets/icons/temperature.svg'
import { ReactComponent as WindIcon } from '../assets/icons/wind.svg'
import { ReactComponent as CloudIcon } from '../assets/icons/cloud.svg'
import { ReactComponent as HumidityIcon } from '../assets/icons/humidity.svg'

const CurrentMiniCards = ({ currentData}) => {
    return (
        <div className='flex justify-center items-stretch'>
            <div className='grid gap-4 grid-cols-2 lg:grid-cols-4 '>
                <div className='flex items-center bg-minC gap-2.5 rounded-md py-2.5 px-[15px] h-[83px] w-[140px] lg:h-[119px] lg:w-[256px] lg:px-[65px]'>
                    <div className='w-[47px] h-[47px] rounded-86 bg-[#ffede7] flex justify-center items-center p-2.5 lg:w-[55px] lg:h-[55px] '>
                        <TempIcon className='w-[43px] h-[32px]' />
                    </div>
                    <div className='flex flex-col'>
                        <span className='font-B font-bold text-lg'>{currentData.currentD.feels_like}°</span>
                        <span className='font-J text-sm'>Feels like</span>
                    </div>
                </div>
                <div className='flex p-5 items-center bg-minC gap-2.5 rounded-md py-2.5 px-[15px] h-[83px] w-[140px] lg:h-[119px] lg:w-[256px] lg:px-[70px]'>
                    <div className='w-[47px] h-[47px] rounded-86 bg-[#cbdeff] flex justify-center items-center p-2.5 lg:w-[55px] lg:h-[55px]'>
                        <WindIcon className='w-[43px] h-[32px]' />
                    </div>
                    <div className='flex flex-col'>
                        <span className='font-B font-bold text-lg'>{currentData.currentD.wind} 
                            <b className='font-normal text-base'>
                                {currentData.cityInfo.unit === "metric" ? " mps" : " mph"}</b>
                        </span>
                        <span className='font-J text-sm'>Wind</span>
                    </div>
                </div>
                <div className='flex p-5 items-center bg-minC gap-2.5 rounded-md px-[15px] h-[83px] w-[140px] lg:h-[119px] lg:w-[256px] lg:px-[70px]'>
                    <div className='w-[47px] h-[47px] rounded-86 bg-[#dbdbff] flex justify-center items-center p-2.5 lg:w-[55px] lg:h-[55px] '>
                        <CloudIcon className='w-[43px] h-[32px]' />
                    </div>
                    <div className='flex flex-col '>
                        <span className='gont-B font-bold text-lg'>{currentData.currentD.clouds}%</span>
                        <span className='font-J text-sm'>Cloud</span>
                    </div>
                </div>
                <div className='flex p-5 items-center bg-minC gap-2.5 rounded-md py-2.5 px-[15px] h-[83px] w-[140px] lg:h-[119px] lg:w-[256px] lg:px-[70px]'>
                    <div className='w-[47px] h-[47px] rounded-86 bg-[#dbfaff] flex justify-center items-center p-2.5 lg:w-[55px] lg:h-[55px] '>
                        <HumidityIcon className='w-[43px] h-[32px]' />
                    </div>
                    <div className='flex flex-col '>
                        <span className='font-B font-bold text-lg'>{currentData.currentD.humidity}%</span>
                        <span className='font-J text-sm'>Humidity</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CurrentMiniCards