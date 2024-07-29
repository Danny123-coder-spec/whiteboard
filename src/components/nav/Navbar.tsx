import React from "react";
import { FiUser } from "react-icons/fi";
import { CiSettings } from "react-icons/ci";

const HomeNav = () => {
  return (
    <div className="bg-white p-3 h-[3rem] w-full flex items-start justify-end">
      <div className="flex items-center gap-10">
        <div className="cursor-pointer">
          <FiUser size={24} />
        </div>
        <div className="cursor-pointer">
          <CiSettings size={24} />
        </div>
      </div>
    </div>
  );
};

export default HomeNav;
