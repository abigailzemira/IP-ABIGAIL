import "../App.css"
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";

export default function Recommended() {
    const navigate = useNavigate();
    const [recommended, setRecommended] = useState(null);

    async function fetchRecommended() {
        try {
            const response = await axios({
                method: "GET",
                url: "http://localhost:3000/recommendations",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                }
            });
            console.log(response.data)
            setRecommended(response.data);
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.response.data.message,
            });
        }
    }

    useEffect(() => {
        fetchRecommended()
    }, [])

    if(recommended) {
        return (
            <>
            <Navbar/>
            <div className="flex justify-center items-center">
            <div className="h-11/12 grid grid-cols-4 gap-32 p-4">
            {recommended.map((el) => {
                // {console.log(el.cover, "<<<<<<< el.cover")}
              return (
                <div className="card card-xs w-40 h-52 bg-base-100 shadow-sm" key={el.id}>
                  <figure className="h-full object-cover">
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