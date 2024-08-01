// import { useEffect, useRef, useState } from 'react';
// import { fabric } from 'fabric';
// import socket from '../socket';

// const useCanvas = () => {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const [tool, setTool] = useState<string>('cursor');
//   const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
//   const [file, setFile] = useState<File | null>(null);

//   useEffect(() => {
//     if (canvas) return;

//     const canvasInstance = new fabric.Canvas("editingCanvas");
//     canvasInstance.setHeight(450);
//     canvasInstance.setWidth(420);

//     setCanvas(canvasInstance);

//     return () => {
//       canvasInstance.dispose();
//     };
//   }, []);

//   useEffect(() => {
//     if (!canvasRef.current) return;

//     const newCanvas = new fabric.Canvas(canvasRef.current);
//     setCanvas(newCanvas);

//     if (tool === 'pencil') {
//         newCanvas.isDrawingMode = true;
//       } else {
//         newCanvas.isDrawingMode = false;
//       }

//     newCanvas.on('mouse:up', () => {
//       if (tool === 'pencil') {
//         const data = newCanvas.toJSON();
//         socket.emit('drawing', data);
//       }
//     });

//     socket.on('drawing', (data) => {
//       newCanvas.loadFromJSON(data, () => {
//         newCanvas.renderAll();
//       });
//     });

//     newCanvas.on('mouse:move', (e) => {
//       if (tool === 'cursor') {
//         const pointer = newCanvas.getPointer(e.e);
//         socket.emit('cursor', pointer);
//       }
//     });

//     socket.on('cursor', (pointer) => {
//       // Update cursor position (you can implement a custom cursor if you want)
//     });

//     return () => {
//       socket.off('drawing');
//       socket.off('cursor');
//     };
//   }, [tool]);

//   useEffect(() => {
//     if (canvasRef.current) {
//       if (tool === 'pencil') {
//         canvasRef.current.style.cursor = 'crosshair';
//       } else {
//         canvasRef.current.style.cursor = 'default';
//       }
//     }
//   }, [tool]);

//   useEffect(() => {
//     if (file && canvas) {
//       const reader = new FileReader();
//       reader.onload = (f) => {
//         const data = f.target?.result as string;

//         fabric.Image.fromURL(data, (img) => {
//           if (!img.width || !img.height) {
//             console.error("Image width or height is undefined");
//             return;
//           }

//           const canvasWidth = canvas.getWidth();
//           const canvasHeight = canvas.getHeight();

//           const scaleX = canvasWidth / img.width;
//           const scaleY = canvasHeight / img.height;
//           const scale = Math.min(scaleX, scaleY) * 0.5;

//           const scaledWidth = img.width * scale;
//           const scaledHeight = img.height * scale;
//           const left = (canvasWidth - scaledWidth) / 2;
//           const top = canvasHeight * 0.25 - scaledHeight / 2;

//           img.set({
//             left,
//             top,
//             scaleX: scale,
//             scaleY: scale,
//             angle: 0,
//           });

//           canvas.add(img).renderAll();
//           canvas.setActiveObject(img);

//           document.addEventListener("keydown", (e) => {
//             if (e.key === "Delete" || e.key === "Backspace") {
//               const activeObject = canvas.getActiveObject();
//               if (activeObject) {
//                 canvas.remove(activeObject);

//               }
//             }
//           });
//         });
//       };
//       reader.readAsDataURL(file);
//     }
//   }, [file, canvas]);

//   return { canvasRef, setTool, setFile, file};
// };

// export default useCanvas;




import { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import socket from '../socket';

const useCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [tool, setTool] = useState<string>('cursor');
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (canvasRef.current && !canvas) {
      const canvasInstance = new fabric.Canvas(canvasRef.current);
      canvasInstance.setHeight(380);
      canvasInstance.setWidth(800);
      setCanvas(canvasInstance);

      return () => {
        canvasInstance.dispose();
      };
    }
  }, [canvasRef.current, canvas]);

  useEffect(() => {
    if (canvas) {
      if (tool === 'pencil') {
        canvas.isDrawingMode = true;
        canvas.freeDrawingBrush.color = 'black';
        canvas.freeDrawingBrush.width = 5;
      } else {
        canvas.isDrawingMode = false;
      }

      const handleMouseUp = () => {
        if (tool === 'pencil') {
          const data = canvas.toJSON();
          socket.emit('drawing', data);
        }
      };

      canvas.on('mouse:up', handleMouseUp);

      const handleMouseMove = (e:any) => {
        if (tool === 'cursor') {
          const pointer = canvas.getPointer(e.e);
          socket.emit('cursor', pointer);
        }
      };

      canvas.on('mouse:move', handleMouseMove);

      socket.on('drawing', (data) => {
        canvas.loadFromJSON(data, () => {
          canvas.renderAll();
        });
      });

      return () => {
        canvas.off('mouse:up', handleMouseUp);
        canvas.off('mouse:move', handleMouseMove);
        socket.off('drawing');
        socket.off('cursor');
      };
    }
  }, [canvas, tool]);

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.style.cursor = tool === 'pencil' ? 'crosshair' : 'default';
    }
  }, [tool]);

  useEffect(() => {
    if (file && canvas) {
      const reader = new FileReader();
      reader.onload = (f) => {
        const data = f.target?.result as string;
        if (data) {
          fabric.Image.fromURL(data, (img) => {
            if (!img.width || !img.height) {
              console.error("Image width or height is undefined");
              return;
            }

            const canvasWidth = canvas.getWidth();
            const canvasHeight = canvas.getHeight();
            const scaleX = canvasWidth / img.width;
            const scaleY = canvasHeight / img.height;
            const scale = Math.min(scaleX, scaleY) * 0.5;

            img.set({
              left: (canvasWidth - img.width * scale) / 2,
              top: (canvasHeight - img.height * scale) / 2,
              scaleX: scale,
              scaleY: scale,
              selectable: true,
              hasControls: true,
              hasBorders: true,
            });

            canvas.add(img).renderAll();
            canvas.setActiveObject(img);
          });
        }
      };
      reader.readAsDataURL(file);
    }
  }, [file, canvas]);

  return { canvasRef, setTool, setFile, file };
};

export default useCanvas;

//   useEffect(() => {
//     if (file && canvas) {
//       const reader = new FileReader();
//       reader.onload = (f) => {
//         const data = f.target?.result as string;

//         fabric.Image.fromURL(data, (img) => {
//           if (!img.width || !img.height) {
//             console.error("Image width or height is undefined");
//             return;
//           }

//           const canvasWidth = canvas.getWidth();
//           const canvasHeight = canvas.getHeight();

//           const scaleX = canvasWidth / img.width;
//           const scaleY = canvasHeight / img.height;
//           const scale = Math.min(scaleX, scaleY) * 0.5;

//           const scaledWidth = img.width * scale;
//           const scaledHeight = img.height * scale;
//           const left = (canvasWidth - scaledWidth) / 2;
//           const top = canvasHeight * 0.25 - scaledHeight / 2;

//           img.set({
//             left,
//             top,
//             scaleX: scale,
//             scaleY: scale,
//             angle: 0,
//             selectable: true,
//             hasControls: true,
//             hasBorders: true,
//           });

//           canvas.add(img).renderAll();
//           canvas.setActiveObject(img);

//           document.addEventListener("keydown", (e) => {
//             if (e.key === "Delete" || e.key === "Backspace") {
//               const activeObject = canvas.getActiveObject();
//               if (activeObject) {
//                 canvas.remove(activeObject);
//                 // Optionally, use a toast notification library to show success message
//                 // toast.success("Image deleted successfully");
//               }
//             }
//           });
//         });
//       };
//       reader.readAsDataURL(file);
//     }
//   }, [file, canvas]);
