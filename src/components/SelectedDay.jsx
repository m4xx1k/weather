import {Flex, Image, Text} from "@chakra-ui/react";
import {ArrowUpIcon, Icon} from "@chakra-ui/icons";
import {GoLocation} from "react-icons/go"
import {BsFillCalendarEventFill} from "react-icons/bs"
import {BsWind,BsCloudsFill, BsFillCloudRainHeavyFill, BsMoisture,BsThermometerHalf} from "react-icons/bs"
const SelectedDay = ({data, city}) => {
    return (
        <Flex bg="#fff"
              color="#000"
              w={{base: "96%", md: "25%"}}
              h={{base:"180px", md:"auto"}}
              border="1px #fff solid"
              borderRadius=".3em"
              justifyContent="space-around"
              p=".2em 0"
              m="0 auto"
              flexWrap="wrap"
              >

            <Flex direction="column" alignItems="center">
                <Text>
                    <Icon color="#634CFF" as={GoLocation}/>
                    {city}
                </Text>
                <Text>
                    <Icon color="#634CFF" as={BsFillCalendarEventFill}/>
                    {` ${data.day}, ${data.datetime.split("-")[2]} ${data.month}`}
                </Text>
                <Image boxSize={{base: "80%", md: "100%"}} src={data.img}/>
                <Text>{data.weather.description}</Text>
            </Flex>

            <Flex direction="column" flexWrap="wrap" justifyContent="space-evenly">
                <Text>
                    <Icon color="#634CFF" as={BsThermometerHalf}/>
                    {` Temp: ${data.min_temp.toFixed(0)} - ${data.max_temp.toFixed(0)}°C`}
                </Text>
                <Text>
                    <Icon color="#634CFF" as={BsWind}/>
                    {` Wind: ${data.wind_spd} m/s `}
                    <ArrowUpIcon sx={{transform: `rotate(${data.wind_dir}deg)`}}/>
                </Text>
                <Text>
                    <Icon color="#634CFF" as={BsCloudsFill}/>
                    {` Clouds: ${data.clouds}%`}
                </Text>
                <Text>
                    <Icon color="#634CFF" as={BsFillCloudRainHeavyFill}/>
                    {` Precipitation:${data.precip.toFixed(0)}mm,${data.pop}%`}
                </Text>
                <Text>
                    <Icon color="#634CFF" as={BsMoisture}/>
                    {` Humidity: ${data.rh}%`}
                </Text>
            </Flex>

        </Flex>
    );
};

export default SelectedDay;