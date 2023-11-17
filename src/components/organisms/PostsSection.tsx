import React from "react";
import { Button, Flex, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { SmallAddIcon } from "@chakra-ui/icons";
import { FilterBar, PostsTable } from "../molecules";
import { CreateModal } from "../atoms";

interface IPostsSection {}
const PostsSection: React.FC<IPostsSection> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex padding={"1rem 2rem 0.5rem"} direction={"column"} gap={"1rem"}>
      <Stack direction="row" justifyContent="space-between">
        <Text fontSize={"xx-large"} as={"b"}>
          Posts
        </Text>
        <Button
          colorScheme="messenger"
          leftIcon={<SmallAddIcon />}
          padding={"0.5rem 2rem"}
          onClick={() => onOpen()}
        >
          Add Post
        </Button>
        {isOpen && (
          <CreateModal
            isModalOpen={isOpen}
            onModalOpen={onOpen}
            onModalClose={onClose}
          />
        )}
      </Stack>
      <Stack>
        <FilterBar />
      </Stack>
      <Stack>
        <PostsTable />
      </Stack>
    </Flex>
  );
};

export default PostsSection;
