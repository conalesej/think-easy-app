import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

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
import { clearAuthTokens } from "../../features/auth/authSlice";

import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface ICreateModal {
  isModalOpen: boolean;
  onModalClose: () => void;
}

type FormType = {
  title: string;
  content: string;
};
const formSchema: ZodType<FormType> = z.object({
  title: z
    .string()
    .min(3, "Title must be atleast 3 characters")
    .max(50, "Max length exceeded. It should be no more than 50 characters."),
  content: z
    .string()
    .min(3, "Content must be atleast 3 characters")
    .max(
      3500,
      " Max length exceeded. It should be no more than 3500 characters."
    ),
});

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
  } = useForm({ resolver: zodResolver(formSchema) });

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
        toast.warn("Login again...", {
          autoClose: 5000,
        });
        setTimeout(() => {
          dispatch(clearAuthTokens());
          navigate("/login");
        }, 2000);
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
                <Input {...register("title")} />
                {errors.title && (
                  <FormErrorMessage>
                    {errors.title.message as string}
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={!!errors?.content}>
                <FormLabel>Content</FormLabel>
                <Textarea {...register("content")} />
                {errors.content && (
                  <FormErrorMessage>
                    {errors.content.message as string}
                  </FormErrorMessage>
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
