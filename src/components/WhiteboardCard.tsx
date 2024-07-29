import { GoPlus } from "react-icons/go";

interface WhiteCardProps {
  text: string;
  handleClickWhiteCard: () => void;
}

const WhiteboardCard = ({ text, handleClickWhiteCard }: WhiteCardProps) => {
  return (
    <div
      onClick={handleClickWhiteCard}
      className="p-3 bg-blue-700 hover:bg-blue-600 transition-all ease-in-out w-[15rem] h-[12rem] rounded-lg shadow-md hover:shadow-lg  duration-300 cursor-pointer flex items-center justify-center"
      style={{ borderRadius: "14px" }}
    >
      <div className="flex flex-col items-center jsutify-center">
        <div className="p-3 bg-white rounded-full">
          <GoPlus size={36} className=""/>
        </div>
        <h3 className="text-white pt-3">{text}</h3>
      </div>
    </div>
  );
};

export default WhiteboardCard;
