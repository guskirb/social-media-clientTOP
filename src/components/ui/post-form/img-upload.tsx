import { Image } from "lucide-react";
import { ChangeEvent, useRef } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

type ImgUploadProps = {
  register: UseFormRegister<FieldValues>;
  setImg: any;
};

export default function ImgUpload({ register, setImg }: ImgUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleImageClick = () => {
    if (inputRef.current !== null) {
      inputRef.current.click();
    }
  };

  const handleImageChange = (e: ChangeEvent) => {
    setImg(URL.createObjectURL((e.target as HTMLInputElement).files![0]));
  };

  const { ref, ...rest } = register("image", {
    onChange: handleImageChange,
  });

  return (
    <div>
      <input
        type="file"
        className="hidden"
        ref={(e) => {
          ref(e);
          inputRef.current = e;
        }}
        {...rest}
      />
      <Image
        color="#7a7a7a"
        strokeWidth={1}
        className="cursor-pointer"
        onClick={handleImageClick}
      />
    </div>
  );
}
