import React from "react";
import { useRef, useState, useEffect } from "react";

const Manager = () => {
    const[form, setForm] = useState({site: "", username: "", password: ""})
    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
         let passwords = localStorage.getItem("passwords");
     
        if(passwords) {
            setPasswordArray(JSON.parse(passwords));
        } 
    },[])
    const showPassword = () => {
        alert("show the password");
    }
    const savePassword = () => {
      
       setPasswordArray([...passwordArray, form])
       localStorage.setItem("password", JSON.stringify([...passwordArray, form]))
       console.log([...passwordArray, form]);
    }
    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }
    return (
        <>
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
            </div>
            <div className="mycontainer">
                <h1 className="text-4xl text font-bold text-center">
                    <span className="text-green-700">&lt;</span>
                    Pass
                    <span className="text-green-700">OG/&gt;</span>
                </h1>
                <p className="text-green-900 text-lg text-center">
                    Better than google password manager.
                </p>
                <div className="flex flex-col p-4 text-black gap-8 items-center">
                    <input
                    value={form.site}
                    onChange={handleChange}
                        placeholder="Enter website URL"
                        className="rounded-full border border-green-500 w-full p-4 py-1"
                        type="text"
                        name="site"
                        id=""
                    />
                    <div className="flex w-full justify-between gap-8">
                        <input
                        value={form.username}
                        onChange={handleChange}
                            placeholder="Enter Username"
                            className="rounded-full border border-green-500 w-full p-4 py-1"
                            type="text"
                            name="username"
                            id=""
                        />
                        <div className="relative">
                            <input
                            value={form.password}
                            onChange={handleChange}
                                placeholder="Enter Password"
                                className="rounded-full border border-green-500 w-full p-4 py-1"
                                type="text"
                                name="password"
                                id=""
                            />
                            <span className="absolute right-[3px] top-[1px]">
                                <script src="https://cdn.lordicon.com/lordicon.js"></script>
                                

                                <lord-icon
                                width={20}
                                onClick={showPassword}
                                className="p-0"
                                src="https://cdn.lordicon.com/dicvhxpz.json"
                                trigger="hover"
                                colors="primary:#121331,secondary:#000000"
                                
                                ></lord-icon>
                                
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className="border-1 border-green-900 gap-2 hover:bg-green-300 w-fit flex justify-center items-center bg-green-400 rounded-full px-4 py-2">
                        <lord-icon
                            src="https://cdn.lordicon.com/sbnjyzil.json"
                            trigger="hover"
                            colors="primary:#121331,secondary:#000000"
                        ></lord-icon>
                        Add Password
                    </button>
                </div>
            </div>
        </>
    );
};

export default Manager;
