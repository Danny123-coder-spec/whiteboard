
import { useEffect, useState } from "react";
import HomeNav from "../../components/nav/Navbar";
import WhiteboardCard from "../../components/WhiteboardCard";
import { Link, useNavigate } from "react-router-dom";
import { PiDotsThree } from "react-icons/pi";
import WhiteboardActions from "../../components/WhiteboardActions";
import { useUser } from "@clerk/clerk-react";

interface Whiteboard {
  id: number;
  title: string;
  content: string;
  timestamp: number;
}

const Home = () => {

  const { user } = useUser();
  const [whiteboards, setWhiteboards] = useState<Whiteboard[]>(() => {
    const savedWhiteboards = localStorage.getItem("whiteboards");
    return savedWhiteboards ? JSON.parse(savedWhiteboards) : [];
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const navigate = useNavigate();


  const handleCreateNewWhiteboard = () => {
    if (!user) {
      navigate('/sign-in');
      return;
    }
    const newWhiteboard: Whiteboard = {
      id: whiteboards.length + 1,
      title: "Untitled",
      content: "",
      timestamp: Date.now(),
    };
    const updatedWhiteboards = [...whiteboards, newWhiteboard];
    setWhiteboards(updatedWhiteboards);
    localStorage.setItem("whiteboards", JSON.stringify(updatedWhiteboards));
    navigate(`/whiteboard/${newWhiteboard.id}`);
  };

  const handleRenameWhiteboard = (id: number, newTitle: string) => {
    const updatedWhiteboards = whiteboards.map((wb) => {
      if (wb.id === id) {
        return { ...wb, title: newTitle };
      }
      return wb;
    });
    setWhiteboards(updatedWhiteboards);
    localStorage.setItem("whiteboards", JSON.stringify(updatedWhiteboards));
    setOpenDropdownId(null);
  };

  const handleDeleteWhiteboard = (id: number) => {
    const updatedWhiteboards = whiteboards.filter((wb) => wb.id !== id);
    setWhiteboards(updatedWhiteboards);
    localStorage.setItem("whiteboards", JSON.stringify(updatedWhiteboards));
    setOpenDropdownId(null);
  };

  const toggleDropdown = (id: number) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  return (
    <>
      <section className="min-h-screen w-full">
        <HomeNav />
        <div className="flex flex-col gap-5 lg:mx-32 lg:items-start items-center lg:justify-start justify-center mt-5">
          <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-2 gap-5">
            <WhiteboardCard
              text="New Whiteboard"
              handleClickWhiteCard={handleCreateNewWhiteboard}
            />
            {whiteboards.map((whiteboard) => {
              const screenshot = localStorage.getItem(
                `whiteboard-${whiteboard.id}-screenshot`
              );
              return (
                <div
                  key={whiteboard.id}
                  className="relative bg-white border shadow-sm h-[12rem] w-[15rem] rounded-[14px] "
                >
                  <Link to={`/whiteboard/${whiteboard.id}`}>
                    <div className="h-[75%] w-full border-b-[0.5px] border-slate-500">
                      {screenshot ? (
                        <img src={screenshot} alt="whiteboard preview" />
                      ) : (
                        <div className="h-full w-full bg-gray-200 rounded-t-[14px]" />
                      )}
                    </div>
                  </Link>
                  <div className="flex items-center justify-between px-3 p-2">
                    <div className="flex flex-col items-start">
                      <span className="text-sm w-[7rem] truncate font-medium text-slate-900 ">
                        {whiteboard.title}
                      </span>
                      <div className="flex items-center gap-1 text-gray-500">
                        <span className="text-[12px]">Edited:</span>
                        <span className="text-[12px]">
                          {new Date(
                            Number(whiteboard.timestamp)
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="">
                      <PiDotsThree
                        size={24}
                        className="text-slate-900 cursor-pointer"
                        onClick={() => toggleDropdown(whiteboard.id)}
                      />

                      {openDropdownId === whiteboard.id && (
                        <WhiteboardActions
                          onRename={(newTitle) =>
                            handleRenameWhiteboard(whiteboard.id, newTitle)
                          }
                          onDelete={() => handleDeleteWhiteboard(whiteboard.id)}
                          setIsOpen={setIsOpen}
                          isOpen={isOpen}
                          isOpenDelete={isOpenDelete}
                          setIsOpenDelete={setIsOpenDelete}
                        />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

