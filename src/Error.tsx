import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Text, Heading, Stack, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
const Error = () => {
  return (
    <Box width={500} margin={"150px auto"}>
      <Stack>
        <Heading textAlign={"center"} as="h1" fontSize={"12rem"}>
          404
        </Heading>
      </Stack>
      <Stack>
        <Text textAlign={"center"} fontSize={"4rem"}>
          Url Not Found
        </Text>
      </Stack>
      <Stack>
        <Button
          colorScheme="messenger"
          variant="outline"
          leftIcon={<ArrowBackIcon boxSize={"2rem"} />}
          padding={"2rem"}
        >
          <Link to="/">
            <Text textAlign={"center"} fontSize={"2rem"}>
              Go back to Posts
            </Text>
          </Link>
        </Button>
      </Stack>
    </Box>
  );
};

export default Error;
