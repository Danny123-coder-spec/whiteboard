import { FiUser } from "react-icons/fi";
import { CiSettings } from "react-icons/ci";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../ui/profiledropdown";
import { Link } from "react-router-dom";
import { SignedIn, UserButton, useUser } from "@clerk/clerk-react";

const HomeNav = () => {
  const { user } = useUser();
  return (
    <div className="bg-white p-3 h-[3rem] w-full flex items-start justify-end">
      <div className="flex items-center gap-10">
        {user ? (
          <SignedIn>
            <UserButton />
          </SignedIn>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer">
              <FiUser size={24} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col items-start">
              <Link
                to="/sign-in"
                type="button"
                className={`text-white bg-blue-500
              transition-all duration-300 ease-in-out w-full rounded-[5px] text-center text-sm p-2.5`}
              >
                Login
              </Link>
              <Link
                to="/sign-up"
                type="button"
                className={`text-white bg-blue-500
              mt-1 transition-all duration-300 ease-in-out w-full rounded-[5px] text-center text-sm p-2.5`}
              >
                Signup
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <div className="cursor-pointer">
          <CiSettings size={24} />
        </div>
      </div>
    </div>
  );
};

export default HomeNav;
