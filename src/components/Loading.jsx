import {Flex, Spinner} from "@chakra-ui/react";

const Loading = () => {
    return (
        <Flex h="100vh" w="100vw" justifyContent="center"
              alignItems="center">
            <Spinner thickness='4px' speed='0.8s' color='#634CFF' size='xl'/>
        </Flex>
    );
};

export default Loading;