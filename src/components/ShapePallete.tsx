import React from "react";
import { TbRectangleFilled } from "react-icons/tb";
import { TbTriangleFilled } from "react-icons/tb";
import { FaCircle } from "react-icons/fa";

interface ShapePaletteProps {
  onSelectShape: (shapeType: string) => void;
  handleTextBoxColorChange: (color: string) => void;
}

const shapes = [
  {
    id: "black",
    icon: <TbRectangleFilled size={24} color="blue" />,
    shapeType: "rectangle",
  },
  {
    id: "red",
    icon: <TbTriangleFilled size={24} color="blue" />,
    shapeType: "triangle",
  },
  { icon: <FaCircle size={24} color="blue" />, shapeType: "circle" },
];

const colors = ["red", "green", "blue", "yellow"];

const ShapePalette: React.FC<ShapePaletteProps> = ({
  onSelectShape,
  handleTextBoxColorChange,
}) => {
  return (
    <div className="flex items-center gap-8 bg-white rounded p-3 absolute -top-14 left-32">
      {shapes.map((shape, index) => (
        <div
          key={index}
          className={`cursor-pointer ${index === 5 && "text-yellow-600"}`}
          onClick={() => {
            onSelectShape(shape.shapeType);
          }}
        >
          <span>{shape.icon}</span>
        </div>
      ))}
      {/* <div className="flex gap-2 mt-2">
        {colors.map((color, index) => (
          <div
            key={index}
            className={`cursor-pointer w-8 h-8 rounded-full`} 
            style={{ backgroundColor: color }}
            onClick={() => handleTextBoxColorChange(color)}
          />
        ))}
      </div> */}
    </div>
  );
};

export default ShapePalette;
