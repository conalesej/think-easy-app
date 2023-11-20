import React, { useEffect } from "react";
import { Button, Flex, Text, Tooltip, useDisclosure } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { usePostRefreshTokenMutation } from "../../features/auth/api";
import { RootState } from "../../store";
import { UserPanel } from "../atoms";

interface ITopBar {}

const TopBar: React.FC<ITopBar> = ({}) => {
  const location = useLocation();

  const isAtPosts = location.pathname !== "/";

  const { isOpen, onOpen, onClose } = useDisclosure();

  const authUser = useSelector(
    (state: RootState) => state.auth.authLoginResponse
  );

  const authRefreshToken = useSelector(
    (state: RootState) => state.auth.authTokens.refreshToken
  );

  const authAccessToken = useSelector(
    (state: RootState) => state.auth.authTokens.accessToken
  );

  const [refreshToken] = usePostRefreshTokenMutation();
  const displayName =
    !!authUser.user.firstname && !!authUser.user.lastname
      ? ` ${authUser.user.firstname} ${authUser.user.lastname}`
      : "";

  useEffect(() => {
    const intervalId = setInterval(() => {
      refreshToken({ token: authRefreshToken });
      toast.info("Refreshing your token...", { autoClose: 2500 });
    }, 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
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
        <Tooltip label="My Info!">
          <Text
            onClick={() => onOpen()}
            className="hover:underline cursor-pointer transform hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            👋 Hi{displayName}! {!isAtPosts && "Welcome 🌊"}
          </Text>
        </Tooltip>
      </Flex>
      {authAccessToken && (
        <UserPanel isDrawerOpen={isOpen} onDrawerClose={onClose} />
      )}
    </>
  );
};

export default TopBar;
