import React from "react";
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
}
const PostDetails: React.FC<IPostDetails> = ({ post }) => {
  const { title, published, createdAt, updatedAt, authorId } = post;
  const formattedCreatedDateString = createdAt
    ? formatDistanceToNow(new Date(createdAt), {
        addSuffix: true,
      })
    : "";

  const [createdDateString, _] = createdAt
    ? new Date(createdAt).toLocaleString().split(",")
    : ["", ""];

  const formattedUpdatedDateString = updatedAt
    ? formatDistanceToNow(new Date(updatedAt), {
        addSuffix: true,
      })
    : "";

  const [updatedDateString, __] = updatedAt
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
            <Text pt="2" fontSize="md">
              {title}
            </Text>
          </Box>
          <Box>
            <Heading size="md">Published</Heading>
            <Text pt="2" fontSize="md">
              {published ? (
                <Flex direction={"row"} alignItems={"center"} gap={2}>
                  <CheckCircleIcon color={"green"} /> Verified
                </Flex>
              ) : (
                <Flex direction={"row"} alignItems={"center"} gap={2}>
                  <InfoIcon color={"orange"} /> Pending
                </Flex>
              )}
            </Text>
          </Box>
          <Box>
            <Heading size="md">Date created</Heading>
            <Text pt="2" fontSize="md">
              {createdDateString} ({formattedCreatedDateString})
            </Text>
          </Box>
          <Box>
            <Heading size="md">Date updated</Heading>
            <Text pt="2" fontSize="md">
              {updatedDateString} ({formattedUpdatedDateString})
            </Text>
          </Box>
          <Box>
            <Heading size="md">Author's Id</Heading>
            <Link to={`/users/${authorId}/posts`}>
              <Text
                className="hover:underline"
                pt="2"
                fontSize="md"
                color={"blue"}
                cursor={"pointer"}
              >
                {authorId}
              </Text>
            </Link>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default PostDetails;
