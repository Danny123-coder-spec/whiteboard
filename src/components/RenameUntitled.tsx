import { GoChevronDown } from "react-icons/go";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/untitledDropdown";
import { useState } from "react";

const RenameUntitled = () => {
    const [newTitle, setNewTitle] = useState<string>("Untitled");
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-1.5 cursor-pointer">
          <span className="text-base font-medium">Untitled</span>
          <GoChevronDown size={22} className="text-gray-400" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mt-2 ml-4">
          <span className="text-sm font-medium">Board name</span>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="New title"
            className={`p-[0.3rem]  outline-none mt-2 bg-transparent rounded w-full 
            border border-slate-400
            }`}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default RenameUntitled;
