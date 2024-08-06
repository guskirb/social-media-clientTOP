import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Form from "../../components/ui/form/form";
import Input from "../../components/ui/form/input";
import {
  login,
  LoginFormFields,
  loginSchema,
  setLocalStorage,
} from "../../lib/auth";
import Button from "../../components/ui/form/button";
import FormLink from "../../components/ui/form/form-link";

export default function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormFields>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
    try {
      const user = await login(data);
      if (!user.success) {
        setError("root", {
          message: "Incorrect Username/Password",
        });
      } else {
        setLocalStorage(user);
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
