import React, { useState } from "react"
import { fetchMobileConfirmation } from "../api/SendingMobile.js"
import { ReactComponent as MsgIcon } from "../assets/icons/forecastIcons/mobile.svg"
import { ReactComponent as SendIcon } from "../assets/icons/forecastIcons/send.svg"
import { ReactComponent as CloseIcon } from "../assets/icons/forecastIcons/close.svg"

import MobileResponse from "./MobileResponse"
import { formatDate } from "../formats/formatDate"

const SendMobile = ({ passingWeatherInfo, form }) => {
  const UKCode = "+44"
  const [mobileNo, setMobileNo] = useState("")
  const [error, setError] = useState(false)
  const [responseMsg, setResponseMsg] = useState(false)
  const [showSuccessOrNot, setShowSuccessOrNot] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  const handleInputChange = (mobileNo) => {
    const regex = /^[+0-9]+$/g;
    if (mobileNo.length <= 0) {
      setMobileNo(mobileNo)
    }
    else if (mobileNo.startsWith("0") || mobileNo.startsWith("+")) {
      setError(true)
      setMobileNo(mobileNo)
      setErrorMsg("International code already applied!")
    }
    else {
      if (regex.test(mobileNo)) {
        setMobileNo(mobileNo)
      }
    }
  }
  const submitData = async () => {
    if (mobileNo.length === 10) {
      const mobile = UKCode + mobileNo
      const mobileResponse = await fetchMobileConfirmation(mobile, passingWeatherInfo.lat, passingWeatherInfo.lon, passingWeatherInfo.date)
        .catch(err => setError(true))
      if (mobileResponse === "SUCCESSFUL") {
        setShowSuccessOrNot("successfully")
        setResponseMsg(true)
        setError(false)
      }
      else {
        setShowSuccessOrNot("failed")
        setResponseMsg(true)
        setError(true)
      }
    }
    else {
      setError(true)
      setMobileNo(mobileNo)
      setErrorMsg("Type valid UK number!")
    }
  }

  const handleClearInput = () => {
    setMobileNo("")
    setError(false)
  }

  const clearButton = () => {
    form(false)
  }

  return (
    <div className="flex justify-center ">
      <div className="absolute bg-white shadow-2xl p-3 mt-3 rounded-lg w-full lg:w-96"
        data-testid="send_to_mobile_form">
        {responseMsg === false ?
          <div className="p-2">
            <div className="flex justify-center">
              <MsgIcon className="h-10 w-10" />
            </div>
            <div className="py-2 flex flex-row gap-2 justify-center">
              {passingWeatherInfo !== undefined &&
                <h3 className="font-B text-lg font-medium leading-[1.15] text-gray-900">
                  Send '<span className="font-bold">{formatDate(passingWeatherInfo.date, "forecastDisplay")}</span>' forecast to
                </h3>}
            </div>
            <div className="flex mt-2 rounded-md shadow-sm" data-testid="form_bar">
              <span className="text-black inline-flex items-center rounded-l-md border border-r-0  border-[#b8b8b8] bg-[#fff] px-2 sm:text-sm ">
                {UKCode}
              </span>
              <input
                name="mobileNo"
                type="text"
                required
                minLength="10"
                maxLength="10"
                className={`${error ? "text-gray-500 w-full p-2 rounded-none rounded-r-md border-solid border-[1px] border-[#b8b8b8] bg-[#fff] outline-none placeholder:font-J" : "text-black w-full p-2 font-J rounded-none rounded-r-md border-solid border-[1px] border-[#b8b8b8] bg-[#fff] cursor-pointer outline-none placeholder:font-J"}`}
                placeholder={error ? { mobileNo } : "Mobile number"}
                value={mobileNo}
                onChange={(e) => handleInputChange(e.target.value)}
                disabled={!error ? false : true}
                autoComplete="off"
                data-testid="input_box" />
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
                className="font-J text-red-500 italic px-2 pt-2"
                data-testid="error_message">
                <span>{errorMsg}</span>
              </div>
            }
            <div className="border-t-2 my-4 border-[#eee]"></div>
            <div className="flex justify-center gap-2 ">
              <div>
                <button
                  type="submit"
                  className="flex-none cursor-pointer rounded-[6px] border-solid border-[#262b40] border-[1px] bg-[#ffffff] px-3.5 py-[9.3px] text-sm font-semibold text-black shadow-sm"
                  onClick={() => clearButton()}
                  data-testid="close_icon">
                  <div className="flex gap-1">
                    <CloseIcon />
                    <span className="leading-6">Close</span>
                  </div>
                </button>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex-none rounded-md bg-[#19943f] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm"
                  onClick={submitData}
                  disabled={(!error && mobileNo) ? false : true}
                  data-testid="submit_icon">
                  <div className="flex gap-1">
                    <SendIcon />
                    <span className="leading-6 ">Send</span>
                  </div>
                </button>
              </div>
            </div>
          </div> :
          <div className="flex justify-center">
          <MobileResponse mobileNo={UKCode + mobileNo} showSuccessOrNot={showSuccessOrNot} error={error} form={form} />
          </div>}
      </div>
    </div>
  )
}

export default SendMobile