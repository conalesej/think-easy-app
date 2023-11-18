import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  Divider,
  Box,
  Text,
  Highlight,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

import { Post } from "../../features/post/types";
import { formatDistanceToNow } from "date-fns";

interface IPost {
  post: Post;
}
const PostComponent: React.FC<IPost> = ({ post }) => {
  const searchPhrase = "ext";
  const { title, content, authorId, createdAt, published, updatedAt, id } =
    post;

  const formattedTime = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
  });

  const [createdDateString, _] = new Date(createdAt)
    .toLocaleString()
    .split(",");

  return (
    <Link to={`/posts/${id}`}>
      <Card padding={"1rem"}>
        <CardHeader>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Stack direction={"column"}>
              <Stack direction={"row"}>
                <Heading size="sm">
                  <Highlight
                    query={searchPhrase}
                    styles={{
                      bg: "blue.400",
                      color: "white",
                      borderRadius: "2",
                    }}
                  >
                    {title}
                  </Highlight>
                </Heading>
                <Box>
                  <Text
                    fontSize={"x-small"}
                    bg={published ? "#04AA6D" : "#FF0000"}
                    color={"white"}
                    padding={"0.25rem 0.5rem"}
                    borderRadius={"50px"}
                    fontWeight={"bold"}
                  >
                    {published ? "Published" : "Unpublished"}
                  </Text>
                </Box>
              </Stack>
              <Text fontSize="xs" color={"gray"}>
                Author: {authorId}
              </Text>
            </Stack>
            <Stack>
              <Text fontSize="small">{`${createdDateString} (${formattedTime})`}</Text>
            </Stack>
          </Stack>
        </CardHeader>
        <Divider color={"lightgray"} width={"15%"} />
        <CardBody>
          <Stack>
            <Box>
              <Text>{content}</Text>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </Link>
  );
};

export default PostComponent;
