import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Form from "../../components/ui/auth-form/form";
import Input from "../../components/ui/auth-form/input";
import {
  loginUser,
  LoginFormFields,
  loginSchema,
  setLocalStorage,
} from "../../lib/auth";
import Button from "../../components/ui/auth-form/button";
import FormLink from "../../components/ui/auth-form/form-link";
import useAuthStore from "../../hooks/use-auth-store";
import { User } from "../../types/types";

export default function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormFields>({
    resolver: zodResolver(loginSchema),
  });
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
  const setUser = useAuthStore((state) => state.setUser);

  const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
    try {
      const user = await loginUser(data);
      if (!user.success) {
        setError("root", {
          message: "Incorrect Username/Password",
        });
      } else {
        setLocalStorage(user);
        setUser({
          username: user.user.username,
          name: user.user.name,
          profileImg: user.user.profileImg,
          friends: user.user.friends.map((user: User) => user.id),
          requests: user.user.requests.map((request) => request.fromUserId),
          outgoingRequests: user.user.outgoingRequests.map(
            (request) => request.toUserId
          ),
          id: user.user.id,
        });
        setIsLoggedIn(true);
        window.location.href = "/home";
      }
    } catch (err) {
      setError("root", {
        message: "Incorrect Username/Password",
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} title="Log In">
      <Input
        type={"text"}
        placeholder={"Username/Email"}
        register={register("username")}
        errorMessage={errors.username?.message}
      />
      <Input
        type={"password"}
        placeholder={"Password"}
        register={register("password")}
        errorMessage={errors.password?.message}
      />
      <Button text="Log In" isSubmitting={isSubmitting} />
      <FormLink
        text="Don't have an account?"
        route="register"
        link="Register"
      />
    </Form>
  );
}
