import { Blog } from "../hooks"
import { Appbar } from "./AppBar"
import { Avatar } from "./BlogCard"

export const FullBlog=({ blog }  : {blog:Blog})=>{
    return<div>
        <Appbar/>
        <div className="flex justify-center gap-15">
          <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12 ">
           <div className=" col-span-8">
                <div className="text-5xl font-extrabold pt-12">
                    {blog.title}
                </div>
                <div className="text-slate-500 pt-2">
                    Post on 2nd december 2023
                </div>
                <div className="pt-4">
                    {blog.content}
                </div>
           </div>
           <div className=" bg-white col-span-4 ">
                  <div className="text-slate-600 text-lg">
                    Author
                  </div>
                  <div>
                  <div className="flex w-full">
                      <div className="pr-4 flex flex-col justify-center">
                           <Avatar size="big" name={blog.author.name || "Anonymous"} />
                      </div>
                      <div>
                         <div className="text-xl font-bold">
                          {blog.author.name || "Kirandeep"}
                      </div>
                      </div>
                  </div>
                  <div className="ml-10 pt-2 text-slate-500">
                         Random catch Phrase about the author"s ability to grab the user's attention
                  </div>
                  </div>
           </div>
    </div>
    </div>
 </div>   
}