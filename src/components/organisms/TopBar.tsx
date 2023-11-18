import React from "react";
import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface ITopBar {}

const TopBar: React.FC<ITopBar> = ({}) => {
  return (
    <Box
      className="shadow-sm"
      padding={"1.5rem 2rem"}
      background={"white"}
      borderBottom={1}
      borderBottomColor={"lightgray"}
      borderBottomStyle={"solid"}
      position={"sticky"}
      top={0}
      zIndex={999}
    >
      <Link to="/">Post Its</Link>
    </Box>
  );
};

export default TopBar;
