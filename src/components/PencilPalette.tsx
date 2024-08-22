import { AiOutlineClose } from "react-icons/ai";
import { FaPencilAlt } from "react-icons/fa";

interface PencilPaletteProps{
  showPencilPalette:boolean;
  onSelectPencil:(color:string, width:number)=> void;
}

const PencilPalette = ({onSelectPencil}:PencilPaletteProps) => {
  const pencils = [
    {
      icon: <FaPencilAlt size={24} color="black" />,
      color: "black",
      width: 3.5,
    },
    { icon: <FaPencilAlt size={24} color="red" />, color: "red", width: 2.5 },
    { icon: <FaPencilAlt size={24} color="blue" />, color: "blue", width: 3.5 },
    {
      icon: <FaPencilAlt size={24} color="green" />,
      color: "green",
      width: 3.5,
    },
    {
      icon: <FaPencilAlt size={24} color="purple" />,
      color: "purple",
      width: 3.5,
    },
  ];

  return (
    <div
      className="flex items-center gap-5 bg-white rounded p-3"
      style={{ position: "absolute", top: 3, left: 0 }}
    >
      {pencils.map((pencil, index) => (
        <div
          key={index}
          onClick={() => onSelectPencil(pencil.color, pencil.width)}
        >
          <span>{pencil.icon}</span>
        </div>
      ))}

      <div className="">
        <AiOutlineClose size={20}/>
      </div>
    </div>
  );
};

export default PencilPalette;
