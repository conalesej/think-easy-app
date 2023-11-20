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

const emptyData = {
  id: "",
  title: "",
  content: "",
  published: false,
  createdAt: "",
  updatedAt: "",
  authorId: "",
};

interface IPostPage {}
const PostPage: React.FC<IPostPage> = () => {
  const { id } = useParams();

  const { data, isFetching, isSuccess } = useGetPostQuery(id ? id : "");

  const { title, content } = data ? data : (emptyData as Post);

  // if (!isSuccess) {
  //   return <div>Something Wrong, Refresh</div>;
  // }

  return (
    <Flex margin={"20px auto 0"} width={0.95} minWidth={"700px"} gap={5}>
      <Stack flex={1}>
        <PostDetails post={data || emptyData} isLoading={isFetching} />
      </Stack>
      <Card flex={3} padding={"1rem"} h={"88vh"} maxH={"88vh"}>
        <CardHeader>
          <Stack direction={"row"} justifyContent={"space-between"}>
            {!isFetching ? (
              <Text fontSize={"1.25rem"} fontWeight="700" as={"h1"}>
                {title}{" "}
              </Text>
            ) : (
              <Skeleton>TESTESTESTESTTESTESTESTESTTESTESTESTEST</Skeleton>
            )}
          </Stack>
        </CardHeader>
        <Divider color={"lightgray"} width={"95%"} margin={"0 auto"} />
        <CardBody overflow={"auto"}>
          <Stack>
            <Box>
              {!isFetching ? (
                <Text>{content}</Text>
              ) : (
                <SkeletonText
                  mt="4"
                  noOfLines={8}
                  spacing="4"
                  skeletonHeight="3"
                />
              )}
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default PostPage;
