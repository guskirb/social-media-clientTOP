import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import Form from "../../components/ui/form/form";
import Input from "../../components/ui/form/input";
import { RegisterFormFields, registerSchema, register } from "../../lib/auth";
import Button from "../../components/ui/form/button";

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
    delete data.confirm;
    console.log(data);
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
      <Button text="Register" isSubmitting={isSubmitting}/>
      <p className="self-center">
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </Form>
  );
}
