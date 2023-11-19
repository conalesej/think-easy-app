import { Box, Divider, Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import { useGetPostsByUserIdQuery } from "../../features/post/api";
import { PostComponent as Post, PostsPlaceHolder } from "../atoms";

interface IUserPosts {}
const UserPosts: React.FC<IUserPosts> = () => {
  const { id } = useParams();

  const {
    data: posts,
    isFetching,
    error,
  } = useGetPostsByUserIdQuery(id as string);

  console.log({ error });
  return (
    <Box margin={"20px auto 0px"} width={"95%"}>
      <Text fontSize={"xx-large"} as={"b"}>
        {id}'s Posts 📃
      </Text>
      <Divider mt={5} color={"black"} opacity={1} />

      <Flex
        flexDirection={"column"}
        maxWidth={"100%"}
        width={"50%"}
        gap={2}
        margin={"20px auto"}
      >
        {isFetching ? (
          <PostsPlaceHolder />
        ) : (
          posts?.map((post) => (
            <Stack
              key={post.id}
              className="border border-gray-300 hover:z-10 hover:border-blue-500 focus:border-blue-500 hover:shadow-outline-blue focus:shadow-outline-blue transform hover:scale-105 focus:scale-105 transition duration-300 ease-in-out "
            >
              <Post post={post} />
            </Stack>
          ))
        )}
      </Flex>
    </Box>
  );
};

export default UserPosts;
