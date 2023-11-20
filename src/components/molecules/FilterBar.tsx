import { ArrowForwardIcon, Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";

interface IFilterBar {
  searchPhrase: string;
  setSearchPhrase: (searchPhrase: string) => void;
}
const FilterBar: React.FC<IFilterBar> = ({ searchPhrase, setSearchPhrase }) => {
  const [input, setInput] = useState("");
  return (
    <Box
      padding={"0.5rem"}
      bg={"white"}
      className="shadow-md"
      display={"flex"}
      gap={2}
    >
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Search2Icon color="gray.300" />
        </InputLeftElement>
        <Input
          placeholder="Press 'Enter' to search for a value"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setSearchPhrase(input);
            }
          }}
        />
        {input.length && searchPhrase && (
          <InputRightElement>
            <Button
              h="1.75rem"
              size="sm"
              onClick={() => {
                setSearchPhrase("");
                setInput("");
              }}
              color={"gray"}
              bg={"white"}
            >
              X
            </Button>
          </InputRightElement>
        )}
      </InputGroup>
      <Button colorScheme="messenger">
        <ArrowForwardIcon
          cursor={"pointer"}
          boxSize={"20px"}
          onClick={() => setSearchPhrase(input)}
        />
      </Button>
    </Box>
  );
};

export default FilterBar;
