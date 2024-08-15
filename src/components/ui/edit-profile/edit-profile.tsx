import { Pencil } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Modal from "../modal/modal";
import ProfileImg from "../profile/profile-img";
import Input from "./input";
import Textarea from "./text-area";
import {
  EditUserFormFields,
  editUserSchema,
  useEditUser,
} from "./api/edit-user";
import { User } from "../../../types/types";

type EditProfileProps = {
  user: User;
  setShowModal: any;
};

export default function EditProfile({ user, setShowModal }: EditProfileProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<EditUserFormFields>({
    resolver: zodResolver(editUserSchema),
  });
  const profileImgRef = useRef<HTMLInputElement | null>(null);
  const coverImgRef = useRef<HTMLInputElement | null>(null);
  const [coverImg, setCoverImg] = useState(user.coverImg);
  const [profileImg, setProfileImg] = useState(user.profileImg);
  const { mutate: editUser } = useEditUser();

  const handleProfileClick = () => {
    if (profileImgRef.current !== null) {
      profileImgRef.current.click();
    }
  };

  const handleCoverClick = () => {
    if (coverImgRef.current !== null) {
      coverImgRef.current.click();
    }
  };

  const handleCoverImgChange = (e: ChangeEvent) => {
    setCoverImg(URL.createObjectURL((e.target as HTMLInputElement).files![0]));
  };

  const handleProfileImgChange = (e: ChangeEvent) => {
    setProfileImg(
      URL.createObjectURL((e.target as HTMLInputElement).files![0])
    );
  };

  const onSubmit: SubmitHandler<EditUserFormFields> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("bio", data.bio);
      if (data.coverImg.length) {
        formData.append("coverImg", data.coverImg[0]);
      }
      if (data.profileImg.length) {
        formData.append("profileImg", data.profileImg[0]);
      }
      editUser(formData);
      setShowModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  const { ref: coverImgRegister, ...coverImgRest } = register("coverImg", {
    onChange: handleCoverImgChange,
  });
  const { ref: profileImgRegister, ...profileImgRest } = register(
    "profileImg",
    { onChange: handleProfileImgChange }
  );

  return (
    <Modal title="Edit Profile" setShowModal={setShowModal}>
      <div className="flex flex-col justify-center items-center bg-white relative">
        <img
          src={
            coverImg
              ? coverImg
              : "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
          }
          alt=""
          className="h-60 object-cover w-full"
        />
        <div
          onClick={handleCoverClick}
          className="absolute bg-[#00000098] p-2 rounded-full -translate-y-[30px] cursor-pointer"
        >
          <Pencil size={20} color="#ffff" />
        </div>
        <div className="border-[6px] border-white rounded-full mt-[-50px] relative">
          <ProfileImg image={profileImg!} size={100} />
          <div
            onClick={handleProfileClick}
            className="absolute bg-[#00000098] p-2 rounded-full translate-x-[32px] -translate-y-[68px] cursor-pointer"
          >
            <Pencil size={20} color="#ffff" />
          </div>
        </div>
      </div>
      <form
        method="post"
        onSubmit={handleSubmit(onSubmit)}
        className="p-3 flex flex-col gap-3"
      >
        <Input
          placeholder="Name"
          value={user.name ? user.name : user.username}
          register={register("name")}
        />
        <Textarea
          placeholder="Bio"
          value={user.bio!}
          register={register("bio")}
        />
        <input
          type="file"
          className="hidden"
          ref={(e) => {
            coverImgRegister(e);
            coverImgRef.current = e;
          }}
          {...coverImgRest}
        />
        <input
          type="file"
          className="hidden"
          ref={(e) => {
            profileImgRegister(e);
            profileImgRef.current = e;
          }}
          {...profileImgRest}
        />
        <button className="w-fit ml-auto">Save</button>
      </form>
    </Modal>
  );
}
