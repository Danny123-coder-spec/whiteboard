import WhiteboardNav from "../components/nav/WhiteboardNav";
import Bottomfunc from "../components/Bottomfunc";
import { HiMagnifyingGlassMinus } from "react-icons/hi2";
import { HiMagnifyingGlassPlus } from "react-icons/hi2";
import useCanvas from "../hooks/useCanvas";
import { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import TextProperties from "../components/TextProperties";
import { useEffect, useState } from "react";

const WhiteboardPage = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<string>("cursor");
  const [selectedTextColor, setSelectedTextColor] = useState<string>("");
  // const [showTextProperties, setShowTextProperties] = useState<boolean>(false);


  console.log("whiteboardId:", id);
  const {
    canvasRef,
    setTool,
    setFile,
    file,
    handleZoomIn,
    handleZoomOut,
    scale,
    selectedText,
    updateTextStyle,
    addText,
    handlePencilSelect,
    showPencilPalette,
    setShowPencilPalette,
    showShapes,
    setShowShapes,
    handleShapeSelect,
    handleTextBoxColorChange,
    setSelectedText

  } = useCanvas(Number(id));

  useEffect(() => {
    if (activeTab === "text") {
      addText("Write Your Text Here", {
        fontSize: 20,
        fill: selectedTextColor || "black",
        editable: true,
      });
    }

    if(selectedTextColor){
      setSelectedTextColor(selectedTextColor);
    }
  }, []);

  const handleTabChange = (newTab:any) => {
    setActiveTab(newTab);
    if (newTab !== "text") {
      setSelectedText(null);
    }
  };


  return (
    <div className="relative flex flex-col min-h-screen">
      <Toaster />
      <WhiteboardNav />
      <div className="flex-grow relative">
        <canvas ref={canvasRef} id="editingCanvas" className="w-full h-full" />
        {selectedText && activeTab === "text" && <TextProperties updateTextStyle={updateTextStyle} />}
      </div>
      <div className="fixed bottom-2.5 left-0 w-full flex items-center justify-center z-20">
        <Bottomfunc
          setShowPencilPalette={setShowPencilPalette}
          handlePencilSelect={handlePencilSelect}
          showPencilPalette={showPencilPalette}
          selectedText={selectedText}
          updateTextStyle={updateTextStyle}
          setTool={setTool}
          setFile={setFile}
          file={file}
          showShapes={showShapes}
          setShowShapes={setShowShapes}
          handleShapesSelect={handleShapeSelect}
          handleTextBoxColorChange={handleTextBoxColorChange}
          activeTab={activeTab}
          setActiveTab={handleTabChange}
        />
      </div>
      <div className="fixed bottom-2.5 right-2 flex items-end justify-end z-30">
        <div className="flex items-center justify-center bg-white gap-8 h-[2.5rem] rounded-[10px] shadow-md w-[12rem]">
          <div className="cursor-pointer" onClick={handleZoomOut}>
            <HiMagnifyingGlassMinus />
          </div>
          <span className="text-gray-500 text-sm">
            {Math.round(scale * 100)}%
          </span>
          <div className="cursor-pointer" onClick={handleZoomIn}>
            <HiMagnifyingGlassPlus />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhiteboardPage;
