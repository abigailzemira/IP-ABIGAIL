import { useNavigate, useParams } from "react-router";
import "../App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";

export default function Categories() {
    const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const params = useParams();
  async function fetchBookByCat(id) {
    try {
      const response = await axios({
        method: "GET",
        url: "http://localhost:3000/categories/" + id + "/books",
      });
    //   console.log(response.data.Books, "<<<<<<< response data");
      setCategory(response.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.message,
      });
    }
  }
  useEffect(() => {
    fetchBookByCat(params.id);
  }, []);
  console.log(category, "<<<<<<< category");
  if(category) {
    return (
        <>
        <Navbar/>
        <div className="flex justify-center items-center">
        <div className="h-11/12 grid grid-cols-4 gap-32 p-4">
        {category.Books.map((el) => {
            // {console.log(el.cover, "<<<<<<< el.cover")}
          return (
            <div className="card card-xs w-40 h-52 bg-base-100 shadow-sm" key={el.id}>
              <figure className="h-full object-contain">
                <img
                  src={el.cover}
                  alt="Shoes"
                />
              </figure>
              <div className="card-actions justify-end">
                <button className="btn btn-neutral btn-outline"
                onClick={() => navigate(`/books/${el.id}`)}
                >See detail</button>
              </div>
            </div>
          );
        })}
      </div>
        </div>
        </>
    )
  } else {
   <p>tunggu ya</p>
  }
}
