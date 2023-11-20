import React, { useState } from "react";
import { Button, Flex, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { RepeatIcon, SmallAddIcon } from "@chakra-ui/icons";
import { FilterBar, PostsTable } from "../molecules";
import { CreateModal } from "../atoms";
import { useGetPostsQuery } from "../../features/post/api";
import { Post } from "../../features/post/types";

interface IPostsSection {}
const PostsSection: React.FC<IPostsSection> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [searchPhrase, setSearchPhrase] = useState("");

  const { data, isFetching, isSuccess, refetch } = useGetPostsQuery();
  const posts: Post[] = isSuccess ? data : ([] as Post[]);

  return (
    <Flex
      padding={"1rem 2rem 0.5rem"}
      direction={"column"}
      gap={"1rem"}
      width={"50%"}
      minWidth={"500px"}
      margin={"0 auto"}
    >
      <Stack direction="row" justifyContent="space-between">
        <Text fontSize={"xx-large"} as={"b"}>
          Posts 📃
        </Text>
        <Stack direction={"row"}>
          <Button
            colorScheme="messenger"
            variant={"outline"}
            isLoading={isFetching}
            padding={"1rem 1rem"}
            onClick={() => refetch()}
          >
            <RepeatIcon boxSize={"20px"} />
          </Button>

          <Button
            colorScheme="messenger"
            leftIcon={<SmallAddIcon />}
            padding={"0.5rem 2rem"}
            onClick={() => onOpen()}
          >
            Add Post
          </Button>
        </Stack>
        {isOpen && <CreateModal isModalOpen={isOpen} onModalClose={onClose} />}
      </Stack>
      <Stack>
        <FilterBar
          setSearchPhrase={(str: string) => setSearchPhrase(str)}
          searchPhrase={searchPhrase}
        />
      </Stack>
      <Stack>
        <PostsTable
          searchPhrase={searchPhrase}
          isLoading={isFetching}
          posts={posts}
        />
      </Stack>
    </Flex>
  );
};

export default PostsSection;
