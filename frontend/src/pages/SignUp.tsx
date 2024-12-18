import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const router = useNavigate();

    const handleSignUp =async (e: React.FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault();
        const res = await axios.post('http://localhost:8080/signup', { username: username, password: password, confirmPassword: confirmPassword });
        if (res.status === 201) {
          router('/login');
        }
      } catch (error) {
        console.log(error);
      }
    }

  return (
    <div className="flex justify-center">
      <div className="flex justify-center m-10 bg-white rounded-3xl relative items-center px-5 py-12">
        <div className="md:max-w-sm md:px-0 md:w-96 sm:px-4">
          <div className="flex flex-col">
            <div>
              <h2 className="text-4xl font-semibold text-black">Create Account</h2>
            </div>
          </div>
          <form onSubmit={handleSignUp}>
            <div className="mt-4 space-y-6 font-semibold">
              <div className="col-span-full">
                <label className="block mb-3 text-lg font-medium text-gray-600">
                  {" "}
                  Username{" "}
                </label>
                <input
                id="username"
                onChange={(e)=>{setUsername(e.target.value)}}
                required
                  type="text"
                  placeholder="Enter Username"
                  className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <div className="col-span-full">
                <label className="block mb-3 text-lg font-medium text-gray-600">
                  Password{" "}
                </label>
                <input
                id="password"
                onChange={(e)=>{setPassword(e.target.value)}}
                required
                  type="password"
                  placeholder="******"
                  className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <div className="col-span-full">
                <label className="block mb-3 text-lg font-medium text-gray-600">
                  {" "}
                  Confirm password{" "}
                </label>
                <input
                id="confirmPassword"
                onChange={(e)=>{setConfirmPassword(e.target.value)}}
                required
                  type="password"
                  placeholder="******"
                  className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <h2>Already have account? <Link className="text-blue-700" to={"/login"}>Login</Link></h2>
              <div className="col-span-full justify-center flex">
                <button
                  type="submit"
                  className="items-center justify-center px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
                >
                  {" "}
                  Create Account{" "}
                </button>
              </div>
            </div>
            {/* <h1>{username}</h1> */}
          </form>
        </div>
      </div>
    </div>
  );
}
