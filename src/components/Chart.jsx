/* eslint-disable */
import {useEffect, useState} from "react";
import {Box, Select} from "@chakra-ui/react";
import {
    Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,
} from 'chart.js';
import {Line} from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const modes = ["Temperature °C", "Wind m/s", "Clouds %", "Precipitation %", "Humidity %"]

const Chart = ({forecast}) => {
    const [mode, setMode] = useState("Temperature")

    const initialLabels = forecast.map(elem => `${elem.datetime.split("-")[2]} ${elem.month}`)
    const [labels, setLabels] = useState(initialLabels)

    const initialData = {
        labels, datasets: [{
            label: mode,
            data: forecast.map(elem => elem.temp),
            borderColor: '#634CFF',
            backgroundColor: '#FFFFFF)',
        }]
    }

    const [data, setData] = useState(initialData)

    useEffect(() => {
        console.log("chart ue")
        setLabels(forecast.map(elem => `${elem.datetime.split("-")[2]} ${elem.month}`))
        let newData;
        switch (mode) {
            case "Temperature °C":
                newData = forecast.map(elem => elem.temp)
                break
            case "Wind m/s":
                newData = forecast.map(elem => elem.wind_spd)
                break
            case "Clouds %":
                newData = forecast.map(elem => elem.clouds)
                break
            case "Precipitation %":
                newData = forecast.map(elem => elem.pop)
                break
            case "Humidity %":
                newData = forecast.map(elem => elem.rh)
                break
            default:
                // eslint-disable-next-line no-unused-vars
                newData = forecast.map(elem => elem.temp)
        }
        setData({
            labels,
            datasets: [
                {
                    borderColor: '#634CFF',
                    backgroundColor: '#FFFFFF)',
                    label: mode,
                    data: newData,

                }
            ]
        })

    }, [mode, forecast])

    return (<>
        <Select variant='outline' h="1m" w="40%" m={1} bg="#fff" onChange={(e) => setMode(e.target.value)}>
            {modes.map(elem => <option key={elem} value={elem}>{elem}</option>)}
        </Select>
        <Box bg="#fff" borderRadius="1em">
            <Line data={data}/>
        </Box>

    </>);

}

export default Chart;
