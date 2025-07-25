import Image from "next/image";
import avatar from "../../public/avatar.jpeg";

export const AuthorAvatar = () => {
  return (
    <Image
      width={200}
      height={200}
      className="h-20 w-20 rounded-full"
      src={avatar}
      alt={"Your avatar"}
    />
  );
};
