import WhiteboardNav from "../components/nav/WhiteboardNav";
import Bottomfunc from "../components/Bottomfunc";
import { HiMagnifyingGlassMinus } from "react-icons/hi2";
import { HiMagnifyingGlassPlus } from "react-icons/hi2";
import useCanvas from "../hooks/useCanvas";

const WhiteboardPage = () => {

  const {canvasRef, setTool, setFile, file} = useCanvas();
 
  return (
    <div className="relative flex flex-col min-h-screen">
      <WhiteboardNav />
      <div className="flex-grow relative h-full w-full">
        <canvas ref={canvasRef}  className=" w-full h-full "/>
      </div>
      <div className="bottom-2.5 z-20 left-0 w-full flex items-center justify-center fixed">
        <Bottomfunc setTool={setTool} setFile={setFile} file={file}/>
      </div>
      <div className="bottom-2.5 z-10 right-2 w-full flex items-end justify-end fixed">
        <div className="flex items-end justify-end ">
          <div className="bg-white gap-8 h-[2.5rem] rounded-[10px] shadow-md w-[12rem] flex items-center justify-center">
            <div className="">
              <HiMagnifyingGlassMinus />
            </div>
            <span className="text-gray-500 text-sm">100%</span>
            <div className="">
              <HiMagnifyingGlassPlus />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhiteboardPage;
