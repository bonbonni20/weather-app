import React, { useEffect, useState } from 'react'
import { fetchCities } from '../api/LocationService';
import {ReactComponent as SearchIcon} from '../assets/icons/search_White.svg'
import {ReactComponent as CloseIcon} from '../assets/icons/close_White.svg'
import {ReactComponent as ResetIcon} from '../assets/icons/reset.svg'

const SearchBox = ({ cityInfo, searchInfo }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [citiesInfo, setcitiesInfo] = useState([]);
  const [showList, setShowList] = useState();
  const [error, setError] = useState(null);
  const [isTyping, setIsTyping] = useState(false)
  const [displayClickedLocation, setDisplayClickedLocation] = useState(true)

  useEffect(() => {
    if (displayClickedLocation) {
      setSearchTerm(cityInfo)
    }
    if (searchTerm === "" && searchTerm.length <= 1) {
      setShowList(false)
    }
    else if (searchTerm !== null && searchTerm.length >= 0) {
      const fetchData = async (searchTerm) => {
        setcitiesInfo(await fetchCities(searchTerm))
      }
      fetchData(searchTerm)
      .catch(err => {
        setError(true)
        if (err.response.status === 400) {
            setSearchTerm('Please try it again.')
        }
        else if (err.response.status === 401) {
            setSearchTerm('Please wait for few hours.')
        }
        else if (err.response.status === 404 || err.response.status === 500) {
            setSearchTerm('Sorry, weather service unavailable.')
        }
    });
    }
  }, [searchTerm, cityInfo, displayClickedLocation])

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    setShowList(true)
    setIsTyping(true)
  }

  const handleClick = (cityInfo) => {
    setShowList(false)
    searchInfo(cityInfo)
    setSearchTerm(cityInfo.label)
    setIsTyping(true)
  }

  const handleClear = () => { window.location.reload(); }

  const handleClearInput = () => {
    setSearchTerm('')
    setDisplayClickedLocation(false)
    setIsTyping(false)
  }
  return (
    <div className=' flex justify-between gap-2 pt-10 relative'>
      <SearchIcon className='h-[13px] w-[13px] absolute top-16 left-3'/>
      {isTyping && 
        <CloseIcon className=" absolute top-[60px] left-[210px] lg:left-[1510px] w-5 h-5 cursor-pointer"
        onClick={() => handleClearInput()} data-testid="close" />
      }
      <div className='flex flex-col w-full'>
        <input
          className='h-[58px] p-7 rounded-[5px] border-solid border-[1px] border-[#718fc2] bg-input outline-none text-white '
          type='text'
          placeholder={error ? { searchTerm } : 'Search Location'}
          value={searchTerm}
          onChange={handleInputChange}
          disabled={!error ? false : true}
          data-testid="input_field"
        />
        <div>
          {showList &&
            <div className='absolute left-0 right-12 rounded-md shadow-drop border-solid border-[#718fc2] bg-drop text-white mt-1 lg:right-[75px]' data-testid="dropdown">
              {citiesInfo.map((city, index) =>
                <div className='py-[8px] cursor-pointer' key={index} onClick={() => handleClick(city)}>
                  <div className='w-full pl-5 hover:bg-[#f2f3f5a6]' data-testid="select_items">
                    <span className='font-J h-6 text-sm leading-[1.71]'>
                      {city.label}
                    </span>
                  </div>
                </div>)}
            </div>}
        </div>
      </div>
      <button className='w-[58px] h-[58px] border-[1px] rounded-[6px] py-[15px] px-[18px] mr-2 cursor-pointer'
        disabled={error ? true : false} onClick={handleClear} data-testid="reset">
        <ResetIcon />
      </button>
    </div>
  )
}

export default SearchBox