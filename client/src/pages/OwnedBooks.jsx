import { useState } from "react";
import "../App.css";
import Navbar from "../components/Navbar";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, updateBookStatus, deleteBook } from "../store/bookSlice";

export default function OwnedBooks() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [status, setStatus] = useState("");

  const { items: collection, loading, error } = useSelector(state => state.books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);
  console.log(collection, "<<<<< disini")
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!collection) {
    return <p>No books found</p>;
  }

  return (
    <div className="h-screen">
      <Navbar />
      <div className="h-11/12">
        <h1 className="text-3xl font-bold text-center" style={{fontFamily: "SourceCodePro"}}>My Bookmarks</h1>
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-center items-center">
            <div className="h-11/12 grid grid-cols-4 gap-32 p-4">
              {collection.map((el) => (
                <div
                  className="card card-xs w-40 h-52 bg-base-100 shadow-sm"
                  key={el.Book.id}
                >
                  <figure className="h-full object-cover">
                    <img src={el.Book.cover} />
                  </figure>
                  <div className="card-actions justify-end">
                    <select
                      className="select select-ghost"
                      value={el.status}
                      onChange={async (e) => {
                        const newStatus = e.target.value;
                        setStatus(newStatus);
                        try {
                          await dispatch(updateBookStatus({ id: el.id, status: newStatus })).unwrap();
                          Swal.fire({
                            icon: "success",
                            text: "Successfully updated status",
                          });
                        } catch (error) {
                          Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: error.message,
                          });
                        }
                      }}
                    >
                      <option value="Plan to Read">Plan to Read</option>
                      <option value="Reading">Reading</option>
                      <option value="Completed">Completed</option>
                    </select>

                    <button
                      className="btn btn-error btn-outline"
                      onClick={async () => {
                        try {
                          await dispatch(deleteBook(el.id)).unwrap();
                          Swal.fire({
                            icon: "success",
                            text: "Successfully deleted book",
                          });
                        } catch (error) {
                          Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: error.message,
                          });
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
