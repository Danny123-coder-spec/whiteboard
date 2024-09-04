
"use client";

import React, { useState } from "react";
import { IoColorPaletteOutline } from "react-icons/io5";
import { GrFormCheckmark } from "react-icons/gr";
import { AiOutlineDelete } from "react-icons/ai";
// import { Tooltip } from "react-tooltip";
import { MdOutlineContentCopy } from "react-icons/md";
import { PiTextUnderline } from "react-icons/pi";
import { PiTextItalic } from "react-icons/pi";
import { PiTextB } from "react-icons/pi";
// import { MdOutlineTextFields } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/colordropdown";
import { textSideData } from "../lib/Properties";


interface TextPropertiesProps {
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

const TextProperties = ({ updateTextStyle }: TextPropertiesProps) => {
  const [selectedTextColor, setSelectedTextColor] = useState<string>("");

  const [selectedStrokeColor, setSelectedStrokeColor] = useState<string | null>(
    null
  );

  const handleColorSelect = (color: string) => {
    setSelectedTextColor(color);
    updateTextStyle("color", color);
 
  };

  const handleStrokeColorSelect = (color: string) => {
    if (selectedStrokeColor === color) {
      setSelectedStrokeColor(null);
      updateTextStyle("stroke", undefined);
    } else {
      setSelectedStrokeColor(color);
      updateTextStyle("stroke", color);
    }
  };

  return (
    <>
      <div className="absolute top-[4rem] left-[4rem] flex items-center justify-between z-40 p-2 w-[20rem] bg-white shadow-md rounded-md">
        <button
          onClick={() => updateTextStyle("bold")}
          className="font-bold"
          data-tooltip-id="tooltip"
          data-tooltip-content="Bold"
        >
          <PiTextB size={20} />
        </button>
        <button
          onClick={() => updateTextStyle("italic")}
          className="italic"
          data-tooltip-id="tooltip"
          data-tooltip-content="Italics"
        >
          <PiTextItalic size={20} />
        </button>
        <button
          onClick={() => updateTextStyle("underline")}
          className="underline"
          data-tooltip-id="tooltip"
          data-tooltip-content="Underline"
        >
          <PiTextUnderline size={20} />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger
            data-tooltip-id="tooltip"
            data-tooltip-content="Choose color"
            className="cursor-pointer"
            data-tip="Text Color"
          >
            <IoColorPaletteOutline size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="">
            <div className="grid grid-cols-8 gap-4 p-1.5">
              {textSideData.map((color, index) => (
                <div
                  data-tooltip-id="tooltip"
                  data-tooltip-content={color}
                  key={index}
                  onClick={() => handleColorSelect(color)}
                  style={{
                    backgroundColor: color,
                    width: "15px",
                    height: "15px",
                    borderRadius: "16px",
                    display: "block",
                    position: "relative",
                    zIndex: 10,
                    cursor: "pointer",
                    border:
                      selectedTextColor === color ? "2px solid #ccc" : "none",
                  }}
                >
                  {selectedTextColor === color && (
                    <div className="flex items-center justify-center font-bold">
                      <GrFormCheckmark
                        size={18}
                        color="white"
                        className="font-bold pb-1"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* <DropdownMenu>
          <DropdownMenuTrigger
            data-tooltip-id="tooltip"
            data-tooltip-content="Choose Stroke Color"
            className="cursor-pointer"
            data-tip="Stroke Color"
          >
            <MdOutlineTextFields size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="">
            <div className="grid grid-cols-8 gap-4 p-1.5">
              {textSideData.map((color, index) => (
                <div
                  key={index}
                  onClick={() => handleStrokeColorSelect(color)}
                  style={{
                    backgroundColor: color,
                    width: "15px",
                    height: "15px",
                    borderRadius: "16px",
                    display: "block",
                    position: "relative",
                    zIndex: 10,
                    cursor: "pointer",
                    border:
                      selectedStrokeColor === color ? "2px solid #ccc" : "none",
                  }}
                >
                  {selectedStrokeColor === color && (
                    <div className="flex items-center justify-center font-bold">
                      <GrFormCheckmark
                        size={18}
                        color="white"
                        className="font-bold pb-1"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu> */}

        <button
          onClick={() => updateTextStyle("delete")}
          className="delete cursor-pointer"
          data-tooltip-id="tooltip"
          data-tooltip-content="Delete Text"
        >
          <AiOutlineDelete size={20} />
        </button>
        <button
          onClick={() => updateTextStyle("copy")}
          className="cursor-pointer"
          data-tooltip-id="tooltip"
          data-tooltip-content="Copy Text"
        >
          <MdOutlineContentCopy size={20} />
        </button>
      </div>
    </>
  );
};

export default TextProperties;
