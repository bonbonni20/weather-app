import React, {useState} from 'react'
import { Switch } from '@headlessui/react'
import { capitalize } from '@mui/material'
import {ReactComponent as LocationIcon } from '../assets/icons/location.svg'
import { formatDate } from '../formats/formatDate'

const CurrentDescription = ({currentData, searchInfo}) => {
    
    const [enabled, setEnabled] = useState(false)

const handleUnitClick = () => {
    if (enabled === true) {
        searchInfo({...currentData.cityInfo, unit: "metric" });
    }
    else {
        searchInfo({...currentData.cityInfo, unit: "imperial" });
    }
}

const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ')
}
    return (
        <div className='container-body'>
            <div className='container-title py-9 text-center flex flex-col justify-center items-center lg:flex-row lg:justify-between' >
                <div className='flex gap-2'  >
                    <LocationIcon className='h-[18px] w-[15px] lg:w-[31px] lg:h-[36px]' />
                    <span className='font-semibold text-[13px] lg:text-3xl'>{currentData.cityInfo.label}</span>
                </div>
                <span className='text-[10px] font-normal lg:text-xl'>{formatDate(currentData.currentD.dt, "current")}</span>
            </div>
            <div className='flex justify-center'>
                <div className='flex flex-col pb-4'>
                    <div className='flex flex-row h-[125px] lg:h-56'>
                        <div className='flex flex-row'>
                            <span className='font-bold font-B text-[113px] h-[118px] lg:text-[195px] lg:h-52'>{currentData.currentD.temp}</span>
                            <span className='text-7xl flex items-center lg:text-9xl'>°</span>
                        </div>
                        <div className='flex items-end'>
                            <Switch
                                checked={enabled}
                                onChange={setEnabled}
                                onClick={handleUnitClick}
                                className={classNames(
                                    enabled ? "bg-green-600" : "bg-gray-200",
                                    "inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
                                )}
                                data-testid="toggle_unit">
                                <span
                                    className={classNames(
                                        enabled ? "translate-x-5" : "translate-x-0",
                                        "absolute pointer-events-none inline-block h-5 w-5 transform rounded-full bg-[#fff] shadow ring-0 transition duration-200 ease-in-out"
                                    )}>
                                    <span
                                        className={classNames(
                                            enabled
                                                ? "opacity-0 duration-100 ease-out"
                                                : "opacity-100 duration-200 ease-in",
                                            "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
                                        )}
                                        aria-hidden="true"                                    >
                                        <span className='text-[#757575] font-B font-bold'>C</span>
                                    </span>
                                    <span
                                        className={classNames(
                                            enabled
                                                ? "opacity-100 duration-200 ease-in"
                                                : "opacity-0 duration-100 ease-out",
                                            " absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
                                        )}
                                        aria-hidden="true"                                    >
                                        <span className='text-[#757575] font-B font-bold'>F</span>
                                    </span>
                                </span>
                            </Switch>
                        </div>
                    </div>
                    <span className='font-B text-3xl py-7'>{capitalize(currentData.currentD.descrip)}</span>
                </div>
            </div>
        </div>
    )
}

export default CurrentDescription