

export const BlogsSkeleton=()=>{
   return <div role="status" class=" animate-pulse">
           <div className="border-b border-slate-200 pb-4 mt-8  w-screen max-w-screen-md cursor-pointer">
          <div className="flex">
             <div class="h-4 bg-gray-200 rounded-full w-4 mb-4"></div>
             <div class="h-2 bg-gray-200 rounded-full  max-w-[360px] mb-2.5"></div>
              <div className="font-semibold mt-3 pl-2">
                <div class="h-2 bg-gray-200 rounded-full mb-2.5"></div>
              </div>
              <div className="flex   mt-1 justify-center flex-col pl-2">
              <div class="h-2 bg-gray-200 rounded-full mb-2.5"></div>
              </div>
              <div className="pl-2 mt-3 font-thin text-slate-500">
              <div class="h-2 bg-gray-200 rounded-full mb-2.5"></div>
              </div>
           </div>
          <div className="text-xl font-semibold">
          <div class="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          </div>
          <div className="text-md font-thin">
          <div class="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          </div>
          <div className="text-slate-600 mt-3">
          <div class="h-2 bg-gray-200 rounded-full mb-2.5"></div>
          </div>
    </div>
  
</div>

}