import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords"); // Corrected key here

    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []); // Empty dependency array means this runs only once on mount

  const showPassword = () => {
    alert("show the password");
  };

  const handleCopy = (text) => {
   alert("Copied to ClipBoard!");
    navigator.clipboard.writeText(text);
  };

  const savePassword = () => {
    if(form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

      const updatedPasswordArray = [...passwordArray, { ...form, id: crypto.randomUUID() }]; // Using crypto.randomUUID() for unique IDs
      setPasswordArray(updatedPasswordArray);
      localStorage.setItem("passwords", JSON.stringify(updatedPasswordArray));
      console.log(updatedPasswordArray);
      setForm({ site: "", username: "", password: "" }); // Clear the form after saving
        alert("Password Saved Sucessfully!");
    } else {
      alert("The lenght of input credentials should be more than 3 characters");
    }
  };

  const deletePassword = (id) => {
    console.log("deleting password with id:" + id);
    let c = confirm("Do you want to delete this password?");
    if(c) {

      setPasswordArray(passwordArray.filter(item=>item.id != id))

      localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id != id)));
        alert("Password Deleted Sucessfully");
    }
    // console.log([...passwordArray, form]);
  };


  const editPassword = (id) => {
    console.log("Editing password with id:" + id);
    setForm(passwordArray.filter(i=>i.id===id)[0])
    setPasswordArray(passwordArray.filter(item=>item.id !== id))
      alert("Password Edited Sucessfully");
    // localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]))
    // console.log([...passwordArray, form]);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className="p-3 md:mycontainer min-h-[83vh]">
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
            id="site"
          />
          <div className="md:flex-row flex flex-col w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-green-500 w-full p-4 py-1"
                type="password"
                name="password"
                id="password"
              />
              <span className="absolute right-[3px] top-[1px]">
                {/* <lord-icon
                  width={20}
                  onClick={showPassword} // Corrected: onClick
                  className="p-0"
                  src="https://cdn.lordicon.com/dicvhxpz.json"
                  trigger="hover"
                  colors="primary:#121331,secondary:#000000"
                ></lord-icon> */}
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="border-1 border-green-900 gap-2 hover:bg-green-300 w-fit flex justify-center items-center bg-green-400 rounded-full px-4 py-2"
          >
            <lord-icon
              src="https://cdn.lordicon.com/sbnjyzil.json"
              trigger="hover"
              colors="primary:#121331,secondary:#000000"
            ></lord-icon>
            Save Password
          </button>
        </div>
        <div className="passwords ">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className=" bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className=" text-center py-2 border border-white">
                        <div className=" flex items-center justify-center">
                          <a
                            href={item.site}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.site}
                          </a>
                          <div
                            className=" lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              handleCopy(item.site);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/xuoapdes.json"
                              trigger="hover"
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                                paddingRight: "3px",
                              }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="text-center py-2 border border-white">
                        <div className=" flex items-center justify-center">
                          <span>{item.username}</span>
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              handleCopy(item.username);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/xuoapdes.json"
                              trigger="hover"
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                                paddingRight: "3px",
                              }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="text-center py-2 border border-white">
                        <div className=" flex items-center justify-center">
                          <span>{item.password}</span> {/* Mask password */}
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              handleCopy(item.password);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/xuoapdes.json"
                              trigger="hover"
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                                paddingRight: "3px",
                              }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="text-center py-2 border border-white">
                        <span onClick={()=>{editPassword(item.id)}} className="cursor-pointer mx-2">
                          <lord-icon
                            src="https://cdn.lordicon.com/umuwriak.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                        <span onClick={()=>{deletePassword(item.id)}} className="cursor-pointer mx-2">
                          <lord-icon
                            src="https://cdn.lordicon.com/xyfswyxf.json"
                            trigger="hover"
                            style={{width:"25px", height:"25px"}}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;