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
  const [showShapes, setShowShapes] = useState(false);

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

      // canvas.current.on("selection:created", (e) => {
      //   handleObjectSelection(e);
      //   if (e.target && e.target.type === "textbox") {
      //     setSelectedText(e.target as fabric.Text);
      //   } else {
      //     setSelectedText(null);
      //   }
      // });

      // canvas.current.on("selection:updated", (e) => {
      //   if (e.target && e.target.type === "textbox") {
      //     setSelectedText(e.target as fabric.Text);
      //   } else {
      //     setSelectedText(null);
      //   }
      //   handleObjectSelection(e);
      // });

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
  
  const handleToolChange = (tool: string, shapeType?: string) => {
    const canvasInstance = canvas.current;
    if (!canvasInstance) return;
  
    switch (tool) {
      case "pencil":
        setShowPencilPalette(true);
        break;
      // case "text":
      //   const text = new fabric.Textbox("Write Your Text Here", {
      //     left: 550,
      //     top: 150,
      //     width: 200,
      //     fontSize: 20,
      //   });
      //   canvasInstance.add(text);
      //   break;
      case "shapes":
        setShowShapes(true); 
        break;
      case "image":
        if (file) {
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
  
              canvasInstance.add(img).renderAll();
              canvasInstance.setActiveObject(img);
            });
          };
          reader.readAsDataURL(file);
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
  

  const addText = (text: string, options: any = {}) => {
    const canvasInstance = canvas.current;
    if (!canvasInstance) return;
  
    // Create a new Textbox object with the given text and options
    const textObj = new fabric.Textbox(text || "Write Your Text Here", {
      left: 150,
      top: 100,
      width: 150,
      fontSize: 20,
      ...options,
    });
  
    // Set control visibility for resizing and rotating
    textObj.setControlsVisibility({
      mtr: false,
      bl: true,   
      br: true,   
      tl: true,
      tr: true, 
      ml: true,   
      mr: true, 
      mt: true,  
      mb: true, 
    });
  
    canvasInstance.on("selection:created", (e) => {
      const selectedObjects = e.selected;
      if (selectedObjects && selectedObjects.length > 0) {
        const activeObject = selectedObjects[0];
        if (activeObject.type === "textbox") {
          setSelectedText(activeObject as fabric.Textbox);
        } else {
          setSelectedText(null);
        }
      }
    });
  
    canvasInstance.on("selection:cleared", () => {
      setSelectedText(null);
    });
  
    canvasInstance.on("selection:updated", (e) => {
      const selectedObjects = e.selected;
      if (selectedObjects && selectedObjects.length > 0) {
        const activeObject = selectedObjects[0];
        if (activeObject.type === "textbox") {
          setSelectedText(activeObject as fabric.Textbox);
        } else {
          setSelectedText(null);
        }
      }
    });
  

    canvasInstance.add(textObj);
    canvasInstance.setActiveObject(textObj);
    setSelectedText(textObj); 
    canvasInstance.renderAll();
  };
  

  
  const handlePencilSelect = (color: string, width: number) => {
    const canvasInstance = canvas.current;
    if (!canvasInstance) return;

    canvasInstance.isDrawingMode = true;
    canvasInstance.freeDrawingBrush.color = color;
    canvasInstance.freeDrawingBrush.width = width;
    setShowPencilPalette(false);
  };



  
  const handleShapeSelect = (shapeType: string) => {
    const canvasInstance = canvas.current;
    if (!canvasInstance) return;
  
    let shape;
    let textbox;
    const commonTextboxProps = {
      fontSize: 20,
      textAlign: "center",
      editable: true,
      selectable: true,
      fill: "white", 
    };
  
    switch (shapeType) {
      case "rectangle":
        shape = new fabric.Rect({
          left: 550,
          top: 100,
          width: 200,
          height: 100,
          fill: "red",
          selectable: true, 
        });
  
        textbox = new fabric.Textbox("Write here", {
          left: 550,
          top: 100 + (100 / 4), 
          width: 200,
          backgroundColor: "transparent",
          ...commonTextboxProps,
        });
        break;
  
      case "circle":
        shape = new fabric.Circle({
          left: 550,
          top: 100,
          radius: 100, // Circle shape
          fill: "blue", // Circle color
          selectable: true,
        });
  
        textbox = new fabric.Textbox("Write here", {
          left: 550,
          top: 150, // Adjust to center the text within the circle
          width: 200,
          backgroundColor: "transparent",
          ...commonTextboxProps,
        });
        break;
  
      case "triangle":
        shape = new fabric.Triangle({
          left: 550,
          top: 100,
          width: 200,
          height: 150, // Triangle shape
          fill: "green", // Triangle color
          selectable: true,
        });
  
        textbox = new fabric.Textbox("Write here", {
          left: 550,
          top: 130, // Adjust to center the text within the triangle
          width: 200,
          backgroundColor: "transparent",
          ...commonTextboxProps,
        });
        break;
  
      default:
        console.error("Unknown shape type");
        return;
    }
  

    canvasInstance.add(shape);
    canvasInstance.add(textbox);
    canvasInstance.setActiveObject(textbox);
    canvasInstance.renderAll();
    setShowShapes(false)
  };
  

  
  


  const handleTextBoxColorChange = (color: string) => {
    const canvasInstance = canvas.current;
    const activeObject = canvasInstance?.getActiveObject();
  
    if (!activeObject || !(activeObject instanceof fabric.Group)) return;
  
    // Get the Textbox from the Group
    const textbox = activeObject._objects.find(
      (obj) => obj.type === "textbox"
    ) as fabric.Textbox;
  
    if (textbox) {
      textbox.set({ fill: color });
      canvasInstance?.renderAll();
    }
  };
  
  const handleTextFormatting = (option: string) => {
    const canvasInstance = canvas.current;
    const activeObject = canvasInstance?.getActiveObject();
  
    if (!activeObject || !(activeObject instanceof fabric.Group)) return;
  
    // Get the Textbox from the Group
    const textbox = activeObject._objects.find(
      (obj) => obj.type === "textbox"
    ) as fabric.Textbox;
  
    if (!textbox) return;
  
    switch (option) {
      case "bold":
        textbox.set({
          fontWeight: textbox.fontWeight === "bold" ? "normal" : "bold",
        });
        break;
      case "italic":
        textbox.set({
          fontStyle: textbox.fontStyle === "italic" ? "normal" : "italic",
        });
        break;
      default:
        console.error("Unknown formatting option");
        return;
    }
  
    canvasInstance?.renderAll();
  };
  
  

  // Adding image to the canvas



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
    addText,
    updateTextStyle,
    handlePencilSelect,
    showPencilPalette,
    setShowPencilPalette,
    showShapes,
    setShowShapes,
    handleShapeSelect,
    handleTextBoxColorChange,
    handleTextFormatting,
    setSelectedText,
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