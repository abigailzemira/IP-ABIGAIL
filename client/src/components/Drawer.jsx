import { useNavigate } from 'react-router'
import '../App.css'
export default function Drawer() {
const navigate = useNavigate()

    return (
        <div className="drawer w-auto h-11/12">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex justify-center items-center">
            {/* Page content here */}
            <label htmlFor="my-drawer" className="btn btn-square btn-ghost drawer-button"

            ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg></label>
        </div>
        <div className="drawer-side">
            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <li><a
            onClick={() => {
                navigate('/ownedBooks')
            }}
            >My Books</a></li>
            <li><a
            onClick={() => {
                navigate('/recommended')
            }}
            >Recommended for you</a></li>
            {/* <li><a>Cuisines</a></li> */}
            </ul>
        </div>
        </div>
    )
}