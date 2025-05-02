import Swal from "sweetalert2";
import axios from "axios";
import "../App.css";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Carousel from "../components/Carousel";
export default function Homepage() {
  const navigate = useNavigate();
  const [categoryHeader, setCategoryHeader] = useState([]);

  async function fetchCategoryHeaders() {
    try {
      const response = await axios({
        method: "GET",
        url: "http://localhost:3000/categoryHeaders",
      });
      setCategoryHeader(response.data);
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
    fetchCategoryHeaders();
  }, []);
  return (
    <div className="h-screen">
      <div className="h-1/12">
        <Navbar />
      </div>

      <div>
        <div className="h-11/12 flex flex-col items-center">
          <div className="w-10/12 flex flex-col flex-start gap-">
            <Carousel />
            {categoryHeader.map((el) => {
              return (
                <>
                  <h1 style={{fontSize: "25px", fontFamily: "SourceCodePro"}}>{el.name}</h1>
                  <div key={el.id} className="carousel carousel-center bg-white rounded-box max-w-md space-x-4 p-4 h-40 flex-start shadow-xs">
                    {el.Categories.map((category) => {
                      return (
                        <>
                          <div className="carousel-item w-96 shadow-sm text-center h-20 flex justify-center items-center bg-orange-200 opacity-30 rounded-box"
                          key={category.id}
                          onClick={() => {
                            navigate("/categories/" + category.id + "/books")
                          }}
                          >
                            <p style={{fontFamily: "SourceCodePro", fontWeight: "bold"}}>{category.name}</p>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
