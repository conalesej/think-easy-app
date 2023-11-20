import React from "react";
import { Skeleton, Tooltip } from "@chakra-ui/react";

import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  Box,
  Text,
  StackDivider,
  Flex,
} from "@chakra-ui/react";
import { CheckCircleIcon, InfoIcon } from "@chakra-ui/icons";
import { formatDistanceToNow } from "date-fns";

import { Post } from "../../features/post/types";

interface IPostDetails {
  post: Post;
  isLoading?: boolean;
}
const PostDetails: React.FC<IPostDetails> = ({ post, isLoading = false }) => {
  const { title, published, createdAt, updatedAt, authorId } = post;
  const formattedCreatedDateString = createdAt
    ? formatDistanceToNow(new Date(createdAt), {
        addSuffix: true,
      })
    : "";

  const [createdDateString] = createdAt
    ? new Date(createdAt).toLocaleString().split(",")
    : ["", ""];

  const formattedUpdatedDateString = updatedAt
    ? formatDistanceToNow(new Date(updatedAt), {
        addSuffix: true,
      })
    : "";

  const [updatedDateString] = updatedAt
    ? new Date(updatedAt).toLocaleString().split(",")
    : ["", ""];
  return (
    <Card>
      <CardHeader>
        <Heading className="text-blue-800" size="lg" colorScheme="messenger">
          Post Info
        </Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="md">Title</Heading>

            <Skeleton isLoaded={!isLoading} height={"2rem"}>
              <Text pt="2" fontSize="md">
                {title}
              </Text>
            </Skeleton>
          </Box>
          <Box>
            <Heading size="md">Published</Heading>
            <Text pt="2" fontSize="md">
              <Skeleton isLoaded={!isLoading}>
                {published ? (
                  <Flex direction={"row"} alignItems={"center"} gap={2}>
                    <CheckCircleIcon color={"green"} /> Verified
                  </Flex>
                ) : (
                  <Flex direction={"row"} alignItems={"center"} gap={2}>
                    <InfoIcon color={"orange"} /> Pending
                  </Flex>
                )}
              </Skeleton>
            </Text>
          </Box>
          <Box>
            <Heading size="md">Date created</Heading>
            <Skeleton isLoaded={!isLoading}>
              <Text pt="2" fontSize="md">
                {createdDateString} ({formattedCreatedDateString})
              </Text>
            </Skeleton>
          </Box>
          <Box>
            <Heading size="md">Date updated</Heading>
            <Skeleton isLoaded={!isLoading}>
              <Text pt="2" fontSize="md">
                {updatedDateString} ({formattedUpdatedDateString})
              </Text>
            </Skeleton>
          </Box>
          <Box>
            <Heading size="md">Author's Id</Heading>
            <Tooltip label="See author's posts">
              <Link to={`/users/${authorId}/posts`}>
                <Skeleton isLoaded={!isLoading} height={"2rem"}>
                  <Text
                    className="hover:underline"
                    pt="2"
                    fontSize="md"
                    color={"blue"}
                    cursor={"pointer"}
                  >
                    {authorId}
                  </Text>
                </Skeleton>
              </Link>
            </Tooltip>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default PostDetails;
