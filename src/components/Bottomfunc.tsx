import { BiUndo } from "react-icons/bi";
import { SlCursor } from "react-icons/sl";

const Bottomfunc = () => {
  return (
    <section className="flex items-center ">
      <div className="flex items-center gap-2">
        {/* Undo and Redo */}
        <div className="bg-white h-[2.6rem] flex items-center justify-center rounded-[8px] shadow-sm w-[2.6rem]">
          <div onClick={() => {}} className="flex items-center justify-center">
            <BiUndo size={22}/>
          </div>
        </div>
        <div className="bg-white px-1 h-[2.6rem] flex items-center rounded-[8px] shadow-sm w-[20rem]">
          <div className="bg-gray-100 rounded-[8px] p-2 border border-gray-500">
            <SlCursor/>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default Bottomfunc;
