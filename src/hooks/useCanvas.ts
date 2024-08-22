import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import socket from "../socket";

const useCanvas = (whiteboardId: number) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [index, setIndex] = useState<number>(0);
  const [scale, setScale] = useState<number>(1);
  const [file, setFile] = useState<File | null>(null);
  const canvas = useRef<fabric.Canvas | null>(null);
  const [selectedText, setSelectedText] = useState<fabric.Text | null>(null);
  const [showTextProperties, setShowTextProperties] = useState<boolean>(false);
  const [showPencilPalette, setShowPencilPalette] = useState(false);

  const saveCanvasScreenshot = (
    canvas: fabric.Canvas,
    whiteboardId: number
  ) => {
    console.log("Saving screenshot for whiteboardId:", whiteboardId);
    if (isNaN(whiteboardId)) {
      console.error("Invalid whiteboardId:", whiteboardId);
      return;
    }

    const dataUrl = canvas.toDataURL({
      format: "png",
      multiplier: 0.5,
    });
    localStorage.setItem(`whiteboard-${whiteboardId}-screenshot`, dataUrl);
  };

  const updateHistory = () => {
    if (canvas.current) {
      const json = canvas.current.toJSON();
      const newHistory = [...history.slice(0, index + 1), json];
      setHistory(newHistory);
      setIndex(newHistory.length - 1);
      socket.emit("canvas-data", json);
      localStorage.setItem(`whiteboard-${whiteboardId}`, JSON.stringify(json));
      saveCanvasScreenshot(canvas.current, whiteboardId);
    }
  };

  useEffect(() => {
    if (canvasRef.current) {
      canvas.current = new fabric.Canvas(canvasRef.current);
      canvas.current.setHeight(580);
      canvas.current.setWidth(1280);
      canvas.current.renderAll();
      const savedCanvasState = localStorage.getItem(
        `whiteboard-${whiteboardId}`
      );
      if (savedCanvasState) {
        canvas.current.loadFromJSON(
          JSON.parse(savedCanvasState),
          canvas.current.renderAll.bind(canvas.current)
        );
      }

      canvas.current.on("object:added", updateHistory);
      canvas.current.on("object:modified", updateHistory);
      canvas.current.on("object:removed", updateHistory);

      socket.on("canvas-data", (data: any) => {
        if (canvas.current) {
          canvas.current.loadFromJSON(
            data,
            canvas.current.renderAll.bind(canvas.current)
          );
        }
      });

      canvas.current.on("selection:created", (e) => {
        handleObjectSelection(e);
        // if (e.target && e.target.type === "textbox") {
        //   setSelectedText(e.target as fabric.Text);
        // } else {
        //   setSelectedText(null);
        // }
      });

      canvas.current.on("selection:updated", (e) => {
        // if (e.target && e.target.type === "textbox") {
        //   setSelectedText(e.target as fabric.Text);
        // } else {
        //   setSelectedText(null);
        // }
        handleObjectSelection(e);
      });

      canvas.current.on("selection:cleared", () => {
        setSelectedText(null);
        setShowTextProperties(false);
      });

      return () => {
        if (canvas.current) {
          canvas.current.dispose();
        }
      };
    }
  }, [whiteboardId]);

  const handleObjectSelection = (e: fabric.IEvent) => {
    const selectedObject = e.target;
  
    if (selectedObject && selectedObject.type === "textbox") {
      setSelectedText(selectedObject as fabric.Text);
      setShowTextProperties(true);
    } else if (selectedObject && selectedObject.type === "image") {
      setShowTextProperties(false);
      // Handle image selection if needed
    } else {
      setSelectedText(null);
      setShowTextProperties(false);
    }
  };
  

  const handleToolChange = (tool: string) => {
    const canvasInstance = canvas.current;
    if (!canvasInstance) return;

    switch (tool) {
      case "pencil":
        setShowPencilPalette(true);
        break;
      case "text":
        const text = new fabric.Textbox("Write Your Text Here", {
          left: 100,
          top: 100,
          width: 200,
          fontSize: 20,
        });
        canvasInstance.add(text);
        break;
      case "shapes":
        const rect = new fabric.Rect({
          left: 100,
          top: 100,
          fill: "red",
          width: 100,
          height: 100,
        });
        canvasInstance.add(rect);
        break;
      
      case "image":
        if(file){
          if (!canvas) return;
        const reader = new FileReader();
        reader.onload = (f) => {
          const data = f.target?.result as string;

          fabric.Image.fromURL(data as string, (img) => {
            if (!img.width || !img.height) {
              console.error("Image width or height is undefined");
              return;
            }
            img.set({
              left: 100,
              top: 100,

              angle: 0,
            });

            canvas.current?.add(img).renderAll();
            canvas.current?.setActiveObject(img);
          });
        };
        reader.readAsDataURL(file)
        }
        break;
      case "undo":
        if (index > 0) {
          const previous = history[index - 1];
          canvasInstance.loadFromJSON(
            previous,
            canvasInstance.renderAll.bind(canvasInstance)
          );
          setIndex(index - 1);
          socket.emit("canvas-data", previous);
        }
        break;
      default:
        canvasInstance.isDrawingMode = false;
    }
  };

  const handlePencilSelect = (color: string, width: number) => {
    const canvasInstance = canvas.current;
    if (!canvasInstance) return;

    canvasInstance.isDrawingMode = true;
    canvasInstance.freeDrawingBrush.color = color;
    canvasInstance.freeDrawingBrush.width = width;
    setShowPencilPalette(false);
  };

  // Adding image to the canvas

  const addImageFromFile = (file: File) => {
    if (!canvas) return;
    const reader = new FileReader();
    reader.onload = (f) => {
      const data = f.target?.result as string;

      fabric.Image.fromURL(data as string, (img) => {
        if (!img.width || !img.height) {
          console.error("Image width or height is undefined");
          return;
        }
        img.set({
          left: 100,
          top: 100,

          angle: 0,
        });

        canvas.current?.add(img).renderAll();
        canvas.current?.setActiveObject(img);
      });
    };
    reader.readAsDataURL(file);
  };

  const handleZoomIn = () => {
    const canvasInstance = canvas.current;
    if (!canvasInstance) return;

    const newScale = scale + 0.1;
    setScale(newScale);
    canvasInstance.setZoom(newScale);
  };

  const handleZoomOut = () => {
    const canvasInstance = canvas.current;
    if (!canvasInstance) return;

    const newScale = scale - 0.1;
    setScale(newScale);
    canvasInstance.setZoom(newScale);
  };

  const updateTextStyle = (
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
  ) => {
    if (!selectedText || !canvas) return;

    switch (styleType) {
      case "bold":
        selectedText.set(
          "fontWeight",
          selectedText.fontWeight === "bold" ? "normal" : "bold"
        );
        break;
      case "italic":
        selectedText.set(
          "fontStyle",
          selectedText.fontStyle === "italic" ? "normal" : "italic"
        );
        break;
      case "underline":
        const isUnderlined = !selectedText.underline;
        selectedText.set("underline", isUnderlined);

        if (isUnderlined) {
          selectedText.set("stroke", selectedText.fill as string);
          selectedText.set("strokeWidth", 0);
        } else {
          selectedText.set("stroke", null as any);
        }
        break;
      case "color":
        if (value) {
          selectedText.set("fill", value);
          if (selectedText.underline) {
            selectedText.set("stroke", value);
          }
        }
        break;
      case "delete":
        canvas.current?.remove(selectedText);
        break;
      case "copy":
        selectedText.clone((clonedText: fabric.Text) => {
          clonedText.set({
            left: selectedText.left! + 20,
            top: selectedText.top! + 20,
          });
          canvas.current?.add(clonedText);
        });
        break;
      case "stroke":
        if (styleType === "stroke") {
          if (selectedText) {
            selectedText.set({ stroke: value, strokeWidth: 1 });
            canvas.current?.renderAll();
          }
        }
        // if (value) {
        //   selectedText.set("stroke", value);
        //   selectedText.set("strokeWidth", strokeWidth || 1);
        // }
        break;
      default:
        break;
    }

    canvas.current?.renderAll();
  };

  return {
    canvasRef,
    setTool: handleToolChange,
    setFile,
    handleZoomIn,
    handleZoomOut,
    scale,
    file,
    selectedText,
    updateTextStyle,
    handlePencilSelect,
    showPencilPalette,
    setShowPencilPalette,
  };
};

export default useCanvas;

// case 'image':
      //   if (file) {
      //     const reader = new FileReader();
      //     reader.onload = (e) => {
      //       const imgObj = new Image();
      //       imgObj.src = e.target!.result as string;
      //       imgObj.onload = () => {
      //         const img = new fabric.Image(imgObj);
      //         img.scaleToWidth(100);
      //         canvasInstance.add(img);
      //         socket.emit('canvas-data', canvasInstance.toJSON());
      //       };
      //     };
      //     reader.readAsDataURL(file);
      //   }
      //   break;