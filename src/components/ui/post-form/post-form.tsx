import { FieldValues, UseFormRegister } from "react-hook-form";
import { useState } from "react";
import { X } from "lucide-react";

import Form from "./form";
import Input from "./input";
import ProfileImg from "../profile/profile-img";
import ImgUpload from "./img-upload";

type PostFormProps = {
  onSubmit: any;
  user: any;
  register: UseFormRegister<FieldValues>;
  name: string;
  placeholder: string;
  resetField: any;
};

export default function PostForm({
  onSubmit,
  user,
  register,
  name,
  placeholder,
  resetField,
}: PostFormProps) {
  const [img, setImg] = useState(null);

  const clearImg = () => {
    setImg(null);
    resetField("image");
  };

  return (
    <Form onSubmit={onSubmit}>
      <ProfileImg image={user.ProfileImg} />
      <div className="w-full flex flex-col gap-2">
        <Input placeholder={placeholder} register={register} name={name} />
        {img && (
          <div className="relative">
            <div
              onClick={clearImg}
              className="absolute right-3 top-3 bg-white p-1 rounded-full w-fit cursor-pointer opacity-60 hover:opacity-100 transition-all"
            >
              <X />
            </div>
            <img src={img} className="rounded-xl w-full" />
          </div>
        )}
        <div className="flex items-center justify-between">
          <ImgUpload register={register} setImg={setImg} />
          <button>Post</button>
        </div>
      </div>
    </Form>
  );
}
