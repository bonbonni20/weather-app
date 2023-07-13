import React from 'react'
import { ReactComponent as EmailIcon } from '../assets/icons/forecastIcons/email_green.svg'
import { ReactComponent as ErrorIcon } from '../assets/icons/forecastIcons/error.svg'

const EmailResponse = ({ email, showSuccessOrNot, error, form }) => {
  const clearButton = () => {
    form(false)
  }
  return (
    <div className='py-2 w-full lg:w-96'>
      <div className='flex justify-center'>
        {error === true ?
          <ErrorIcon className='h-10 w-10' /> :
          <EmailIcon className='h-10 w-10' />}
      </div>
      <div className='py-2'>
        <div className='flex-row'>
          <div className='flex font-J text-black text-sm'
            data-testid="email_response">
            {error ?
              <p>
                The attempt to send the selected weather information to {email} has been <span className='bold text-red-500'>{showSuccessOrNot}</span>!
              </p> :
              <p>
                The selected weather information to {email} has been <span className='bold text-green-500'>{showSuccessOrNot}</span> sent!
              </p>
            }
          </div>
          <div className="border-t-2 my-2 border-[#eee]"></div>
          <div className='flex justify-center pt-2'>
            <button type="submit"
              className="flex-none rounded-md bg-[#19943f] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm"
              onClick={() => clearButton()}
              data-testid="email_response_ok_button">
              OK</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmailResponse