import React, { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Or from "../Or";
import { Input } from "../../ui/input";
// import { useAuth } from "../../contexts/AuthContext";
import Loader from "../Loader";
import TextInput from "../TextInput";
import { useForm, FieldErrors, FieldError } from "react-hook-form";


interface InitialValues {
  username:string;
  email: string;
  password: string;
}

const LoginForm = () => {

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

  const onSubmit = async (data: InitialValues) => {
    // e.preventDefault();
    // try {
    //   setLoading(true);
    //   await signup(email, password);
    // } catch (error) {
    //   console.error("Signup failed", error);
    // } finally {
    //   setLoading(false);
    // }
  };

  const handleChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <form action="" method="post" onSubmit={handleSubmit(onSubmit)}>
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

      </div>

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
        <span className="text-dark-600">Don't have an account?</span>
        <Link to="/sign-up" className="font-medium text-blue-500">
          Sign up
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
