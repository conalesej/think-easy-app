import { Box, Divider, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetPostsByUserIdQuery } from "../../features/post/api";
import { PostComponent as Post, PostsPlaceHolder } from "../atoms";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query/fetchBaseQuery";

import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { clearAuthTokens } from "../../features/auth/authSlice";

interface IUserPosts {}
const UserPosts: React.FC<IUserPosts> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    data: posts,
    isFetching,
    error,
  } = useGetPostsByUserIdQuery(id as string);

  useEffect(() => {
    if (error) {
      if ((error as FetchBaseQueryError).status === 401) {
        toast.error("It seems that your token expired!");
        toast.warn("Login again...", {
          autoClose: 5000,
        });
        setTimeout(() => {
          dispatch(clearAuthTokens());
          navigate("/login");
        }, 2000);
      } else {
        toast.error(" There was an error from the server. Try again later!😔");
      }
    }
  }, [error]);

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

        {error && (error as FetchBaseQueryError).status === 401 && (
          // {true && (
          <Box
            padding={"2rem"}
            display={"flex"}
            flexDirection={"column"}
            gap={5}
          >
            <Stack>
              <Heading textAlign={"center"} as="h1" fontSize={"8rem"}>
                401
              </Heading>
            </Stack>
            <Stack>
              <Text textAlign={"center"} fontSize={"2rem"}>
                Refreshing Auth Token...
              </Text>
            </Stack>
            {/* <Stack>
              <Button
                colorScheme="messenger"
                variant={"outline"}
                isLoading={isFetching}
                padding={"1rem 1rem"}
                onClick={() => refetch()}
                leftIcon={<RepeatIcon boxSize={"20px"} />}
              >
                Refresh Posts
              </Button>
            </Stack> */}
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default UserPosts;
