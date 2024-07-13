import React from "react";
import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import useSignUp from "../../hooks/useSignUp";

export default function SignUp() {
  const [inputs, setInputs] = React.useState({
    fullname: "",
    username: "",
    password: "",
    confirmpassword: "",
    gender: "",
  });

  const { loading, signup } = useSignUp();

  const handleCheckboxChange = (gender) => {
    setInputs((prevInputs) => ({ ...prevInputs, gender }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto bg-white">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-black">
          Sign Up <span className="text-blue-500"> ChatApp</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-black">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter Full Name"
              className="w-full input input-bordered  h-10 bg-black/5 text-black"
              value={inputs.fullname}
              onChange={(e) =>
                setInputs({ ...inputs, fullname: e.target.value })
              }
            />
          </div>
          {/* <div>
            <p>{inputs.fullname}</p>
          </div> */}

          <div>
            <label className="label p-2 ">
              <span className="text-base label-text text-black">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              className="w-full input input-bordered h-10 bg-black/5 text-black"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text text-black">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10 bg-black/5 text-black"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text text-black">
                Confirm Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full input input-bordered h-10 bg-black/5 text-black"
              value={inputs.confirmpassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmpassword: e.target.value })
              }
            />
          </div>

          {/* gender check */}
          <GenderCheckbox
            onCheckboxChange={handleCheckboxChange}
            selectedGender={inputs.gender}
          />
          <Link
            className="text-sm hover:underline text-blue-600 mt-8 inline-block"
            to="/login"
          >
            Already have an account?
          </Link>

          <div>
            <button
              className="btn btn-block btn-sm mt-1 text-lg border h-10 bg-blue-600 text-white"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner bg-blue-600 text-white"></span>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
