import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { usePostSignUpMutation } from "../../features/auth/api";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthSignUpInput } from "../../features/auth/types";
import { toast } from "react-toastify";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query/fetchBaseQuery";
import { isEmailValid, isPasswordValid } from "../utils";
import { useDispatch } from "react-redux";
import { setEmail } from "../../features/auth/authSlice";
interface ISignup {}
const SignUp: React.FC<ISignup> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors },
  } = useForm();
  const [
    postSignup,
    {
      isSuccess: isSignupSuccess,
      isLoading: isSignupLoading,
      error: signupErrors,
    },
  ] = usePostSignUpMutation();

  const [userEmail, setUserEmail] = useState("");

  const onSubmit = async (data: { [key: string]: any }) => {
    setUserEmail(data.email as string);
    if (Object.keys(errors).length) return;
    await postSignup({ ...data } as AuthSignUpInput);
  };

  useEffect(() => {
    if (isSignupSuccess) {
      toast.success(`Signup Successful! \n Login to your new credentials 🔑`);
      dispatch(setEmail(userEmail));
      navigate("/login");
    }
  }, [isSignupSuccess]);

  useEffect(() => {
    if (signupErrors) {
      toast.error(
        `Error ${(signupErrors as FetchBaseQueryError).status} : ${
          // @ts-ignore
          (signupErrors as FetchBaseQueryError).data.message
        }`
      );
    }
  }, [signupErrors]);

  useEffect(() => {
    document.body.style.height = "100vh";
    document.body.style.width = "100vw";
    document.body.style.display = "flex";
    document.body.style.justifyContent = "center";
    document.body.style.alignItems = "center";
    document.body.style.backgroundImage = `url("./images/background.jpg")`;
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";

    return () => {
      document.body.style.height = "";
      document.body.style.width = "";
      document.body.style.display = "";
      document.body.style.justifyContent = "";
      document.body.style.alignItems = "";
      document.body.style.backgroundImage = ``;
      document.body.style.backgroundRepeat = "";
      document.body.style.backgroundSize = "";
      document.body.style.backgroundPosition = "";
    };
  }, []);
  return (
    <Card
      width={"600px"}
      display={"flex"}
      flexDirection={"row"}
      padding={"40px"}
    >
      <form className="w-full" onSubmit={rhfHandleSubmit(onSubmit)}>
        <Text align={"center"} fontSize={"xx-large"}>
          Sign Up
        </Text>

        <FormControl isInvalid={!!errors?.email}>
          <FormLabel>Email address</FormLabel>
          <Input
            {...register("email", {
              required: "This field is required!",
              validate: isEmailValid,
            })}
          />

          {errors?.email?.type === "validate" && (
            <FormErrorMessage>Invalid email address format</FormErrorMessage>
          )}
          {errors?.email?.type === "required" && (
            <FormErrorMessage>An email address is required</FormErrorMessage>
          )}

          {!Object.keys(errors).includes("email") && (
            <FormHelperText>We'll never share your email.</FormHelperText>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors?.password}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            {...register("password", {
              required: "This field is required!",
              validate: isPasswordValid,
            })}
          />
          {errors?.password?.type === "validate" && (
            <FormErrorMessage>Must be 8 characters atleast</FormErrorMessage>
          )}
          {errors?.password?.type === "required" && (
            <FormErrorMessage>A password is required</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors?.firstname}>
          <FormLabel>First Name</FormLabel>
          <Input
            {...register("firstname", {
              required: "This field is required!",
            })}
          />

          {errors?.firstname?.type === "required" && (
            <FormErrorMessage>A first name is required</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors?.lastname}>
          <FormLabel>Last Name</FormLabel>
          <Input
            {...register("lastname", {
              required: "This field is required!",
            })}
          />

          {errors?.lastname?.type === "required" && (
            <FormErrorMessage>A last name is required</FormErrorMessage>
          )}
        </FormControl>

        <FormControl
          display={"flex"}
          justifyContent={"end"}
          marginTop={"0.75rem"}
          gap={2}
        >
          <Button
            type="submit"
            isLoading={isSignupLoading}
            colorScheme="teal"
            onClick={() => {
              //   onModalClose();
            }}
          >
            Sign Up
          </Button>
        </FormControl>
      </form>
    </Card>
  );
};

export default SignUp;
