import React, { useEffect, useRef, useState } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormLabel,
  Input,
  FormControl,
  Textarea,
  Stack,
  FormErrorMessage,
  FormHelperText,
  Switch,
} from "@chakra-ui/react";
import { usePostPostsMutation } from "../../features/post/api";

interface ICreateModal {
  isModalOpen: boolean;
  onModalOpen: () => void;
  onModalClose: () => void;
}
const CreateModal: React.FC<ICreateModal> = ({
  isModalOpen,
  onModalClose,
  onModalOpen,
}) => {
  const [
    savePost,
    {
      isLoading: isSaveLoading,
      isSuccess: isSaveSuccess,
      isUninitialized: isSaveUninitialized,
    },
  ] = usePostPostsMutation();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    published: true,
  });

  const [formErrors, setFormErrors] = useState({
    title: "",
    content: "",
  });

  const hasErrors =
    formErrors.title.length > 0 || formErrors.content.length > 0;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value ? e.target.value : e.target.value.trim();
    const name = e.target.name;

    if (!value) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "This field can't be empty!",
      }));
    }
    if (value && formErrors[name as "title" | "content"]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ hasErrors });
    if (hasErrors) return;
    savePost({ ...formData });
    onModalClose();
  };

  return (
    <Modal isOpen={isModalOpen} onClose={onModalClose} size={"xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <form onSubmit={onSubmit}>
            <ModalHeader>Create Post</ModalHeader>
            <ModalCloseButton />

            <Stack spacing={2}>
              <FormControl isInvalid={!!formErrors.title} isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
                {!!formErrors.title && (
                  <FormErrorMessage>Title is required.</FormErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={!!formErrors.title} isRequired>
                <FormLabel>Content</FormLabel>
                <Textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                />
                {!!formErrors.content && (
                  <FormErrorMessage>Content is required.</FormErrorMessage>
                )}
              </FormControl>

              <FormControl>
                <FormLabel>Published</FormLabel>
                <Switch
                  name="published"
                  isChecked={formData.published}
                  onChange={() =>
                    setFormData((prev) => ({
                      ...prev,
                      published: !prev.published,
                    }))
                  }
                />
                {!!formErrors.content && (
                  <FormErrorMessage>Content is required.</FormErrorMessage>
                )}
              </FormControl>
            </Stack>

            <ModalFooter gap={1} mr={-8}>
              <Button
                variant="outline"
                colorScheme="blue"
                onClick={() => {
                  onModalClose();
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={true}
                isLoading={isSaveLoading}
                loadingText="Saving"
                colorScheme="blue"
                mr={3}
                onClick={() => {
                  //   onModalClose();
                }}
              >
                Save
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CreateModal;
