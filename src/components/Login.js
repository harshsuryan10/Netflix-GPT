import { useRef, useState } from "react"
import Header from "./Header"
import { checkValidData } from './../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";


const Login = () => {
    const [isSignInForm,setIsSignInForm] = useState(true);
    const [errorMessage,setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }
    const handelButtonClick = () => {
        //validate the form data
        const message = checkValidData(email.current.value,password.current.value);
        setErrorMessage(message);
        if(message ) return;
        //signin signup logic
        if(!isSignInForm){
            //sign up logic
            createUserWithEmailAndPassword(
                auth, 
                email.current.value,
                password.current.value
            )
            .then((userCredential) => {
                const user = userCredential.user;
                updateProfile(user, {
                    displayName: name.current.value, photoURL: "https://example.com/jane-q-user/profile.jpg"
                  }).then(() => {
                    const {uid,email,displayName,photoURL} = auth.currentUser;
                    dispatch(addUser({uid :uid,email:email,displayName:displayName,photoURL:photoURL}));
                    navigate("/browse");
                  }).catch((error) => {
                    setErrorMessage(error.message);
                  });
                console.log(user);
                
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode + "-" +errorMessage);
            });
        }
        else{
            //sign in logic
            signInWithEmailAndPassword(
                auth, 
                email.current.value,
                password.current.value
            )
            .then((userCredential) => { 
                const user = userCredential.user;
                console.log(user);
                navigate("/browse");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode + "-" +errorMessage);
            });

        }
    }
  return (
    <div>
       <Header/> 
       <div className="absolute">
            <img className="w-auto" src="https://assets.nflxext.com/ffe/siteui/vlv3/bfc0fc46-24f6-4d70-85b3-7799315c01dd/web/IN-en-20240923-TRIFECTA-perspective_74e21c19-980e-45ef-bd6c-78c1a6ce9381_large.jpg" alt="logo"/>
       </div>
       <form 
       onSubmit={(e)=> e.preventDefault()}
       className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
       <h1 className="text-3xl font-bold py-4 ">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
       {!isSignInForm  && <input 
           type="text" 
           ref={name}
           placeholder="Full Name" 
           className="p-4 my-4 w-full bg-gray-700"/>}
        <input 
            ref={email}
            type="email" 
            placeholder="Email Address" 
            className="p-4 my-4 w-full bg-gray-700"/>
        <input 
            ref={password}
            type="password" 
            placeholder="Password" 
            className="p-4 my-4 w-full bg-gray-700"/>
        {!isSignInForm ?<p className="font-bold text-sm ">Password Contains:<br/>
            Capital Letter    : A - Z <br/>
            Small Letter      : a - Z<br/>
            Numbers           : 0 - 9<br/>
            Special Character : @$<br/>
        </p>:<p></p>}
        <p className="font-bold text-lg text-red-500 py-2">{errorMessage}</p>
        <button 
            className="p-4 my-6 bg-red-700 w-full rounded-lg" onClick={handelButtonClick}>
            {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="font-bold text-lg cursor-pointer" onClick={toggleSignInForm}>
            {isSignInForm 
            ? "New to Netflix? Sign Up Now." 
            : "Already registered? Sign In Now."}
        </p>
       </form>
    </div>
  )
}

export default Login