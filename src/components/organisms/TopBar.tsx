import React from "react";
import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { usePostRefreshTokenMutation } from "../../features/auth/api";

interface ITopBar {}

const TopBar: React.FC<ITopBar> = ({}) => {
  const location = useLocation();

  const isAtPosts = location.pathname !== "/";

  const authUser = useSelector(
    (state: RootState) => state.auth.authLoginResponse
  );

  const [refreshToken, { data, error, isSuccess, isLoading }] =
    usePostRefreshTokenMutation();

  const displayName =
    !!authUser.user.firstname && !!authUser.user.lastname
      ? ` ${authUser.user.firstname} ${authUser.user.lastname}`
      : "";

  return (
    <Flex
      className="shadow-sm"
      padding={"1.5rem 2rem"}
      background={"white"}
      borderBottom={1}
      borderBottomColor={"lightgray"}
      borderBottomStyle={"solid"}
      position={"sticky"}
      top={0}
      zIndex={999}
      gap={2}
      alignItems={"center"}
    >
      {isAtPosts && (
        <Button
          colorScheme="messenger"
          variant="outline"
          leftIcon={<ArrowBackIcon />}
        >
          <Link to="/">Go back to Posts</Link>
        </Button>
      )}
      <Text>
        👋 Hi{displayName}! {!isAtPosts && "Welcome 🌊"}
      </Text>
    </Flex>
  );
};

export default TopBar;
