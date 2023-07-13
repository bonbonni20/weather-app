import { React, useEffect, useState } from 'react';
import bg from '../assets/home-background.png'
import logo from '../assets/openweather-logo.png'
import { fetchCities } from '../api/LocationService';
import { ReactComponent as SearchIcon } from '../assets/icons/icon_search_Dark.svg'
import { useDebounce } from '../utils/helper';

const Home = ({ searchInfo }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [citiesInfo, setcitiesInfo] = useState([]);
    const [showList, setShowList] = useState();
    const [error, setError] = useState(null);
    const [home, setHome] = useState(true)
    const debouncedSearchTerm = useDebounce(searchTerm, 300)

    useEffect(() => {
        if (searchTerm === "" && searchTerm.length <= 1) {
            setShowList(false)
        }
        else if (debouncedSearchTerm && searchTerm !== null && searchTerm.length >= 0) {
            const fetchData = async () => {
                const cities = await fetchCities(searchTerm)
                if (cities.length === 0) {
                    setShowList(false)
                }
                else {
                    setShowList(true)
                    setcitiesInfo(await fetchCities(searchTerm))
                }
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
    }, [searchTerm, debouncedSearchTerm])

    const handleClick = (cityInfo) => {
        searchInfo(cityInfo)
        setHome(false)
    }
    return (
        <div>
            {home &&
                <div className='h-screen items-stretch bg-cover flex justify-center'
                    style={{ backgroundImage: `url(${bg})` }}>
                    <div className='flex justify-center items-center flex-col'>
                        <img alt="open-weather-logo" className='w-7/12' src={logo} />
                        <div className='pt-7'>
                            <SearchIcon className='relative top-[35px] left-5 w-[13px] h-[13px]' />
                            <input
                                className='h-14 pl-10 w-[250px] rounded-5 border-solid border-[1px] border-[#99b5e3] bg-[#fff] cursor-pointer outline-none lg:w-[1000px] '
                                type='text'
                                placeholder={error ? searchTerm : 'Search Location'}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                disabled={!error ? false : true}
                                data-testid="input_field"
                            />
                        </div>
                        <div className='flex justify-center'>
                            {showList &&
                                <div className='absolute w-[250px] rounded-md shadow-drop bg-[#fff] mt-1 lg:w-[1000px]' data-testid='dropdown' >
                                    {citiesInfo.map((city, index) =>
                                        <div className='py-[8px] cursor-pointer' data-testid="city" key={index} onClick={() => handleClick(city)}>
                                            <div className='w-full pl-5 hover:bg-gray-300' data-testid='select_items'>
                                                <span className='font-J h-6 text-sm text-[#111827]] leading-[1.71]'>
                                                    {city.label}
                                                </span>
                                            </div>
                                        </div>)}
                                </div>}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Home