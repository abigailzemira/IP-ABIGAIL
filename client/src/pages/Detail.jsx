import Swal from "sweetalert2";
import "../App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Navbar from "../components/Navbar";

export default function Detail() {
    const navigate = useNavigate()
  const params = useParams();
  const [book, setBook] = useState(null);
  async function fetchBook(id) {
    try {
      const response = await axios({
        method: "GET",
        url: "http://localhost:3000/books/" + id,
      });
      setBook(response.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.message,
      });
    }
  }

  async function addToCollection() {
    try {
        const response = await axios({
          method: "POST",
          url: "http://localhost:3000/ownedBooks/" + params.id,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          }
        });

        Swal.fire({
          icon: "success",
          text: "Book added to your collection",
        });

        navigate("/ownedBooks")
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.message,
      });
        
      if(localStorage.getItem("access_token") === null) {
        navigate("/login")
      }
    }
  }

  useEffect(() => {
    fetchBook(params.id);
  }, []);

  return (
    <div className="h-screen">
    <Navbar/>
      <div className="flex justify-center items-center h-11/12 bg-amber-100">

      <div className="card lg:card-side bg-base-100 shadow-sm w-8/12 ">
        <figure>
          <img
            src={book?.cover}
            className="h-96 w-72 object-cover"
            alt="Album"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{book?.name}</h2>
          <p className="text-gray-500">{book?.synopsis}</p>
            <p className="text-gray-500">{book?.author}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-neutral btn-outline"
            onClick={addToCollection}
            >Add to Collection</button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
