import "../App.css";
import Navbar from "../components/Navbar";
import axios from 'axios'
import Swal from 'sweetalert2'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogin() {
    try {
      const response = await axios({
        method: 'POST',
        url: 'http://localhost:3000/login',
        data: {
          email,
          password
        }
      })
      localStorage.setItem('access_token', response.data.access_token)
      Swal.fire({
        icon: 'success',
        text: 'Login successful!',
      })
      navigate('/')
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response.data.message,
      })
    }
  }

  async function handleCredentialResponse(response) {
    try {
      console.log("Encoded JWT ID token: " + response.credential);
      const res = await axios({
        method: 'POST',
        url: 'http://localhost:3000/login/google',
        data: {
          googleToken: response.credential
        }
      })
      console.log(res, "<<<<<<< response from google login")
      localStorage.setItem('access_token', res.data.access_token)
      Swal.fire({
        icon: 'success',
        text: 'Login successful!',
      })
      navigate('/')
    } catch (error) {
      console.log(error, "<<<<<<< error from google login")
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.res.data.message,
      })    
    }
  }


  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse
    });
    window.google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" }  // customization attributes
    );
    window.google.accounts.id.prompt(); // also display the One Tap dialog
  }, [])

  return (
    <>
        {/* <div className="h-1/12">
          <Navbar />
        </div> */}
        <div className="h-screen">
        <form className="flex flex-col justify-center items-center h-12/12 bg-[url(./assets/bookBG.jpg)] bg-cover bg-center" onSubmit={handleLogin}>
            <h1>Login</h1>
          <div className="fieldset blur2xl rounded-box w-xs border p-4 h-auto">
            <label className="label">Email</label>
            <input name="email" value={password} type="email" className="input" placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            />

            <label className="label">Password</label>
            <input name="password" value={password} type="password" className="input" placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="btn btn-neutral mt-4">Login</button>
          </div>
        </form>
          <div id="buttonDiv"></div>
        </div>
    </>
  );
}
