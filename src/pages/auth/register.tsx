import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import Form from "../../components/ui/auth-form/form";
import Input from "../../components/ui/auth-form/input";
import {
  RegisterFormFields,
  registerSchema,
  registerUser,
} from "../../lib/auth";
import Button from "../../components/ui/auth-form/button";
import FormLink from "../../components/ui/auth-form/form-link";

export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormFields>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormFields> = async (data) => {
    try {
      delete data.confirm;
      let user = await registerUser(data);
      if (!user.success) {
        setError("root", {
          message: "Username/Email already registered",
        });
      } else {
        navigate("/login", { replace: true });
      }
    } catch (err) {
      console.log(err);
      setError("root", {
        message: "Username/Email already registered",
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} title="Register">
      <Input
        type={"text"}
        placeholder={"Username"}
        register={register("username")}
        errorMessage={errors.username?.message}
      />
      <Input
        type={"text"}
        placeholder={"Email"}
        register={register("email")}
        errorMessage={errors.email?.message}
      />
      <Input
        type={"password"}
        placeholder={"Password"}
        register={register("password")}
        errorMessage={errors.password?.message}
      />
      <Input
        type={"password"}
        placeholder={"Confirm Password"}
        register={register("confirm")}
        errorMessage={errors.confirm?.message}
      />
      <Button text="Register" isSubmitting={isSubmitting} />
      <FormLink text="Already have an account?" route="login" link="Log In" />
    </Form>
  );
}
