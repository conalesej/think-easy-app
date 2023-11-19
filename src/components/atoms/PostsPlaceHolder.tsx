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
  SkeletonText,
  Skeleton,
} from "@chakra-ui/react";

interface IPostsPlaceHolder {
  isEmpty?: boolean;
  searchPhrase?: string;
}
const PostsPlaceHolder: React.FC<IPostsPlaceHolder> = ({
  isEmpty = false,
  searchPhrase = "",
}) => {
  if (isEmpty) {
    return (
      <Box padding={"2rem"} display={"flex"} flexDirection={"column"} gap={5}>
        <Stack>
          <Heading textAlign={"center"} as="h1" fontSize={"8rem"}>
            Empty Posts
          </Heading>
        </Stack>
        <Stack>
          <Text textAlign={"center"} fontSize={"2rem"}>
            No posts found with "
            {<span className="text-blue-700 font-bold">{searchPhrase}</span>}"
          </Text>
        </Stack>
      </Box>
    );
  }

  return (
    <>
      {[1, 2, 3, 4].map((_) => (
        <Card padding={"1rem"} key={_}>
          <CardHeader>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Stack direction={"column"}>
                <Stack direction={"row"}>
                  <Heading size="sm">
                    <Skeleton>{"TESTTESTTEST"}</Skeleton>
                  </Heading>
                  <Box>
                    <Text
                      fontSize={"x-small"}
                      color={"white"}
                      padding={"0.25rem 0.5rem"}
                      borderRadius={"50px"}
                      fontWeight={"bold"}
                    >
                      <Skeleton>Published </Skeleton>
                    </Text>
                  </Box>
                </Stack>
                <Text fontSize="xs" color={"gray"}>
                  <Skeleton> Author: {"TESTTESTTEST"}</Skeleton>
                </Text>
              </Stack>
              <Stack>
                <Skeleton>
                  <Text fontSize="small">{`${"01/01/0000"} (${"4 HOURS AGO"})`}</Text>
                </Skeleton>
              </Stack>
            </Stack>
          </CardHeader>
          <Divider color={"lightgray"} width={"15%"} />
          <CardBody>
            <Stack>
              <Box>
                <SkeletonText
                  mt="4"
                  noOfLines={5}
                  spacing="4"
                  skeletonHeight="3"
                />
              </Box>
            </Stack>
          </CardBody>
        </Card>
      ))}
    </>
  );
};

export default PostsPlaceHolder;
