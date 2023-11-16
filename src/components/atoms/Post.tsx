import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  StackDivider,
  Divider,
  Box,
  Text,
} from "@chakra-ui/react";

import { Post } from "../../features/post/types";
import { formatDistanceToNow } from "date-fns";

interface IPost {
  post: Post;
}
const PostComponent: React.FC<IPost> = ({ post }) => {
  const { title, content, authorId, createdAt, published, updatedAt, id } =
    post;

  const formattedTime = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
  });

  const [createdDateString, _] = new Date(createdAt)
    .toLocaleString()
    .split(",");
  return (
    <Card padding={"1rem"}>
      <CardHeader>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Stack direction={"column"}>
            <Stack direction={"row"}>
              <Heading size="sm">{title}</Heading>
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
  );
};

export default PostComponent;
