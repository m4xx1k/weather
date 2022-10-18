import {Box, Flex, Text} from '@chakra-ui/react'
import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useSelector} from "react-redux";
import '@fontsource/nunito/400.css'
import '@fontsource/nunito/700.css'

import SelectedDay from "./components/SelectedDay";
import Slider from "./components/Slider"
import Loading from "./components/Loading";

import Map from "./components/Map";
import {useJsApiLoader} from "@react-google-maps/api";
import PlacesAutocomplete from "./components/PlacesAutocomplete";
import Chart from "./components/Chart";


const toMonthName = (monthNumber) => {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString('en-US', {
        month: 'long',
    }).slice(0, 3);
}
const getIconUrl = (code) => `https://www.weatherbit.io/static/img/icons/${code}.png`
const getDayName = (day) => {
    let date = new Date(day);
    return date.toLocaleDateString("en-US", {weekday: 'long'});
}


const libraries = ["places"]
const API_GOOGLE_KEY = process.env.REACT_APP_API_GOOGLE

function App() {

    const [selectedDay, setSelectedDay] = useState(0)
    const [forecast, setForecast] = useState([])

    const city = useSelector((state) => state.location.city)
    const position = useSelector((state) => state.location.position)


    const [error, setError] = useState("")


    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: API_GOOGLE_KEY,
        libraries,
        language: "en",
    })

    useEffect(() => {
        console.log(API_GOOGLE_KEY)
        const fetchForecast = async () => {
            await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${position.lat}&lon=${position.lng}&key=b3e83458ab6d4407a39ee055ab94fc0d`)
                .then((res) => {
                    const modifiedData = res.data.data.map((elem) => {
                        return {
                            ...elem,
                            img: getIconUrl(elem.weather.icon),
                            month: toMonthName(elem.datetime.split("-")[1]),
                            day: getDayName(elem.datetime.replace("-", "/"))
                        }
                    })
                    setForecast(modifiedData)
                    console.log(modifiedData)
                })
                .catch((e) => setError(e))
        }
        fetchForecast()
    }, [position])

    if (!isLoaded || !forecast.length) return <Loading/>
    if (!!error) return <Text color="red">{error}</Text>

    return (
        <Box bg="#634CFF"
             overflow="hidden"
             color="#000"
             p=".8em" minH="100vh"
             maxW="100vw" alignItems="center"
             justifyContent="center"
             flexDirection="column"
        >

            <PlacesAutocomplete isLoaded={isLoaded}/>

            <Flex mt="2em" flexWrap="wrap" w="100%" justifyContent="space-between">

                <SelectedDay city={city} data={forecast[selectedDay]}/>
                <Slider forecast={forecast} setSelectedDay={setSelectedDay}/>

            </Flex>

            <Flex flexWrap="wrap" justifyContent={{base: "center", md: "space-between"}} mt="1em" w="100%">

                <Box w={{base: "100%", md: "48%"}} my={{base: "1em", md: "0"}}>
                    <Map position={position} isLoaded={isLoaded}/>
                </Box>

                <Box w={{base: "100%", md: "48%"}} h="400px">
                    <Chart forecast={forecast}/>
                </Box>

            </Flex>

        </Box>)
}

export default App;
