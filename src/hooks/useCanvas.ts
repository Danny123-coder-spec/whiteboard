// "use client";

// import { useEffect, useRef, useState } from "react";
// import { fabric } from "fabric";
// import io from "socket.io-client";

// const socket = io("http://localhost:4000"); // Replace with your server URL

// interface ProductIdProps {
//   productId: string;
//   active: string;
//   shirtColor: string;
// }

// const useCanvas = () => {
//   const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
//   const [selectedText, setSelectedText] = useState<fabric.Text | null>(null);
//   const [shirtImage, setShirtImage] = useState<fabric.Image | null>(null);

//   const canvasRef = useRef<HTMLCanvasElement | null>(null);

//   useEffect(() => {
//     if (canvas) return;

//     const canvasInstance = new fabric.Canvas("editingCanvas");
//     canvasInstance.setHeight(450);
//     canvasInstance.setWidth(420);

//     setCanvas(canvasInstance);

//     // Set up Socket.IO listeners
//     socket.on("addImage", (data) => {
//       addImageFromUrl(data.url, data.opts, false);
//     });

//     socket.on("addText", (data) => {
//       addText(data, false);
//     });

//     socket.on("clearCanvas", () => {
//       clearCanvas(false);
//     });

//     return () => {
//       canvasInstance.dispose();
//       socket.off("addImage");
//       socket.off("addText");
//       socket.off("clearCanvas");
//     };
//   }, [canvas]);

//   const addImage = ({
//     shirt,
//     shirtColor,
//     trimColor,
//   }: {
//     shirt: string;
//     shirtColor?: string;
//     trimColor?: string;
//   }) => {
//     if (!canvas) return;

//     const imgOpts = {
//       top: 0,
//       left: 10,
//       selectable: false,
//     };

//     const imgElement = document.createElement("img");
//     imgElement.crossOrigin = "anonymous";

//     imgElement.src = `/images/shirts/${shirt}`;

//     imgElement.onload = function () {
//       const newShirtImage = new fabric.Image(imgElement, {
//         ...imgOpts,
//         scaleX: 429 / imgElement.width,
//         scaleY: 450 / imgElement.height,
//       });

//       if (shirtColor) {
//         newShirtImage.filters?.push(
//           new fabric.Image.filters.BlendColor({
//             color: shirtColor,
//           })
//         );
//       }
//       newShirtImage.applyFilters();

//       if (shirtImage) {
//         canvas.remove(shirtImage);
//       }

//       setShirtImage(newShirtImage);
//       canvas.add(newShirtImage);
//       canvas.sendToBack(newShirtImage);
//       canvas.renderAll();

//       // Emit event to other users
//       socket.emit("addImage", { url: imgElement.src, opts: imgOpts });
//     };
//   };

//   const addImageFromFile = (file: File) => {
//     if (!canvas) return;
//     const reader = new FileReader();
//     reader.onload = (f) => {
//       const data = f.target?.result as string;

//       fabric.Image.fromURL(data as string, (img: any) => {
//         if (!img.width || !img.height) {
//           console.error("Image width or height is undefined");
//           return;
//         }

//         const canvasWidth = canvas.getWidth();
//         const canvasHeight = canvas.getHeight();

//         const scaleX = canvasWidth / img.width;
//         const scaleY = canvasHeight / img.height;
//         const scale = Math.min(scaleX, scaleY) * 0.3;

//         const scaledWidth = img.width * scale;
//         const scaledHeight = img.height * scale;
//         const left = (canvasWidth - scaledWidth) / 2;
//         const top = canvasHeight * 0.25 - scaledHeight / 2;

//         img.set({
//           left,
//           top,
//           scaleX: scale,
//           scaleY: scale,
//           angle: 0,
//         });

//         canvas.add(img).renderAll();
//         canvas.setActiveObject(img);

//         // Emit event to other users
//         socket.emit("addImage", { url: data, opts: { left, top, scaleX: scale, scaleY: scale, angle: 0 } });

//         document.addEventListener("keydown", (e) => {
//           if (e.key === "Delete" || e.key === "Backspace") {
//             const activeObject = canvas?.getActiveObject();
//             if (activeObject) {
//               canvas?.remove(activeObject);
//             }
//           }
//         });
//       });
//     };
//     reader.readAsDataURL(file);
//   };

//   const addImageFromUrl = (url: string, opts: any = {}, emit = true) => {
//     if (!canvas) return;

//     fabric.Image.fromURL(url, (img: any) => {
//       if (!img.width || !img.height) {
//         console.error("Image width or height is undefined");
//         return;
//       }

//       const canvasWidth = canvas.getWidth();
//       const canvasHeight = canvas.getHeight();
//       const scaleX = canvasWidth / img.width;
//       const scaleY = canvasHeight / img.height;
//       const scale = Math.min(scaleX, scaleY) * 0.3;

//       const scaledWidth = img.width * scale;
//       const scaledHeight = img.height * scale;
//       const left = (canvasWidth - scaledWidth) / 2;
//       const top = canvasHeight * 0.25 - scaledHeight / 2;

//       img.set({
//         ...opts,
//         left,
//         top,
//         scaleX: scale,
//         scaleY: scale,
//         angle: 0,
//       });

//       canvas.add(img).renderAll();
//       canvas.setActiveObject(img);

//       // Emit event to other users if not already emitted
//       if (emit) {
//         socket.emit("addImage", { url, opts });
//       }
//     });
//   };

//   const addText = ({ textName, textColor, size }: { textName: string; textColor: string; size: number }, emit = true) => {
//     const obj = new fabric.Text(textName, {
//       top: 110,
//       left: 160,
//       fill: textColor || "black",
//       fontSize: size,
//     });

//     obj.setControlsVisibility({
//       mt: false,
//       mb: false,
//       ml: false,
//       mr: false,
//       bl: false,
//       br: false,
//       tl: false,
//       tr: false,
//     });

//     canvas?.add(obj);
//     canvas?.setActiveObject(obj);

//     canvas?.on("mouse:down", (options: any) => {
//       if (options.target && options.target.type === "text") {
//         setSelectedText(options.target as fabric.Text);
//       } else {
//         setSelectedText(null);
//       }
//     });

//     // Emit event to other users if not already emitted
//     if (emit) {
//       socket.emit("addText", { textName, textColor, size });
//     }
//   };

//   const updateText = ({ textName, textColor, size }: { textName: string; textColor: string; size: number }) => {
//     if (selectedText) {
//       selectedText.set({
//         text: textName,
//         fill: textColor,
//         fontSize: size,
//       });
//       canvas?.renderAll();
//     }
//   };

//   const clearCanvas = (emit = true) => {
//     if (canvas) {
//       if (shirtImage) {
//         canvas.remove(shirtImage);
//         setShirtImage(null);
//         canvas.renderAll();
//       } else {
//         canvas.clear();
//       }
//     }

//     // Emit event to other users if not already emitted
//     if (emit) {
//       socket.emit("clearCanvas");
//     }
//   };

//   return {
//     addImage,
//     addImageFromFile,
//     addImageFromUrl,
//     addText,
//     updateText,
//     clearCanvas,
//   };
// };

// export default useCanvas;
