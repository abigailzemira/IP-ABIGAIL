import "../App.css";
import Navbar from "../components/Navbar";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  async function handleRegister() {
    try {
      const response = await axios({
        method: "POST",
        url: "http://localhost:3000/register",
        data: {
          email,
          password,
          username,
        },
      });
      Swal.fire({
        icon: "success",
        text: "Register successful!",
      });
      navigate("/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.message,
      });
    }
  }

  return (
    <>
      {/* <div className="h-1/12">
          <Navbar />
        </div> */}
      <div className="h-screen">
        <form
          className="flex flex-col justify-center items-center h-12/12 bg-[url(./assets/bookBG.jpg)] bg-cover bg-center"
          onSubmit={handleRegister}
        >
          <h1>Register</h1>


          <div className="fieldset blur2xl rounded-box w-xs border p-4 h-auto">
          <label className="label">Name</label>
          <input
            username="username"
            value={username}
            type="text"
            className="input"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
            <label className="label">Email</label>
            <input
              name="email"
              value={password}
              type="email"
              className="input"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="label">Password</label>
            <input
              name="password"
              value={password}
              type="password"
              className="input"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="btn btn-neutral mt-4">
              Login
            </button>
            <p class="mt-10 text-center text-sm/6 text-gray-500 bg-white rounded-box p-2">
              Already have an account?
              <a
                class="font-semibold text-indigo-600 hover:text-indigo-500"
                onClick={() => {
                  navigate("/login")
                }}
              >
                Login here
              </a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
