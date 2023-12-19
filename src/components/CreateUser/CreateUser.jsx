// import '../CreateUser/NewUser.css'
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { Link, Navigate, redirect } from "react-router-dom";
import { AuthContext } from "../../Auth/AuthContext";
function CreateUser(){

    const {isLogged} = useContext(AuthContext);

    const [okUser, setOkUser ] = useState(false);

    const [userRegister, setUserRegister] = useState({
        firstname:'',
        lastname:'',
        email:'',
        password:'',
        rolId: 2
    })

    const handlerRegisterChange = (e) =>{
        setUserRegister({
            ...userRegister,
            [e.target.name]: e.target.value,
        })
    }

    useEffect(() => { if (okUser){
        <Navigate to='/'/>
    }},[okUser]);

    const handleFormSubmit = async (e) =>{
        e.preventDefault();
        try {
            await axios.post("https://localhost:7203/api/",userRegister);//falta definir ruta
            setUserRegister({
                firstname:'',
                lastname:'',
                email:'',
                password:'',
                rolId: 2  
            });
        setOkUser(true);
            alert("Registrado correctamente!");
        } catch(error){
            console.log("Ops algo no funciono bien >:/", error);
            alert('Cuenta no creada, intentelo nuevamente :/')
        }

    }


return (
    <>
    <div style={{ paddingLeft:'800px', paddingTop:'150px'}}>
        <div style={{ borderRadius:'6px', border:'1px solid white', width:'700px', height:'620px', backgroundColor: 'rgba(255, 255, 255, 0.5'}} >
            <h2 style={{ fontSize:'35px'}}>Registrese en TDF Wallet!</h2>
            <form onSubmit={handleFormSubmit}>
            <label>Ingrese su Nombre:</label>
            <input type="text" name="firstname" value={userRegister.firstname} onChange={handlerRegisterChange} required></input>
            <br />
            <label>Ingrese su Apellido:</label>
            <input type="text" name="lastname" value={userRegister.lastname} onChange={handlerRegisterChange} required></input>
            <br />
            <label>Ingrese su Correo Electronico:</label>
            <input type="email" name="email" value={userRegister.email} onChange={handlerRegisterChange} required></input>
            <br />
            <label>Ingrese su contraseña:</label>
            <input type="password"  name="password" value={userRegister.password} onChange={handlerRegisterChange} required></input>
            <br />
            <button>Registrarse!</button>
            </form> 
            <button><Link to='/' style={{color:'white'}}>Volver al menu principal</Link></button>   
        </div>
    </div>


    </>





)

}

export default CreateUser;