import { Flex } from "@chakra-ui/react";
import { PostsSection } from "./components/organisms";

const App = () => {
  return (
    <>
      <Flex flex={1} direction={"column"} gap={"1rem"}>
        <PostsSection />
      </Flex>
    </>
  );
};

export default App;
