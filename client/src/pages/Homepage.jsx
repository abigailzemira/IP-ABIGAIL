import "../App.css"
import Navbar from "../components/Navbar"

export default function Homepage() {
  return (
    <>
    <Navbar/>

    <div className="homepage">
      <h1>Welcome to the Homepage</h1>
      <p>This is the main page of the application.</p>
    </div>
    </>
  )
}