import { Flex, Stack } from "@chakra-ui/react";
import React from "react";
import { useGetPostsQuery } from "../../features/post/api";
import { Post } from "../../features/post/types";
import { PostComponent } from "../atoms";

interface IPostsTable {}
const PostsTable: React.FC<IPostsTable> = () => {
  const { data, isLoading, isSuccess } = useGetPostsQuery();

  const posts: Post[] = isSuccess ? data : ([] as Post[]);
  return (
    <Flex
      display={"flex"}
      direction={"column"}
      gap={"0.5rem"}
      width={"50%"}
      margin={"0 auto"}
      cursor={"pointer"}
    >
      {posts?.map((post) => (
        <Stack
          key={post.id}
          className="border border-gray-300 hover:z-10 hover:border-blue-500 focus:border-blue-500 hover:shadow-outline-blue focus:shadow-outline-blue transform hover:scale-105 focus:scale-105 transition duration-300 ease-in-out "
        >
          <PostComponent key={post.id} post={post} />
        </Stack>
      ))}
    </Flex>
  );
};

export default PostsTable;
