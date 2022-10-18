import {Box, Flex} from "@chakra-ui/react";
import {ChevronLeftIcon, ChevronRightIcon} from "@chakra-ui/icons";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper";
import "swiper/css"
import Day from "./Day";

const Slider = ({forecast, setSelectedDay}) => {
    return (
        <Flex mt={{base:"1em", md:"0"}} alignItems="center" w={{base: "100%", md: "75%"}} flexDirection="row">

            <Box cursor="pointer" className="prev_el">
                <ChevronLeftIcon color="#fff" fontSize={{base: "1.5em", md: "2em"}}/>
            </Box>

            <Swiper
                spaceBetween={20}
                breakpoints={{
                    320: {
                        slidesPerView: 4
                    },
                    992: {
                        slidesPerView: 5
                    }
                }}
                modules={[Navigation]}
                navigation={{nextEl: ".next_el", prevEl: ".prev_el"}}
            >
                {forecast.map((elem, i) =>

                    <SwiperSlide onClick={() => setSelectedDay(i)} key={elem.datetime}>
                        <Day
                            data={{
                                ...elem,
                                //isSelected: i === selectedDay,
                            }}

                        />
                    </SwiperSlide>
                )}
            </Swiper>

            <Box cursor="pointer" className="next_el">
                <ChevronRightIcon color="#fff" fontSize={{base: "1.5em", md: "2em"}}/>
            </Box>

        </Flex>
    );
};

export default Slider;