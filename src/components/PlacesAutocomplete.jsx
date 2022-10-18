import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import {Box, Divider, Input, List, ListItem} from "@chakra-ui/react";
import {useEffect} from "react";
import {GrLocation} from "react-icons/gr"
import {useDispatch, useSelector} from "react-redux";
import {setCity, setPosition} from "../reduxToolkit/locationSlice";
import {Icon} from "@chakra-ui/icons";

const PlacesAutocomplete = ({isLoaded}) => {
    const dispatch = useDispatch()
    const setNewPosition = (newPosition) => dispatch(setPosition(newPosition))
    const setNewCity = (newCity) => dispatch(setCity(newCity))
    const city = useSelector(state=>state.location.city)

    const {
        ready,
        value,
        suggestions: {status, data},
        setValue,
        clearSuggestions,
        init,
    } = usePlacesAutocomplete({
        requestOptions: {},
        defaultValue: city,
        debounce: 300,
    });




    const ref = useOnclickOutside(() => clearSuggestions())

    const handleInput = (e) => setValue(e.target.value)


    const handleSelect =
        ({description}) =>
            () => {
                setValue(description, false);
                clearSuggestions();
                setNewCity(description.split(" ")[0])
                getGeocode({address: description}).then((results) => {

                    const {lat, lng} = getLatLng(results[0]);
                    setNewPosition({lat, lng})

                });
            };

    useEffect(() => {
        if (isLoaded) {
            init()

        }
    }, [isLoaded, init])

    const renderSuggestions = () =>
        data.map((suggestion) => {
            const {
                place_id,
                structured_formatting: {main_text},
            } = suggestion;

            return (

                <ListItem cursor="pointer" my=".2em" key={place_id} onClick={handleSelect(suggestion)}>
                    <Icon color="#634CFF" as={GrLocation}/>
                    {main_text}
                    <Divider/>
                </ListItem>


            );
        });

    return (
        <Box w="95%" m="0 auto" position="relative" ref={ref}>
            <Input

                value={value}
                onChange={handleInput}
                disabled={!ready}
                placeholder="Find your city"
                variant='unstyled'
                borderRadius="1em"
                border="none"
                background="#fff"
                p=".5em"
            />
            {status === "OK" &&
                <List minW="15em" position="absolute"
                      zIndex={2} borderRadius=".5em" p=".2em"
                      top="2em" left={2} background="#F5F5F5">
                    {renderSuggestions()}
                </List>
            }
        </Box>
    );
};

export default PlacesAutocomplete;