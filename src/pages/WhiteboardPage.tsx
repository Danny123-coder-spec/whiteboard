import React from "react";
import WhiteboardNav from "../components/nav/WhiteboardNav";
import Bottomfunc from "../components/Bottomfunc";


const WhiteboardPage = () => {
//   const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

//   React.useEffect(() => {
//     const canvasInstance = useCanvas();
//     if (canvasRef.current) {
//       canvasInstance.initCanvas(canvasRef.current);
//     }
//   }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <WhiteboardNav />
      <main className="flex-grow relative">
        {/* <canvas
          id="editingCanvas"
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full"
        /> */}
      </main>
      <div className="bottom-0 left-0 w-full flex items-center justify-center fixed">
        <Bottomfunc />
      </div>
    </div>
  );
};

export default WhiteboardPage;
