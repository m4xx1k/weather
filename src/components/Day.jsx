import React from 'react';
import {Divider, Flex, Image, Text} from "@chakra-ui/react";


const Day = ({data}) => {
    return (
        <Flex
            justifyContent="space-around"
            border="1px #fff solid"
            borderRadius="1rem"
            fontSize={{base: ".875em", md: "1.2em"}}
            w={{base: "5.2em", sm:"6.4em", md: "7em"}}
            h={{base: "140px", md: "200px"}}
            textAlign="center"
            alignItems="center"
            direction="column"
            bg="#fff" color="#000"
            cursor="pointer">

            <div>{`${data.datetime.split("-")[2]} ${data.month}`}</div>
            <Divider orientation='horizontal' w="60%"/>
            <Image src={data.img} boxSize={{base:"90%",md:"75%"}} alt=""/>
            <Text fontSize={{base: ".6em", md: ".75em"}}>{data.weather.description}</Text>
            <div>{data.temp} °C</div>


        </Flex>
    );
};

export default Day;