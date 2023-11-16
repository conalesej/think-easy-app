import { Flex } from "@chakra-ui/react";
import React from "react";
import { useGetPostsQuery } from "../../features/post/api";
import { Post } from "../../features/post/types";
import { PostComponent } from "../atoms";

interface IPostsTable {}
const PostsTable: React.FC<IPostsTable> = () => {
  const { data, isLoading, isSuccess } = useGetPostsQuery();

  const posts: Post[] = isSuccess ? data : ([] as Post[]);
  return (
    <Flex className="" display={"flex"} direction={"column"} gap={"0.5rem"}>
      {posts?.map((post) => (
        <PostComponent key={post.id} post={post} />
      ))}
    </Flex>
  );
};

export default PostsTable;
