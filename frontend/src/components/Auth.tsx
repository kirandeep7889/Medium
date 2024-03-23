import { signupInput } from "@kirandeep_7889/medium-common";
import axios from "axios";
import { ChangeEvent, useState } from "preact/compat"
import { Link,  useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config";

export const Auth=({type}: {type :"signup"|"signin"})=> {
    
    const navigate=useNavigate();
    const [postInputs,setPostInputs]=useState<signupInput>({
        name : "",
        username : "",
        password : ""
    });

    async  function sendRequest() {
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup" ? "signup" : "signin"}`,postInputs);
            console.log(response) 
            const jwt=response.data.jwt;
             localStorage.setItem("token",jwt);
             navigate("/blog");
        }catch (e) {
            
        }
    }


    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
          <div>   
          <div className="px-10">
           <div className="text-3xl font-extrabold ">
            Create an Account
            </div>
           <div className="text-slate-400">
             {type=== "signin" ? "Don't have an account" : "Already have an account?" }
             <Link className="pl-2 underline" to={type==="signin" ? "/signup" : "/signin"  }>
                {type==="signin" ? "signup" : "signin"}</Link>
           </div>
         </div>
         <div>
          {type==="signup" ? <LabelledInput label="Name" placeholder="Kirandeep Singh" onChange={(e)=>{
            setPostInputs({
                ...postInputs,
                name : e.currentTarget.value
            })
         }} /> : null}
          <LabelledInput label="Username" placeholder="Kirandeep@gmail.com" onChange={(e)=>{
            setPostInputs({
                ...postInputs,
                username : e.currentTarget.value
            })
         }} />    
          <LabelledInput label="Password" type="password" placeholder="enter the password" onChange={(e)=>{
            setPostInputs({
                ...postInputs,
                password : e.currentTarget.value
            })
         }} />
           <button onClick={sendRequest} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 mt-4 w-full
            dark:border-gray-700">{type==="signup" ? "Sign Up" : "Signin" }</button>

         </div>
         </div>
              
        </div>

    </div>
}

interface LabelledInputType{
    label: string,
    placeholder :string,
    onChange :  (e:ChangeEvent<HTMLInputElement>) => void;
    type? :  string
}


function LabelledInput({label,placeholder,onChange,type}:LabelledInputType) {
    return <div>
         <label className="block text-gray-700 text-sm font-semibold mt-6 mb-2" htmlFor={label}>
          {label}
      </label>
      <input onChange={onChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
       id={label} type={type || "text"} placeholder={placeholder}></input>
    </div>
}