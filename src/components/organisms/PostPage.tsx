import React from "react";
import { Link, useParams } from "react-router-dom";
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
  Skeleton,
  SkeletonText,
  Flex,
} from "@chakra-ui/react";
import { Post } from "../../features/post/types";
import { formatDistanceToNow } from "date-fns";
import { useGetPostQuery } from "../../features/post/api";
import { PostDetails } from "../molecules";

interface IPostPage {}
const PostPage: React.FC<IPostPage> = () => {
  const { id } = useParams();

  const { data, isLoading, isSuccess } = useGetPostQuery(id ? id : "");

  const { title, content } = data
    ? data
    : ({
        id: "",
        title: "",
        content: "",
        published: false,
        createdAt: "",
        updatedAt: "",
        authorId: "",
      } as Post);

  if (isLoading) {
    return (
      <Card
        padding={"1rem"}
        margin={"20px auto 0"}
        width={0.8}
        height={"85vh"}
        maxWidth={"1280px"}
      >
        <CardHeader>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Stack direction={"column"}>
              <Stack direction={"row"}>
                <Heading size="sm">
                  <Skeleton width={200}>{"z"}</Skeleton>
                </Heading>
                <Box></Box>
              </Stack>
            </Stack>
          </Stack>
        </CardHeader>
        <Divider color={"lightgray"} width={"95%"} margin={"0 auto"} />
        <CardBody overflow={"auto"}>
          <Stack>
            <Box>
              <Text>{content}</Text>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    );
  }

  if (!isSuccess) {
    return <div>Something Wrong, Refresh</div>;
  }

  return (
    <Flex margin={"20px auto 0"} width={0.95} gap={5}>
      <Stack flex={1}>
        <PostDetails post={data} />
      </Stack>
      <Card flex={3} padding={"1rem"} h={"88vh"} maxH={"88vh"}>
        <CardHeader>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Heading size="md">{title}</Heading>
          </Stack>
        </CardHeader>
        <Divider color={"lightgray"} width={"95%"} margin={"0 auto"} />
        <CardBody overflow={"auto"}>
          <Stack>
            <Box>
              <Text>{content}</Text>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default PostPage;
