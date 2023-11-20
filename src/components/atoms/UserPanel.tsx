import React from "react";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { formatDistanceToNow } from "date-fns";

interface IUserPanel {
  onDrawerClose: () => void;
  isDrawerOpen: boolean;
}
const UserPanel: React.FC<IUserPanel> = ({ onDrawerClose, isDrawerOpen }) => {
  const { email, firstname, lastname, createdAt, role } = useSelector(
    (state: RootState) => state.auth.authLoginResponse.user
  );

  const formattedTime = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
  });

  const [createdDateString] = new Date(createdAt).toLocaleString().split(",");

  return (
    <Drawer placement={"left"} onClose={onDrawerClose} isOpen={isDrawerOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px" fontWeight={"700"}>
          ℹ️ User Info
        </DrawerHeader>
        <DrawerBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Heading size="md">Email</Heading>
              <Text pt="2" fontSize="md">
                {email}
              </Text>
            </Box>
            <Box>
              <Heading size="md">Full Name</Heading>

              <Text pt="2" fontSize="md">
                {firstname + " " + lastname}
              </Text>
            </Box>
            <Box>
              <Heading size="md">User since</Heading>
              <Text pt="2" fontSize="md">
                {createdDateString} ({formattedTime})
              </Text>
            </Box>
            <Box>
              <Heading size="md">Role</Heading>
              <Text pt="2" fontSize="md">
                {role}
              </Text>
            </Box>
          </Stack>
        </DrawerBody>
        <DrawerFooter>
          <Button
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            colorScheme="red"
            variant={"outline"}
          >
            Logout
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default UserPanel;
