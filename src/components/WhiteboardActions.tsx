import React, { useState } from "react";

import {
  Dialog,
  DialogContent,

  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface WhiteboardActionsProps {
  onRename: (newTitle:string) => void;
  onDelete: () => void;
}

const WhiteboardActions: React.FC<WhiteboardActionsProps> = ({
  onRename,
  onDelete,
}) => {
    const [newTitle, setNewTitle] = useState<string>("Untitled");
    const [focus, setFocus] = useState<boolean>(false);

    const handleRename = () => {
      onRename(newTitle);
      setNewTitle("");
    };
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
      <Dialog>
        <DialogTrigger className="block px-4 py-2 text-left w-full text-gray-700 hover:bg-gray-100">Rename</DialogTrigger>
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
             <div className="flex gap-2 items-center mt-3">
              <button
                onClick={handleRename}
                className="p-1.5 text-sm bg-blue-500 text-white rounded w-[6rem] "
              >
                Rename
              </button>
              <button
                onClick={handleRename}
                className="p-1.5 text-sm border border-slate-700 bg-transparent text-slate-900 w-[6rem] rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger className="block px-4 py-2 text-left w-full text-gray-700 hover:bg-gray-100">Delete</DialogTrigger>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Delete Whiteboard</DialogTitle>
          </DialogHeader>
          <div>
            <p className="text-sm">Deleting it will permanently remove it. This cannot be undone.</p>
             <div className="flex gap-2 items-center mt-3">
              <button
                onClick={onDelete}
                className="p-1.5 text-sm bg-red-500 text-white rounded w-[6rem] "
              >
                Delete
              </button>
              <button
                onClick={onDelete}
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
