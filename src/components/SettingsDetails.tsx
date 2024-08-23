import { CiExport } from "react-icons/ci";
import { IoHelpOutline } from "react-icons/io5";
import { IoInformationOutline } from "react-icons/io5";
import { exportToPng } from "../lib/utils";

const SettingsDetails = () => {
  return (
    <div className="flex flex-col items-start ">
      <div onClick={exportToPng} className="flex items-center hover:bg-blue-100 cursor-pointer p-2 transition-all duration-300 ease-in-out justify-start w-full gap-4  pb-2">
        <CiExport />
        <span className="text-sm font-medium">Export</span>
      </div>
      <div className="flex items-center p-2 cursor-pointer hover:bg-blue-100 transition-all duration-300 ease-in-out pt-2 w-full justify-start gap-4  pb-2">
        <IoHelpOutline />
        <span className="text-sm font-medium">Help</span>
      </div>
      <div className="flex items-center p-2 cursor-pointer hover:bg-blue-100 transition-all duration-300 ease-in-out pt-2 w-full justify-start gap-4">
        <IoInformationOutline/>
        <span className="text-sm font-medium">About Whiteboard</span>
      </div>
    </div>
  );
};

export default SettingsDetails;
