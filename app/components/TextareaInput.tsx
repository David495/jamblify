// "use client";
// import { error } from "console";
// import React, { useState, useEffect } from "react";
// import { ArrowUp } from "lucide-react";

// const TextareaInput = () => {

//     const handleIsTyping = (e: React.KeyboardEvent<HTMLInputElement>) =>{
//            if (e.currentTarget.value.trim().length > 0) {
//            setIsTyping(true);
//            setCurrentText("");
//          }else{
//             setIsTyping(false);
//             setCurrentText("Welcome to the essay page")
           
//          }
//         }
//   const generateTextInput = async () => {
//     try {
//       const response = fetch("/api/generate", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ body: "" }),
//       });
      
//       const data = (await response).json();
//       console.log(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return 
//   <>
//   <div className='flex gap-2 shadow p-5 rounded-2xl'>
//             <input type="text" placeholder='Enter your topic' className='outline-none border-none' onKeyUp={handleIsTyping}/>
//             <button className={`p-2 rounded-full text-white transition
//   ${isTyping ? "bg-blue-600" : "bg-gray-400 cursor-not-allowed"}
// `}>
//   <ArrowUp/>
// </button>
//             </div>
//   </>;
// };

// export default TextareaInput;
