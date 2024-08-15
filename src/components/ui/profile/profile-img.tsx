interface ProfileImgProps {
  image: string;
  size?: number;
}

export default function ProfileImg({ image, size = 40 }: ProfileImgProps) {
  return (
    <img
      src={
        image
          ? image
          : "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
      }
      alt=""
      className="rounded-full scale-[1.02]"
      style={{ width: size, height: size }}
    />
  );
}
