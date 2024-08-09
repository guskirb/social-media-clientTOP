import { Image } from "lucide-react";

import Form from "./form";
import Input from "./input";
import ProfileImg from "../profile/profile-img";
import { FieldValues, UseFormRegister } from "react-hook-form";

type PostFormProps = {
  onSubmit: any;
  user: any;
  register: UseFormRegister<FieldValues>;
  name: string;
  placeholder: string;
};

export default function PostForm({
  onSubmit,
  user,
  register,
  name,
  placeholder,
}: PostFormProps) {
  return (
    <Form onSubmit={onSubmit}>
      <ProfileImg image={user.ProfileImg} />
      <div className="w-full">
        <Input placeholder={placeholder} register={register} name={name} />
        <div className="flex items-center justify-between">
          <Image color="#7a7a7a" strokeWidth={1} />
          <button>Post</button>
        </div>
      </div>
    </Form>
  );
}
