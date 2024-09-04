import { BiUndo } from "react-icons/bi";
import { SlCursor } from "react-icons/sl";
import { LuPencilLine } from "react-icons/lu";
import { FaNoteSticky } from "react-icons/fa6";
import { GoImage } from "react-icons/go";
import { RxText } from "react-icons/rx";
import { PiShapes } from "react-icons/pi";
import { useEffect, useState } from "react";
import TextProperties from "./TextProperties";
import PencilPalette from "./PencilPalette";
import ShapePalette from "./ShapePallete";

interface BottomfuncProps {
  activeTab:string;
  setActiveTab:(activeTab:string) => void;
  setTool: (tool: string) => void;
  file: File | null;
  setFile: (file: File) => void;
  handlePencilSelect: (color: string, width: number) => void;
  showPencilPalette: boolean;
  showShapes: boolean;
  handleTextBoxColorChange:(color: string) => void;
  setShowShapes: (showShapes: boolean) => void;
  handleShapesSelect: (shapeType: string) => void;
  setShowPencilPalette: (showPencilPalette: boolean) => void;
  selectedText: fabric.Text | null;
  updateTextStyle: (
    styleType:
      | "bold"
      | "italic"
      | "underline"
      | "color"
      | "delete"
      | "copy"
      | "stroke",
    value?: string,
    strokeWidth?: number
  ) => void;
}

const Bottomfunc = ({
  activeTab,
  setActiveTab,
  setTool,
  setFile,
  selectedText,
  handleTextBoxColorChange,
  updateTextStyle,
  setShowShapes,
  handleShapesSelect,
  showShapes,
  setShowPencilPalette,
  showPencilPalette,
  handlePencilSelect,
}: BottomfuncProps) => {
  

  const handleIconClick = (id: string) => {
    setTool(id);
    setActiveTab(id);
    if (id === "image") {
      document.getElementById("file-upload")?.click();
    }
  };

  if (selectedText) {
    alert("Selected");
  }

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const iconClass = (id: string) =>
    `flex items-center justify-center cursor-pointer ${
      activeTab === id ? "bg-gray-100 border border-gray-300" : ""
    } h-[2.2rem] w-[2.35rem] rounded-[8px]`;

  return (
    <section className="flex items-center">
      <div className="flex relative items-center gap-2">
        {/* Undo and Redo */}
        <div className="bg-white h-[2.5rem] flex items-center justify-center rounded-[8px] shadow-md w-[2.6rem]">
          <div
            onClick={() => handleIconClick("undo")}
            className="flex items-center justify-center cursor-pointer"
          >
            <BiUndo size={18} />
          </div>
        </div>
        <div className="bg-white px-1 h-[2.6rem] flex items-center justify-between rounded-[8px] shadow-md w-[21rem]">
          <div
            onClick={() => handleIconClick("cursor")}
            className={iconClass("cursor")}
          >
            <SlCursor size={18} />
          </div>
          <div
            onClick={() => handleIconClick("pencil")}
            className={iconClass("pencil")}
          >
            <LuPencilLine size={18} />
          </div>
          <div
            onClick={() => handleIconClick("note")}
            className={iconClass("note")}
          >
            <FaNoteSticky size={20} className="text-[#87CEEB]" />
          </div>
          <div
            onClick={() => handleIconClick("text")}
            className={iconClass("text")}
          >
            <RxText size={18} />
          </div>
          <div
            onClick={() => handleIconClick("shapes")}
            className={iconClass("shapes")}
          >
            <PiShapes size={18} />
          </div>
          <div
            onClick={() => handleIconClick("image")}
            className={iconClass("image")}
          >
            <GoImage size={18} />
          </div>
          {showPencilPalette && activeTab === "pencil" && (
            <div className="absolute -top-14 mb-2 left-10 right-0 flex justify-center">
              <PencilPalette
                setShowPencilPalette={setShowPencilPalette}
                onSelectPencil={handlePencilSelect}
                showPencilPalette={showPencilPalette}
              />
            </div>
          )}

        </div>
          {showShapes && activeTab === "shapes" && <ShapePalette onSelectShape={handleShapesSelect}  handleTextBoxColorChange={ handleTextBoxColorChange}/>}
      </div>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={handleChangeFile}
        className="hidden"
      />
      {selectedText && <TextProperties updateTextStyle={updateTextStyle} />}
    </section>
  );
};

export default Bottomfunc;

// import { BiUndo } from "react-icons/bi";
// import { SlCursor } from "react-icons/sl";
// import { LuPencilLine } from "react-icons/lu";
// import { FaNoteSticky } from "react-icons/fa6";
// import { GoImage } from "react-icons/go";
// import { RxText } from "react-icons/rx";
// import { PiShapes } from "react-icons/pi";
// import { useState } from "react";

// interface ButtomFuncProps{
//   setTool:(tool:string) => void;
//   file: File | null;
//   setFile: (file: File) => void;
// }

// const Bottomfunc = ({setTool, setFile}:ButtomFuncProps) => {
//   const [activeTab, setActiveTab] = useState<string>('cursor');

//   const handleIconClick = (id:string) => {
//     console.log(`Icon with id ${id} clicked`);
//     setTool(id);
//     setActiveTab(id);
//     if (id === 'image') {
//       document.getElementById('file-upload')?.click();
//     }
//   };

//   const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setFile(e.target.files[0]);
//     }
//   };

//   const iconClass = (id: string) => (
//     `flex items-center justify-center cursor-pointer ${
//       activeTab === id ? 'bg-gray-100 border border-gray-300' : ''
//     } h-[2.2rem] w-[2.35rem] rounded-[8px]`
//   );

//   return (
//     <section className="flex items-center">
//       <div className="flex items-center gap-2">
//         {/* Undo and Redo */}
//         <div className="bg-white h-[2.5rem] flex items-center justify-center rounded-[8px] shadow-md w-[2.6rem]">
//           <div onClick={() => handleIconClick('undo')} className="flex items-center justify-center cursor-pointer">
//             <BiUndo size={18} />
//           </div>
//         </div>
//         <div className="bg-white px-1 h-[2.6rem] flex items-center justify-between rounded-[8px] shadow-md w-[21rem]">
//           <div onClick={() => handleIconClick('cursor')} className={iconClass('cursor')}>
//             <SlCursor size={18} />
//           </div>
//           <div onClick={() => handleIconClick('pencil')} className={iconClass('pencil')}>
//             <LuPencilLine size={18} />
//           </div>
//           <div onClick={() => handleIconClick('note')} className={iconClass('note')}>
//             <FaNoteSticky size={20} className="text-[#87CEEB]" />
//           </div>
//           <div onClick={() => handleIconClick('text')} className={iconClass('text')}>
//             <RxText size={18} />
//           </div>
//           <div onClick={() => handleIconClick('shapes')} className={iconClass('shapes')}>
//             <PiShapes size={18} />
//           </div>
//           <div onClick={() => handleIconClick('image')} className={iconClass('image')}>
//             <GoImage size={18} />
//           </div>
//         </div>
//       </div>
//       <input
//         id="file-upload"
//         type="file"
//         accept="image/*"
//         onChange={handleChangeFile}
//         className="hidden"
//       />
//     </section>
//   );
// };

// export default Bottomfunc;
