import React, { useState } from 'react'
import { fetchEmailConfirmation } from '../api/SendingEmail.js'
import { ReactComponent as EmailIcon } from '../assets/icons/forecastIcons/email.svg'
import { ReactComponent as SendIcon } from '../assets/icons/forecastIcons/send.svg'
import { ReactComponent as CloseIcon } from '../assets/icons/forecastIcons/close.svg'
import EmailResponse from './EmailResponse.jsx'
import { formatDate } from '../formats/formatDate.js'

const Email = ({ passingWeatherInfo, form }) => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState(false)
    const [responseMsg, setResponseMsg] = useState(false)
    const [showSuccessOrNot, setShowSuccessOrNot] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    const handleInputChange = (email) => {
        setEmail(email)
    }

    const submitData = async () => {
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
        if (!regex.test(email)) {
            setError(true)
            setEmail(email)
            setErrorMsg("Invalid email address!")
            setResponseMsg(false)
        }
        else {
            const emailResponse = await fetchEmailConfirmation(email, passingWeatherInfo.lat, passingWeatherInfo.lon, passingWeatherInfo.date)
                .catch(err => setError(true))
            if (emailResponse === "SUCCESSFUL") {
                setShowSuccessOrNot('successfully')
                setResponseMsg(true)
                setError(false)
            }
            else {
                setShowSuccessOrNot('unsuccessful')
                setResponseMsg(true)
                setError(true)
            }
        }
    }

    const handleClearInput = () => {
        setEmail('')
        setError(false)
    }

    const clearButton = () => { form(false) }
    return (
        <div className='flex justify-center'>
            <div className='absolute bg-white shadow-2xl p-3 mt-3 rounded-lg w-full lg:w-96'
                data-testid="email_form">
                {responseMsg === false ?
                    <div className='p-2'>
                        <div className='flex justify-center'>
                            <EmailIcon className='h-10 w-10' />
                        </div>
                        <div className='py-2 flex flex-row gap-2 justify-center'>
                            {passingWeatherInfo !== undefined &&
                                <h3 className="font-B text-lg font-medium leading-[1.15] text-gray-900">
                                    Send '<span className='font-bold'>{formatDate(passingWeatherInfo.date, "forecastDisplay")}</span>' forecast to
                                </h3>}
                        </div>
                        <div className="flex mt-2 rounded-md shadow-sm" data-testid="form_bar">
                            <input
                                name="email"
                                type="email"
                                required
                                className={`${error ? "w-full text-gray-500 p-2 rounded-5 border-solid border-[1px] border-[#99b5e3] bg-[#fff] outline-none placeholder:font-J te" : "w-full text-black p-2 font-J rounded-5 border-solid border-[1px] border-[#99b5e3] bg-[#fff] cursor-pointer outline-none placeholder:font-J"}`}
                                placeholder={error ? { email } : "Email address"}
                                value={email}
                                onChange={(e) => handleInputChange(e.target.value)}
                                disabled={!error ? false : true}
                                data-testid="input_box"
                                autoComplete='off' />
                            {error &&
                                <CloseIcon
                                    className="text-black absolute top-[115px] right-[25px] w-5 h-5 cursor-pointer"
                                    onClick={() => handleClearInput()}
                                    disabled={!error ? false : true}
                                    data-testid="clear_input_box" />
                            }
                        </div>
                        {error &&
                            <div
                                className='font-J text-red-500 italic px-2 pt-2'
                                data-testid="email_error_message">
                                <span>{errorMsg}</span>
                            </div>
                        }
                        <div className='border-t-2 my-4 border-[#eee]'></div>
                        <div className='flex justify-center gap-2 '>
                            <div>
                                <button
                                    type="submit"
                                    className="flex-none cursor-pointer rounded-[6px] border-solid border-[#262b40] border-[1px] bg-[#ffffff] px-3.5 py-[9.3px] text-sm font-semibold text-black shadow-sm"
                                    onClick={() => clearButton()}
                                    data-testid="close_icon">
                                    <div className='flex gap-1'>
                                        <CloseIcon />
                                        <span className='leading-6'>Close</span>
                                    </div>
                                </button>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="flex-none rounded-md bg-[#19943f] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm"
                                    onClick={submitData}
                                    disabled={(!error && email) ? false : true}
                                    data-testid="submit_icon" >
                                    <div className='flex gap-1'>
                                        <SendIcon />
                                        <span className='leading-6 '>Send</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div> :
                    <div className='flex justify-center'>
                        <EmailResponse email={email} showSuccessOrNot={showSuccessOrNot} error={error} form={form} />
                    </div>}                
            </div>
        </div>
    )
}

export default Email