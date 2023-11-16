import React from "react";
import { Box } from "@chakra-ui/react";

interface ITopBar {}

const TopBar: React.FC<ITopBar> = ({}) => {
  return (
    <Box
      className="shadow-sm"
      padding={"2rem"}
      background={"white"}
      borderBottom={1}
      borderBottomColor={"lightgray"}
      borderBottomStyle={"solid"}
      position={"sticky"}
      top={0}
      zIndex={999}
    >
      ITopBar
    </Box>
  );
};

export default TopBar;
