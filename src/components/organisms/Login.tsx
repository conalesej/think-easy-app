import React, { useEffect } from "react";
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { usePostLoginMutation } from "../../features/auth/api";
import { AuthLoginInput } from "../../features/auth/types";
import { isEmailValid, isPasswordValid } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setEmail } from "../../features/auth/authSlice";

interface ILogin {}
const Login: React.FC<ILogin> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userEmail = useSelector(
    (state: RootState) => state.auth.authLoginInput.email
  );

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors },
  } = useForm();

  const [
    postLogin,
    {
      isSuccess: isLoginSuccess,
      isLoading: isLoginLoading,
      error: loginErrors,
    },
  ] = usePostLoginMutation();

  const onSubmit = async (data: { [key: string]: any }) => {
    if (Object.keys(errors).length) return;
    await postLogin({ ...data } as AuthLoginInput);
  };

  useEffect(() => {
    if (isLoginSuccess) {
      dispatch(setEmail(""));
      toast.success(`Login Successful!`);
      navigate("/");
    }
  }, [isLoginSuccess]);

  useEffect(() => {
    if (loginErrors) {
      toast.error(
        `Error ${(loginErrors as FetchBaseQueryError).status} : ${
          // @ts-expect-error
          (loginErrors as FetchBaseQueryError).data.message
        }`
      );
    }
  }, [loginErrors]);
  useEffect(() => {
    toast.success("🎍 Welcome ~ Please log in your credentials!")

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
    <>
      <ToastContainer />
      <Card
        width={"600px"}
        display={"flex"}
        flexDirection={"row"}
        padding={"40px"}
      >
        <form className="w-full" onSubmit={rhfHandleSubmit(onSubmit)}>
          <Text align={"center"} fontSize={"xx-large"}>
            Log In
          </Text>

          <FormControl isInvalid={!!errors?.email}>
            <FormLabel>Email address</FormLabel>
            <Input
              defaultValue={userEmail}
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

          <FormControl
            display={"flex"}
            justifyContent={"end"}
            marginTop={"0.75rem"}
            gap={2}
          >
            <Button loadingText="Saving" colorScheme="teal">
              <Link to={"/signup"}> Sign Up</Link>
            </Button>
            <Button
              type="submit"
              isLoading={isLoginLoading}
              colorScheme="blue"
              onClick={() => {}}
            >
              Login
            </Button>
          </FormControl>
        </form>
      </Card>
    </>
  );
};

export default Login;
