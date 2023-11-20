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

import { motion } from "framer-motion";

interface IPost {
  post: Post;
  searchPhrase?: string;
}
const PostComponent: React.FC<IPost> = ({ post, searchPhrase = "" }) => {
  const { title, content, authorId, createdAt, published, id } = post;

  const formattedTime = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
  });

  const [createdDateString] = new Date(createdAt).toLocaleString().split(",");

  return (
    <Link to={`/posts/${id}`}>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
      >
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
                <Highlight
                  query={searchPhrase}
                  styles={{
                    bg: "blue.400",
                    color: "white",
                    borderRadius: "2",
                  }}
                >
                  {content}
                </Highlight>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </motion.div>
    </Link>
  );
};

export default PostComponent;
