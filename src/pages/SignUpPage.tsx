import { SignUp } from "@clerk/clerk-react";
import './SignInPage.css'
const SignUpPage = () => {
  return (
    <div className='min-h-screen flex items-center justify-center'>
        <SignUp signInUrl="/sign-in" />
    </div>
  );
};

export default SignUpPage;

// import { IoChevronBack } from 'react-icons/io5';
// import SignUpForm from '../components/auth/SignUpForm';
// import { Link } from 'react-router-dom';

// const SignUp = () => {
//   return (
//     <div className=" flex items-center justify-center h-screen max-h-screen overflow-y-scroll">

//       <section className=" my-auto">
//         <div className="  bg-white p-6 rounded-[5px] shadow-sm w-[390px]">
//         <Link
//             to="/"
//             className="text-blue-500 absolute flex items-center gap-0.5 pb-2"
//           >
//             <IoChevronBack />
//           </Link>

//           <div className="flex flex-col items-center justify-center">
//             <p className="font-semibold text-lg">Create your account</p>
//             <p className="text-[13px] text-dark-600 pt-1">
//               Welcome! Please fill in the details to get started.
//             </p>
//           </div>

//           <div className="pt-4">
//             <SignUpForm />
//           </div>

//         </div>
//       </section>
//     </div>
//   );
// }

// export default SignUp;
