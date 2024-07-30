import { BiUndo } from "react-icons/bi";
import { SlCursor } from "react-icons/sl";
import { LuPencilLine } from "react-icons/lu";
import { FaNoteSticky } from "react-icons/fa6";
import { GoImage } from "react-icons/go";
import { RxText } from "react-icons/rx";
import { PiShapes } from "react-icons/pi";

const Bottomfunc = () => {
  const handleIconClick = (id:string) => {
    console.log(`Icon with id ${id} clicked`);
    // Add your functionality here based on the id
  };

  return (
    <section className="flex items-center">
      <div className="flex items-center gap-2">
        {/* Undo and Redo */}
        <div className="bg-white h-[2.6rem] flex items-center justify-center rounded-[8px] shadow-sm w-[2.6rem]">
          <div onClick={() => handleIconClick('undo')} className="flex items-center justify-center cursor-pointer">
            <BiUndo size={20} />
          </div>
        </div>
        <div className="bg-white px-3 h-[2.6rem] flex items-center justify-between rounded-[8px] shadow-sm w-[23rem]">
          <div onClick={() => handleIconClick('cursor')} className="flex items-center justify-center cursor-pointer">
            <SlCursor size={20} />
          </div>
          <div onClick={() => handleIconClick('pencil')} className="flex items-center justify-center cursor-pointer">
            <LuPencilLine size={20} />
          </div>
          <div onClick={() => handleIconClick('note')} className="flex items-center justify-center cursor-pointer">
            <FaNoteSticky size={20} className="text-[#87CEEB]" />
          </div>
          <div onClick={() => handleIconClick('text')} className="flex items-center justify-center cursor-pointer">
            <RxText size={20} />
          </div>
          <div onClick={() => handleIconClick('shapes')} className="flex items-center justify-center cursor-pointer">
            <PiShapes size={20} />
          </div>
          <div onClick={() => handleIconClick('image')} className="flex items-center justify-center cursor-pointer">
            <GoImage size={20} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bottomfunc;

