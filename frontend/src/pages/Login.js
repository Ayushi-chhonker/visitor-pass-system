import {useState} from "react";
import axios from "axios";

function Login(){

    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async(e) => {
        e.preventDefault();

    try{
        const res = await axios.post(
            "http://localhost:5000/api/auth/login",
            {
                email,
                password
            }
        );
        alert("Login successfull");
        console.log(res.data);
    }catch(error){
        alert("Login failed");
        console.log(error);
    }
};
return(
    <div>
        <h2>Login</h2>

        <form onSubmit = {handleLogin}>
        <input type = "email" placeholder = "Enter Email" value = {email} onChange ={(e)=> setEmail(e.target.value)}/>
        <br/> <br/>
        <input type= "password" placeholder = "Enter password" value = {password} onChange= {(e)=> setPassword(e.target.value)}/>
        <br/> <br/>

        <button type= "submit">Login</button>
        </form>
    </div>

);
}
export default Login;