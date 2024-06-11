import { Button } from 'flowbite-react'
import React from 'react'
import { AiFillGoogleCircle } from 'react-icons/ai'
import { GoogleAuthProvider ,signInWithPopup,getAuth} from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice'
import { app } from '../firebase.js'
import { useNavigate } from 'react-router-dom'





const OAuth=()=> {
        const auth= getAuth(app);
        const dispatch=useDispatch();

        const navigate=useNavigate();

    const handleGoogleClick=async ()=> {
        const provider=new GoogleAuthProvider();
        provider.setCustomParameters({prompt:'select_account'});
        try {
            const resultsFromGoogle=await signInWithPopup(auth,provider);
            const res=await fetch(`${import.meta.env.VITE_API_URL}/api/auth/google`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
            },
            body:JSON.stringify({
                name:resultsFromGoogle.user.displayName,
                email:resultsFromGoogle.user.email
            }),
        });
        const data=await res.json();
        if(res.ok){
            dispatch(signInSuccess(data));
            navigate('/dashboard')
        }
            
        } catch (error) {
            console.log(error);
            
        }
        
        
        }







    return (
        
       <Button type='button' 
       className='text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none'
       onClick={handleGoogleClick}>
        <AiFillGoogleCircle className=' w-6 h-6 mr-2' />
        Sign In with Google
       </Button>
    )
}

export default OAuth
