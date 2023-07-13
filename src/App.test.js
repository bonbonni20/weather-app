import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { expect, jest, test } from '@jest/globals';
import '@testing-library/jest-dom'
import Home from './components/home';
import axios from 'axios';
import { fetchCities } from './api/LocationService';
import DailyWeather from './components/DailyWeather';

jest.mock("axios")

const dummyCityList = [
  {
    label: 'London, Texas, US',
    value: '33.44 -94.04'
  },
  {
    label: 'London, England, GB',
    value: '33.44 -94.04'
  },
  {
    label: 'Berlin, DE',
    value: '23.44 14.04'
  }]
const dummyWeatherInfo = 
  {
    lat: 33.44,
    lon: -94.04,
    current: {
      dt: '1682297371',
      temp: 9.04,
      feels_like: 8.51,
      bg: 'clear'
    },
    daily: [{
      dt: '1682359200',
      temp: { min: 6.62, max: 18.62 },
      feels_like: { day: 13.87 }
    }],
    dummyCityList
  }
describe('Home component', () => {
  it('should render the component on the screen', () => {
    render(<Home />)
    const input = screen.getByTestId('input_field')
    expect(input).toBeInTheDocument()
  })

  it('fetches data succesfully from an API', async () => {
    render(<Home query='london' />)
    const searchInput = screen.getByTestId('input_field')
    fireEvent.change(searchInput, { target: { value: 'London' } })
    axios.get.mockResolvedValueOnce(dummyCityList)
  })

  it('throws error if unsuccessful', async () => {
    const errorMsg = "Please wait"
    axios.get = jest.fn().mockImplementationOnce(() => Promise.reject(new Error(errorMsg)))

    await expect(fetchCities('London')).rejects.toThrow(errorMsg)
  })

  it('search bar is not disabled', async () => {
    render(<Home />)
    expect(screen.getByTestId('input_field')).toHaveProperty('disabled', false)
  })
})

describe('Search', () => {
  it('should display dropdown when the user input city name with the data', async () => {
    render(<Home />)
    const input = screen.getByTestId("input_field")
    fireEvent.change(input, { target: { value: "Berlin" } })
    const response = dummyCityList[2].label
    expect(dummyCityList.map(city => city.label)[2]).toMatch(response)
  })

  it('should return the list of cities', async () => {
    render(<Home />)
    axios.get = jest.fn().mockImplementationOnce(dummyCityList)
    const input = screen.getByTestId("input_field")
    fireEvent.change(input, { target: { value: "Berlin" } })
    const response = [{
      label: 'Berlin, DE',
      value: '23.44 14.04'
    }]
    expect(dummyCityList.map(city => city)).toEqual(expect.arrayContaining(response));
  })
})

describe("Weather", () => {
  it('fetches data succesfully from an API', async () => {
    const query = ("48.8588897","2.3200410217200766", "metric", "current" )
    render(<DailyWeather query={query}/>)
    axios.get = jest.fn().mockImplementationOnce(() => Promise.resolve(dummyWeatherInfo))
    const response = { 
        dt: '1682297371',
        temp: 9.04,
        feels_like: 8.51,
        bg: 'clear'
    }
    expect(response).toEqual(dummyWeatherInfo.current)    
  })
})
