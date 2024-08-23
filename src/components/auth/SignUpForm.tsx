import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Or from "../Or";

// import { useAuth } from "../../contexts/AuthContext";
import Loader from "../Loader";
import TextInput from "../TextInput";
import { useForm, FieldError } from "react-hook-form";
import { useSignIn, useSignUp } from '@clerk/clerk-react';


interface InitialValues {
  username:string;
  email: string;
  password: string;
}

const SignUpForm = () => {
  const { signUp, isLoaded } = useSignUp();
  const { signIn } = useSignIn();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<InitialValues>({
    mode: "onChange",
  });

  const [password, setPassword] = useState("");
  //   const { signup } = useAuth();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<InitialValues>({
    username:"",
    email: "",
    password: "",
  });

  // const onSubmit = async (data: InitialValues) => {
    
  // };

  const handleSignup = async (event:any) => {
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      // Create a new user
      await signUp?.create({
        username,
        emailAddress: email,
        password: password,
      });

      await signUp?.attemptEmailAddressVerification({ code: '123456' });

      // Attempt to sign the user in after successful sign-up
      const signInAttempt = await signIn?.create({
        identifier: email,
        password: password,
      });

      if (signInAttempt?.status === 'complete') {
        // Redirect or show success message
        console.log('Sign-up and sign-in successful!');
      } else {
        // Handle multi-factor authentication if needed
        console.log('Further sign-in steps required');
      }
    } catch (error) {
      console.error('Sign Up Error:', error);
      // Handle error
    }
  };

  const handleChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <form action="" method="post" onSubmit={handleSignup}>
      <div className="flex items-center gap-3 mb-3">
        <button
          type="submit"
          className={` bg-white flex items-center justify-center gap-3 shadow-sm min-h-[44px]
      mt-3  transition-all duration-300 ease-in-out w-full rounded-[5px] text-center border border-blue-300 text-sm p-2.5`}
        >
          <span className="">
            <FcGoogle size={19} />
          </span>
          <span className="text-dark-600">Continue with google</span>
        </button>
      </div>
      <Or />
      {/* <div>
        <label htmlFor="" className="text-sm font-medium">
          Username*
        </label>

        <TextInput
          name="username"
          placeholder="dannyboy3"
          type="text"
          register={register("username", {
            required: "Username is required!",
          })}
          error={errors.username as FieldError}
          onChange={handleChangeForm}
          // icon={<MdOutlineEmail/>}
        />
      </div>
      <div>
        <label htmlFor="" className="text-sm font-medium">
          Email Address
        </label>

        <TextInput
          name="email"
          placeholder="example@gmail.com"
          type="email"
          register={register("email", {
            required: "Email is required!",
          })}
          error={errors.email as FieldError}
          onChange={handleChangeForm}
          // icon={<MdOutlineEmail/>}
        />
      </div>

      <div>
        <label htmlFor="" className="text-sm font-medium">
          Password
        </label>
        
        <TextInput
          name="password"
          placeholder="*********"
          type="password"
          register={register("password", {
            required: "Password is required!",
          })}
          error={errors.password as FieldError}
          onChange={handleChangeForm}
        />

      </div> */}
      
      <input type="text" name="username" placeholder="Username" required />
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />



      <button
        type="submit"
        className={`text-white ${
          loading ? "bg-blue-500" : "bg-blue-500"
        }  mt-3  transition-all duration-300 ease-in-out w-full rounded-[5px] text-center text-sm p-3`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-1">
            <Loader />
            Loading...
          </span>
        ) : (
          "Continue"
        )}
      </button>
      <div className="flex items-center justify-center gap-1 text-sm pt-6">
        <span className="text-dark-600">Already have an account?</span>
        <Link to="/sign-in" className="font-medium text-blue-500">
          Sign in
        </Link>
      </div>
    </form>
  );
};

export default SignUpForm;
