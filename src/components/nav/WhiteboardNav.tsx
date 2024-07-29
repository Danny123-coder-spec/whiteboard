import React from "react";
import { FiUser } from "react-icons/fi";
import { CiSettings } from "react-icons/ci";
import { GoHome } from "react-icons/go";
import { Link } from "react-router-dom";

const WhiteboardNav = () => {
  return (
    <div className="bg-white p-2 h-[3rem] w-full shadow-sm flex items-start justify-between">
      <div className="flex item-center gap-7">
        <Link to="/">
          <GoHome size={24} />
        </Link>

        <span className="text-base">
            Untitled Document

        </span>
      </div>
      <div className="flex items-center gap-6">
        <div className="cursor-pointer">
          <button
            onClick={() => {}}
            className="p-1.5 text-sm border border-slate-700 bg-transparent text-slate-900 w-[7rem] rounded"
          >
            Share
          </button>
        </div>
        <div className="cursor-pointer">
          <CiSettings size={24} />
        </div>
      </div>
    </div>
  );
};

export default WhiteboardNav;
