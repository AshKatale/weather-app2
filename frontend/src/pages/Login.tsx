import { useState } from "react"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useNavigate();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            const response = await axios.post("http://localhost:8080/login", {
                username,
                password,
            });
            console.log("Login successful:", response.data);
            localStorage.setItem("token", response.data.token);
            router('/')
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error("Login failed:", error.response?.data || error.message);
            } else {
                console.error("Login failed:", error);
            }
        }
    }

  return (
    <div className="flex justify-center">
      <div className="flex justify-center m-10 bg-white rounded-3xl relative items-center px-5 py-12">
        <div className="md:max-w-sm md:px-0 md:w-96 sm:px-4">
          <div className="flex flex-col">
            <div>
              <h2 className="text-4xl font-semibold text-black">Login</h2>
            </div>
          </div>
          <form onSubmit={handleLogin}>
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
              <h1>Create Account ? <Link to="/signup" className="text-blue-500">Sign Up</Link></h1>
              <div className="col-span-full justify-center flex">
                <button
                  type="submit"
                  className="items-center justify-center px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
                >
                  {" "}
                  Login{" "}
                </button>
              </div>
            </div>
            {/* <h1>{username}</h1> */}
          </form>
        </div>
      </div>
    </div>
  )
}
