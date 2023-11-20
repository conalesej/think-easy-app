import React, { useEffect } from "react";

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
import { toast } from "react-toastify";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAuthTokens,
  revalidateToken,
} from "../../features/auth/authSlice";
import { RootState } from "../../store";

interface ICreateModal {
  isModalOpen: boolean;
  onModalClose: () => void;
}
const CreateModal: React.FC<ICreateModal> = ({ isModalOpen, onModalClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [
    savePost,
    { isLoading: isSaveLoading, isSuccess: isSaveSuccess, error: saveError },
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
  };

  useEffect(() => {
    if (isSaveSuccess) {
      toast.success("🦄 Post created successfully!");

      onModalClose();
    }
  }, [isSaveSuccess]);

  useEffect(() => {
    if (saveError) {
      if ((saveError as FetchBaseQueryError).status === 401) {
        toast.error("It seems that your token expired!");
        toast.warn("Restoring token...", {
          autoClose: false,
        });
        dispatch(revalidateToken());
      } else {
        toast.error(" There was an error from the server. Try again later!😔");
      }
    }
  }, [saveError]);

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
                    maxLength: 3500,
                  })}
                />
                {errors?.content?.type === "maxLength" && (
                  <FormErrorMessage>
                    Max length exceeded. It should be no more than 3500
                    characters.
                  </FormErrorMessage>
                )}
                {errors?.content?.type === "required" && (
                  <FormErrorMessage>Title is required.</FormErrorMessage>
                )}
              </FormControl>

              <FormControl>
                <FormLabel>Published</FormLabel>
                <Switch defaultChecked {...register("published")} />
              </FormControl>
            </Stack>

            <ModalFooter gap={1} mr={-8}>
              <Button
                variant="outline"
                colorScheme="blue"
                onClick={() => {
                  onModalClose();
                  toast.dismiss();
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
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
