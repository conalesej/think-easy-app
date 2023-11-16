import { Box, Flex } from "@chakra-ui/react";
import { PostsSection, TopBar } from "./components/organisms";

const App = () => {
  return (
    <>
      <Flex flex={1} direction={"column"} gap={"1rem"}>
        <TopBar />
        <PostsSection />
      </Flex>
    </>
  );
};

export default App;
