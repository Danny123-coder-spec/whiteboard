
import { CiSettings } from "react-icons/ci";
import { GoHome } from "react-icons/go";
import { Link } from "react-router-dom";
import { GoChevronDown } from "react-icons/go";
import { CiShare2 } from "react-icons/ci";

const WhiteboardNav = () => {
  return (
    <div className="bg-white h-[2.6rem] w-full shadow-sm flex items-center px-3 justify-between">
      <div className="flex items-center gap-4">
        <Link to="/">
          <GoHome size={20} />
        </Link>
        <div className="bg-gray-300 h-[1rem] w-[0.5px]"></div>
        <div className="flex items-center gap-1.5 flex-row">
          <span className="text-base font-medium">Untitled Document</span>
          <GoChevronDown size={22} className="text-gray-400"/>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="cursor-pointer">
          <button
            onClick={() => {}}
            className="p-1.5 text-sm border flex items-center justify-center gap-4 border-slate-700 bg-transparent text-slate-900 w-[7rem] rounded"
          >
            <CiShare2/>
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
