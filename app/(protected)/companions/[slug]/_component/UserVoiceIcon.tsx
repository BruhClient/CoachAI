import Image from "next/image";
import React from "react";

const UserVoiceIcon = ({
  userName,
  userImage,
}: {
  userName: string;
  userImage: string;
}) => {
  return (
    <div>
      <Image
        src={userImage}
        alt={userName}
        width={130}
        height={130}
        className="rounded-lg"
      />
    </div>
  );
};

export default UserVoiceIcon;
