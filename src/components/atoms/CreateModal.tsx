import React from "react";

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
  Switch,
} from "@chakra-ui/react";
import { usePostPostsMutation } from "../../features/post/api";
import { useForm } from "react-hook-form";

interface ICreateModal {
  isModalOpen: boolean;
  onModalClose: () => void;
}
const CreateModal: React.FC<ICreateModal> = ({ isModalOpen, onModalClose }) => {
  const [
    savePost,
    {
      isLoading: isSaveLoading,
      isSuccess: isSaveSuccess,
      isUninitialized: isSaveUninitialized,
    },
  ] = usePostPostsMutation();

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: { [key: string]: any }) => {
    if (Object.keys(errors).length) return;
    savePost({ ...data } as {
      title: string;
      content: string;
      published: boolean;
    });

    if (!isSaveSuccess) return;
    onModalClose();
  };

  return (
    <Modal isOpen={isModalOpen} onClose={onModalClose} size={"xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <form onSubmit={rhfHandleSubmit(onSubmit)}>
            <ModalHeader>Create Post</ModalHeader>
            <ModalCloseButton />

            <Stack spacing={2}>
              <FormControl isInvalid={!!errors?.title}>
                <FormLabel>Title</FormLabel>
                <Input
                  {...register("title", {
                    required: "This field is required!",
                    maxLength: 50,
                  })}
                />
                {errors?.title?.type === "maxLength" && (
                  <FormErrorMessage>
                    Max length exceeded. It should be no more than 50
                    characters.
                  </FormErrorMessage>
                )}
                {errors?.title?.type === "required" && (
                  <FormErrorMessage>Title is required.</FormErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={!!errors?.content}>
                <FormLabel>Content</FormLabel>
                <Textarea
                  {...register("content", {
                    required: "This field is required!",
                    maxLength: 1000,
                  })}
                />
                {errors?.content?.type === "maxLength" && (
                  <FormErrorMessage>
                    Max length exceeded. It should be no more than 1000
                    characters.
                  </FormErrorMessage>
                )}
                {errors?.content?.type === "required" && (
                  <FormErrorMessage>Title is required.</FormErrorMessage>
                )}
              </FormControl>

              <FormControl>
                <FormLabel>Published</FormLabel>
                <Switch {...register("published")} />
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
