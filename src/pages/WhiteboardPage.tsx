
import WhiteboardNav from "../components/nav/WhiteboardNav";
import Bottomfunc from "../components/Bottomfunc";
import { HiMagnifyingGlassMinus } from "react-icons/hi2";
import { HiMagnifyingGlassPlus } from "react-icons/hi2";

const WhiteboardPage = () => {
  //   const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  //   React.useEffect(() => {
  //     const canvasInstance = useCanvas();
  //     if (canvasRef.current) {
  //       canvasInstance.initCanvas(canvasRef.current);
  //     }
  //   }, []);

  return (
    <div className="relative flex flex-col min-h-screen">
      <WhiteboardNav />
      <main className="flex-grow relative">
        {/* <canvas
          id="editingCanvas"
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full"
        /> */}
      </main>
      <div className="bottom-2.5 z-20 left-0 w-full flex items-center justify-center fixed">
        <Bottomfunc />
      </div>
      <div className="bottom-2.5 z-10 right-2 w-full flex items-end justify-end fixed">
        <div className="flex items-end justify-end ">
          <div className=" bg-white gap-8 h-[2.6rem] rounded-[10px] shadow-sm w-[12rem] flex items-center justify-center">
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
