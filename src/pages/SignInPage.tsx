import { SignIn } from "@clerk/clerk-react";
import './SignInPage.css'

const SignInPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignIn signUpUrl="/sign-up" />
    </div>
  );
};

export default SignInPage;

// import { IoChevronBack } from "react-icons/io5";
// import { Link } from "react-router-dom";
// import LoginForm from "../components/auth/LoginForm";
// import SignUpForm from "../components/auth/SignUpForm";

// const Login = () => {
//   return (
//     <div className=" flex items-center justify-center h-screen max-h-screen">
//       <section className=" my-auto">
//         <div className=" bg-white p-6  rounded-[5px] shadow-sm w-[390px]">
//           <Link
//             to="/"
//             className="text-blue-500 absolute flex items-center gap-0.5 pb-2"
//           >
//             <IoChevronBack />
//           </Link>
//           <div className="flex flex-col items-center justify-center">
//             <p className="font-semibold text-lg">Sign in to Whiteboard</p>
//             <p className="text-[13px] text-dark-600 pt-1">
//               Welcome back!Please sign in to continue.
//             </p>
//           </div>
//           <div className="pt-4">
//             <LoginForm />
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Login;
