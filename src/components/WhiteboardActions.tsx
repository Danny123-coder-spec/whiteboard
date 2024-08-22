import React, { useState } from "react";

import {
  Dialog,
  DialogContent,

  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import { AiOutlineDelete } from "react-icons/ai";
import { HiOutlinePencil } from "react-icons/hi2";

interface WhiteboardActionsProps {
  onRename: (newTitle:string) => void;
  onDelete: () => void;
  isOpen:boolean;
  setIsOpen:(isOpen:boolean) => void;
  isOpenDelete:boolean;
  setIsOpenDelete:(isOpenDelete:boolean) => void;
}

const WhiteboardActions: React.FC<WhiteboardActionsProps> = ({
  onRename,
  onDelete,
  isOpen,
  setIsOpen,
  isOpenDelete,
  setIsOpenDelete,
}) => {
    const [newTitle, setNewTitle] = useState<string>('');
    const [focus, setFocus] = useState<boolean>(false);

    const handleRename = () => {
      onRename(newTitle);
      setNewTitle(newTitle);
      // setNewTitle("")
    };

    const handleOpenChange = () => {
      setIsOpen(!isOpen)
    }

    const handleOpenDeleteChange = () => {
      setIsOpenDelete(!isOpenDelete)
    }
  return (
    <div className="absolute top-0 right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger className=" flex items-center gap-2 px-2 py-2 w-full text-gray-700 hover:bg-gray-100">
          <HiOutlinePencil size={18}/>
          <span>Rename</span>
        </DialogTrigger>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Rename Whiteboard</DialogTitle>
          </DialogHeader>
          <div>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="New title"
              className={`p-[0.4rem]  outline-none bg-transparent rounded w-full ${focus ? 'border-[1.5px] border-blue-700 duration-200 transition-all ease-in-out' : 'border border-slate-200'}`}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
            />
             <div className="flex gap-2 items-center pt-3.5">
              <button
                onClick={handleRename}
                className="p-1.5 text-sm bg-blue-500 text-white rounded w-[6rem] "
              >
                Rename
              </button>
              <button
                onClick={handleOpenChange}
                className="p-1.5 text-sm border border-slate-700 bg-transparent text-slate-900 w-[6rem] rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={isOpenDelete} onOpenChange={handleOpenDeleteChange}>
        <DialogTrigger className="flex items-center gap-2 px-2 py-2 text-left w-full text-gray-700 hover:bg-red-100">
        <AiOutlineDelete size={18}/>
        <span>Delete</span>
        </DialogTrigger>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Delete Whiteboard</DialogTitle>
          </DialogHeader>
          <div>
            <p className="text-sm">Deleting it will permanently remove it. This cannot be undone.</p>
             <div className="flex gap-2 items-center pt-3.5">
              <button
                onClick={onDelete}
                className="p-1.5 text-sm bg-red-500 text-white rounded w-[6rem] "
              >
                Delete
              </button>
              <button
                onClick={handleOpenDeleteChange}
                className="p-1.5 text-sm border border-slate-700 bg-transparent text-slate-900 w-[6rem] rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>


      {/* <button
        onClick={onDelete}
        className="block px-4 py-2 text-left w-full text-red-600 hover:bg-red-100"
      >
        Delete
      </button> */}
    </div>
  );
};

export default WhiteboardActions;
