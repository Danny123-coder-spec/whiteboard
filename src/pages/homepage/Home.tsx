import React, { useState } from "react";
import HomeNav from "../../components/nav/Navbar";
import WhiteboardCard from "../../components/WhiteboardCard";
import { useNavigate } from "react-router-dom";
import { PiDotsThree } from "react-icons/pi";
import WhiteboardActions from "../../components/WhiteboardActions"; // Adjust the import based on your file structure

interface Whiteboard {
  id: number;
  title: string;
  content: string;
  timestamp: number;
}

const Home = () => {
  const [whiteboards, setWhiteboards] = useState<Whiteboard[]>(() => {
    const savedWhiteboards = localStorage.getItem("whiteboards");
    return savedWhiteboards ? JSON.parse(savedWhiteboards) : [];
  });
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleCreateNewWhiteboard = () => {
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

  //   const handleRenameWhiteboard = (id: number, newTitle: string) => {
  //     const updatedWhiteboards = whiteboards.map((wb) => {
  //       if (wb.id === id) {
  //         return { ...wb, title: newTitle };
  //       }
  //       return wb;
  //     });
  //     setWhiteboards(updatedWhiteboards);
  //     localStorage.setItem("whiteboards", JSON.stringify(updatedWhiteboards));
  //     setOpenDropdownId(null);
  //   };

  const handleDeleteWhiteboard = (id: number) => {
    const updatedWhiteboards = whiteboards.filter((wb) => wb.id !== id);
    setWhiteboards(updatedWhiteboards);
    localStorage.setItem("whiteboards", JSON.stringify(updatedWhiteboards));
    setOpenDropdownId(null);
  };

  const toggleDropdown = (id: number) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  //   const sortedWhiteboards = [...whiteboards].sort(
  //     (a, b) => b.timestamp - a.timestamp
  //   );

  return (
    <>
      <section className="min-h-screen w-full">
        <HomeNav />
        <div className="flex flex-col gap-5 mx-32 mt-5">
          <div className="flex flex-wrap gap-5">
            <WhiteboardCard
              text="New Whiteboard"
              handleClickWhiteCard={handleCreateNewWhiteboard}

            />
            {whiteboards.map((whiteboard) => (
              <div
                key={whiteboard.id}
                className="relative bg-white border-slate-500 shadow-sm h-[12rem] w-[15rem] rounded-[14px] "
              >
                <div className="h-[75%] w-full border-b-[0.5px] border-slate-500">
                  <img src="" alt="" />
                </div>
                <div className="flex items-center justify-between px-3 p-2">
                  <div className="flex flex-col items-start">
                    <span className="text-sm text-slate-900 ">
                      {whiteboard.title}
                    </span>
                    <span className="text-[10px] text-slate-900">
                      {new Date(
                        Number(whiteboard.timestamp)
                      ).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="relative">
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
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
