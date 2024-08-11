import { Pencil } from "lucide-react";

import Modal from "../modal/modal";
import ProfileImg from "../profile/profile-img";
import Input from "../auth-form/input";
import { default as TextArea } from "../auth-form/input";

type EditProfileProps = {
  user: any;
  setShowModal: any;
};

export default function EditProfile({ user, setShowModal }: EditProfileProps) {
  return (
    <Modal title="Edit Profile" setShowModal={setShowModal}>
      <div className="flex flex-col justify-center items-center bg-white relative">
        <img
          src={
            user.coverImg
              ? user.coverImg
              : "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
          }
          alt=""
          className="h-60 object-cover w-full"
        />
        <div className="absolute bg-[#00000098] p-2 rounded-full -translate-y-[30px] cursor-pointer">
          <Pencil size={20} color="#ffff" />
        </div>
        <div className="border-[6px] border-white rounded-full mt-[-50px] relative">
          <ProfileImg image={user.ProfileImg} size={100} />
          <div className="absolute bg-[#00000098] p-2 rounded-full translate-x-[32px] -translate-y-[68px] cursor-pointer">
            <Pencil size={20} color="#ffff" />
          </div>
        </div>
      </div>
      <div className="p-3">
        
      </div>
    </Modal>
  );
}
