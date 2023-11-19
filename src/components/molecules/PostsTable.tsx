import { Flex, Stack } from "@chakra-ui/react";
import React from "react";
import { Post } from "../../features/post/types";
import { PostComponent, PostsPlaceHolder } from "../atoms";

interface IPostsTable {
  searchPhrase: string;
  posts: Post[];
  isLoading: boolean;
}
const PostsTable: React.FC<IPostsTable> = ({
  searchPhrase,
  posts,
  isLoading,
}) => {
  if (isLoading) {
    return <PostsPlaceHolder />;
  }

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchPhrase.toLowerCase()) ||
      post.content.toLowerCase().includes(searchPhrase.toLowerCase())
  );

  if (filteredPosts.length === 0) {
    return <PostsPlaceHolder isEmpty searchPhrase={searchPhrase} />;
  }
  return (
    <Flex
      display={"flex"}
      direction={"column"}
      gap={"0.5rem"}
      width={"100%"}
      margin={"0 auto"}
      cursor={"pointer"}
    >
      {filteredPosts?.map((post) => (
        <Stack
          key={post.id}
          className="border border-gray-300 hover:z-10 hover:border-blue-500 focus:border-blue-500 hover:shadow-outline-blue focus:shadow-outline-blue transform hover:scale-105 focus:scale-105 transition duration-300 ease-in-out "
        >
          <PostComponent
            key={post.id}
            post={post}
            searchPhrase={searchPhrase}
          />
        </Stack>
      ))}
    </Flex>
  );
};

export default PostsTable;
