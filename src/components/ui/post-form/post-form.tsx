import { FieldValues, UseFormRegister } from "react-hook-form";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

import Form from "./form";
import Input from "./input";
import ProfileImg from "../profile/profile-img";
import ImgUpload from "./img-upload";
import Emoji from "./emoji";
import { UserObject } from "../../../hooks/use-auth-store";
import Button from "../auth-form/button";

interface PostFormProps {
  onSubmit: any;
  user: UserObject;
  register: UseFormRegister<FieldValues>;
  name: string;
  placeholder: string;
  resetField: any;
  errors: any;
  isSubmitSuccessful: boolean;
  reset: any;
  isSubmitting: boolean;
}

export default function PostForm({
  onSubmit,
  user,
  register,
  name,
  placeholder,
  resetField,
  isSubmitSuccessful,
  reset,
  isSubmitting,
}: PostFormProps) {
  const [img, setImg] = useState(null);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (isSubmitSuccessful) {
      setImg(null);
      setValue("");
      reset();
    }
  }, [isSubmitSuccessful]);

  const clearImg = () => {
    setImg(null);
    resetField("image");
  };

  return (
    <Form onSubmit={onSubmit}>
      <Link to={`/profile/${user.username}`} className="w-[45px] h-[45px]">
        <ProfileImg image={user.profileImg!} />
      </Link>
      <div className="w-full flex flex-col gap-2">
        <Input
          placeholder={placeholder}
          register={register}
          name={name}
          value={value}
          setValue={setValue}
        />
        {img && (
          <div className="relative">
            <div
              onClick={clearImg}
              className="absolute right-3 top-3 bg-white p-1 rounded-full w-fit cursor-pointer opacity-60 hover:opacity-100 transition-all"
            >
              <X color="#334155"/>
            </div>
            <img src={img} className="rounded-xl w-full" />
          </div>
        )}
        <div className="flex items-center gap-3">
          <ImgUpload register={register} setImg={setImg} />
          <Emoji value={value} setValue={setValue} />
          <div className="ml-auto">
            <Button
              text={name === "post" ? "Post" : "Comment"}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </div>
    </Form>
  );
}
