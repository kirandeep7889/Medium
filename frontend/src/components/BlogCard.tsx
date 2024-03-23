import { Link } from "react-router-dom"

interface BlogCardProps{
    authorName: string,
    title : string ,
    content : string,
    publishedDate : string
    id : number
}


export  const  BlogCard =({authorName,id,title,content,publishedDate}:BlogCardProps)=>{
    return <Link to={`/blog/${id}`}>
    <div className="border-b border-slate-200 pb-4 mt-8  w-screen max-w-screen-md cursor-pointer">
          <div className="flex">
              <div className="flex justify-center flex-col mt-3">
                <Avatar size="small" name={authorName}/> 
              </div>
              <div className="font-semibold mt-3 pl-2">
                {authorName} 
              </div>
              <div className="flex   mt-1 justify-center flex-col pl-2">
                <Center/>
              </div>
              <div className="pl-2 mt-3 font-thin text-slate-500">
                {publishedDate}
              </div>
           </div>
          <div className="text-xl font-semibold">
              {title}
          </div>
          <div className="text-md font-thin">
               {content.slice(0,100) + "...."}
          </div>
          <div className="text-slate-600 mt-3">
              {`${Math.ceil(content.length/100)}minute(s)`}
          </div>
    </div>
    </Link>
}

function Center () {
    return(
        <div className="h-1 w-1 rounded-full bg-slate-600">

        </div>
    )
}


 export function Avatar({name,size="small"}: {name: string,size: "small" | "big"}) {
    return(
<div className={`relative inline-flex items-center justify-center w-10
 h-10 overflow-hidden bg-gray-100 ${size==="small" ? "w-6 h-6" : "w-10 h-10"} rounded-full dark:bg-gray-600`}>
    <span className={`${size==="small" ? "text-xs" : "text-md"} font-medium text-gray-600 dark:text-gray-300`}>{name[0]}</span>
</div>)
}