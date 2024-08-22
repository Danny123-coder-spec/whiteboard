import { CiSettings } from "react-icons/ci";
import { GoHome } from "react-icons/go";
import { Link } from "react-router-dom";
import { CiShare2 } from "react-icons/ci";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/sharedialog";
import { Switch } from "../../ui/switch";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";


import SettingsDetails from "../SettingsDetails";
import RenameUntitled from "../RenameUntitled";

const WhiteboardNav = () => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  // const handleRename = () => {
  //   onRename(newTitle);
  //   setNewTitle(newTitle);

  // };

 

  const handleCopyLink = () => {
    const link = "https://localhost:5137/123445";
    navigator.clipboard
      .writeText(link)
      .then(() => {
        toast.success("Link copied to clipboard");
      })
      .catch((err) => {
        console.log("Error copying link", err);
        toast.error("Unable to copy link");
      });
  };
  return (
    <div className="bg-white h-[2.6rem] w-full shadow-sm flex items-center px-3 justify-between">
      <div className="relative flex items-center gap-4">
        <Link to="/">
          <GoHome size={20} />
        </Link>
        <div className="bg-gray-300 h-[1rem] w-[0.5px]"></div>
        <RenameUntitled/>
      </div>
      <div className="relative flex items-center gap-6">
        <div className="cursor-pointer">
          <Dialog>
            <DialogTrigger className="p-1.5 hover:bg-gray-100 transition-all duration-300 ease-in-out  text-sm border flex items-center justify-center gap-4 border-slate-700 bg-transparent text-slate-900 w-[7rem] rounded">
              <CiShare2 />
              <span className="">Share</span>
            </DialogTrigger>
            <DialogContent className="bg-white">
              <DialogHeader>
                <DialogTitle className="font-semibold">Share</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col">
                <h2 className="font-medium">
                  Create a link to this Whiteboard
                </h2>
                <p className="pt-3 text-[15px]">
                  Turn on share link to create a link to this Whiteboard which
                  can be shared via personal or organizational accounts.
                </p>
                <div className="flex items-center justify-between mt-3">
                  <h3 className="font-medium text-[15px]">Share Link</h3>
                  {/* <Switch {...label} defaultChecked /> */}
                  <Switch
                    checked={isSwitchOn}
                    onCheckedChange={setIsSwitchOn}
                  />
                </div>
                {isSwitchOn && (
                  <button
                    onClick={handleCopyLink}
                    className="p-2 text-[14px] bg-blue-700 hover:bg-blue-500 transition-all duration-200 ease-in-out text-white rounded w-full mt-4"
                  >
                    Copy Link
                  </button>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer">
            <CiSettings size={24} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mt-2 mr-4">
            <SettingsDetails />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default WhiteboardNav;
