import axios from "axios";

export const getStudents=async()=>{
   try {
     const res=await axios.get('http://localhost:3000/students')
     return res.data;
   } catch (error) {
      console.log(error);     
   }
}