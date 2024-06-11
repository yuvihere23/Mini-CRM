import {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Alert, Button, Label, Spinner, TextInput} from 'flowbite-react';
import OAuth from '../components/OAuth.jsx';


const SignUp = () => {

  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value.trim()});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("All fields are required!");
    }
    try {
    
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        setLoading(false);
        return setErrorMessage(data.message);
      }

      setLoading(false);

      if (res.ok) {
        navigate("/login");
      }
      
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }

  };


  console.log(formData);

  return (
    <div className="min-h-screen mt-20">
        <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-10">
          {/* Left */}
          <div className="flex-1">
          <Link
                to="/"
                className="font-bold dark:text-white text-4xl"
            >
                <span className="px-2 py-1 bg-gradient-to-r from-orange-200 via-orange-300 to-orange-500 rounded-lg text-white">
                Sign
                </span>
                Up
            </Link>
            <p className="text-sm mt-5">
            This is a demo project. You can sign up with your email and password
            or with Google.
            </p>

          </div>
          {/* Rights */}
          <div className="flex-1">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              
              <div>
              <Label value="Your username" className=' text-lg'/>
              <TextInput 
              className=' border-box'
                type="text"
                placeholder="Username"
                id="username"  
                onChange={handleChange}
              />
              </div>
              
              <div>
              <Label value="Your email"/>
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"  
                onChange={handleChange}
              />
              </div>
              
              <div>
              <Label value="Your password"/>
              <TextInput
                type="password"
                placeholder="Password"
                id="password"  
                onChange={handleChange}
              />
              </div>

              <Button
                className='text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none'
              type="submit"
              disabled={loading}
              >
                {
                  loading ? (
                    <>
                    <Spinner size="sm" />
                    <span className="pl-3">Loading...</span>
                    </>

                  ) : ("Sign Up")
                  }
              </Button>
              <OAuth />
            </form>
            <div className="flex gap-2 text-sm mt-5">
              <span>Already have an account?</span>
              <Link to="/login" className="text-blue-500">
                Sign In
              </Link>
            </div>

            {errorMessage && (
              <Alert className="mt-5" color="failure">
                {errorMessage}
              </Alert>
            )}

          </div>
        </div>
    </div>
  )
}

export default SignUp