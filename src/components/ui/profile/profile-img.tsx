type ProfileImgProps = {
  image: string;
  size?: string;
};

export default function ProfileImg({ image, size = "10" }: ProfileImgProps) {
  return (
    <img
      src={
        image
          ? image
          : "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
      }
      alt=""
      className={`rounded-full w-${size} h-${size}`}
    />
  );
}
