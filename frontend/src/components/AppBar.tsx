import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

export const Appbar =()=> {
    return <div className="border-b border-slate-300 flex justify-between px-10 py-4 ">
        <Link to={'/blogs'} className="flex flex-col justify-center cursor-pointer">
            Medium
        </Link>
        <div>
            <Link to={'/publish'}>
             <button type="button" className="focus:outline-none te00xt-white
              bg-green-700 hover:bg-green-800 focus:ring-4
              focus:ring-green-300 font-medium rounded-lg
              text-sm px-5 py-2.5 me-2 mb-2 mr-8">NEW</button>
            </Link>
      
           <Avatar size={"big"} name="kirandeep"/>
        </div>
    </div>
}