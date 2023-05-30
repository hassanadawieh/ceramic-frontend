import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Spinner from "../../components/spinner/spinner";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import Logo from "../../images/logo.svg";
import Brand from "../../images/brand.svg";
const Login = () => {
  const [checkedAdmin, setCheckedAdmin] = useState(false);
  const [checkedUser, setCheckedUser] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [width, setWidth] = useState("45vh");
  const [userLogin , setUserLogin] = useState({email: "" , password : ""});
  const [userRegister , setUserRegister] = useState({fullName : "" , email : "" , password : "" , address : "" , phoneNumber : ""})
  const [errorMessage , setErrorMessage] = useState("");
  const [isLoading , setIsLoading] = useState(false);
  const navigate = useNavigate();

  // fuction checked the admin
  const handleCheckedAdmin = () => {
    setCheckedAdmin(true);
    setCheckedUser(false);
  };
  // fub=nction checked the user
  const handleCheckedUser = () => {
    setCheckedAdmin(false);
    setCheckedUser(true);
  };

  // function checked if it's sign up
  const handleSignUp = () => {
    setSignUp(true);
    console.log(signUp);
  };

  // function checked if it's sign in
  const handleSignin = () => {
    setSignUp(false);
  };

  // function to increase the height of the card
useEffect(() => {
      if (signUp === true) {
        setWidth("60vh");
      }else{
        setWidth("45vh")
      }

},[signUp]);
    
  // function to check the user login
  const handlelogin = () => {
    if(checkedAdmin){
      signInAdmin();
    }else if(checkedUser){
       signInUser();
    }else{
      setErrorMessage("All inputs are required");
    }
  }

  // function to call the signUp 
  const handleUserSignUp = () => {
     SignUpUser();
  }

  ///////////////////////////////////////////////////////////////////////////
  const SignUpUser = async () => {
    const signUp = {
      fullName: userRegister.fullName,
      address: userRegister.address,
      phoneNumber: userRegister.phoneNumber,
      email: userRegister.email,
      password: userRegister.password,
    };
    // setErrorMessage({ error: "" });
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/register`,
        signUp
      );
      setIsLoading(false);
      setUserRegister({
        fullName: "",
        address: "",
        phoneNumber: "",
        email: "",
        password: "",
      });
      setUserRegister(false);
    } catch (e) {
      console.log(e);
      // setErrorMessage({ error: e.response.data.message });
      setIsLoading(false);
    }
  };

  const signInUser = async () => {
    const login = {
      email: userLogin.email,
      password: userLogin.password,
    };
    setErrorMessage( "" );
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/login`,
        login
      );
      setIsLoading(false);

      console.log(response);

      if (response.status == 200) {
        navigate("/");
        const oneWeek = 7 * 24 * 60 * 60 * 1000;
        Cookies.set("user-token", response.data.token, {
          expires: oneWeek,
        });
        Cookies.set("user-id", response.data.id);
      } else {
        console.error(response.data.message);
      }
    } catch (e) {
      console.log(e.message);
      setErrorMessage("Email or password is invalid" );
      console.log(errorMessage);
      setIsLoading(false);
    }
  };

    const signInAdmin = async () => {
      const login = {
        email: userLogin.email,
        password: userLogin.password,
      };
      setErrorMessage( "" );
      setIsLoading(true);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/admin/login`,
          login
        );
        setIsLoading(false);

        console.log(response);

        if (response.status == 200) {
          navigate("/")
          const oneWeek = 7 * 24 * 60 * 60 * 1000;
          Cookies.set("admin-token", response.data.token, {
            expires: oneWeek,
          });
          Cookies.set("admin-id", response.data.id);
        } else {
          console.error(response  .data.message);
        }
      } catch (e) {
        console.log(e.message);
        setErrorMessage("Email or password is invalid");
        console.log(errorMessage);
        setIsLoading(false);
      }
    };

  ///////////////////////////////////////////////////////////////////////////////////////////

  console.log(errorMessage);

  return (
    <div className="login-container">
      {isLoading && <Spinner />}
      <div className="div-wrap">
        <div className="logo">
          <img src={Logo} alt="logo" />
          <img src={Brand} alt="Brand" />
        </div>
        <div className="main-login">
          <div className="login-information">
            <div>something good and so beautiful</div>{" "}
            <p>
              lorem you can do what ever you want and you can bye by this
              website and know more about the products
            </p>
          </div>
          <form className="card-login" style={{ height: width }}>
            {signUp ? <h2>Create your account</h2> : <h2> Sign in</h2>}

            {signUp ? (
              <input
                className="input"
                placeholder="Name"
                required
                onChange={(event) =>
                  setUserRegister({
                    ...userRegister,
                    fullName: event.target.value,
                  })
                }
              ></input>
            ) : (
              ""
            )}
            {signUp ? (
              <input
                className="input"
                placeholder="Address"
                required
                onChange={(event) =>
                  setUserRegister({
                    ...userRegister,
                    address: event.target.value,
                  })
                }
              ></input>
            ) : (
              ""
            )}
            {signUp ? (
              <input
                className="input"
                placeholder="Phone"
                required
                onChange={(event) =>
                  setUserRegister({
                    ...userRegister,
                    phoneNumber: event.target.value,
                  })
                }
              ></input>
            ) : (
              ""
            )}
            <input
              className="input"
              placeholder="Email"
              required
              onChange={(event) => {
                setUserLogin({ ...userLogin, email: event.target.value });
                setUserRegister({ ...userRegister, email: event.target.value });
              }}
            ></input>
            <input
              className="input"
              placeholder="Password"
              required
              onChange={(event) => {
                setUserLogin({ ...userLogin, password: event.target.value });
                setUserRegister({
                  ...userRegister,
                  password: event.target.value,
                });
              }}
            ></input>
            {signUp ? (
              " "
            ) : (
              <div className="checkboxes">
                <label>
                  <input
                    type="checkbox"
                    checked={checkedUser}
                    onChange={handleCheckedUser}
                    name="user"
                    value="user"
                  />
                  User
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={checkedAdmin}
                    onChange={handleCheckedAdmin}
                    name="admin"
                    value="admin"
                  />
                  Admin
                </label>
              </div>
            )}
            <div className="ver-email">
              <p>{errorMessage}</p>
            </div>

            {signUp ? (
              <button
                type="button"
                onClick={() => handleUserSignUp()}
                className="sign"
              >
                Sign up
              </button>
            ) : (
              <button
                type="button"
                className="sign"
                onClick={() => handlelogin()}
              >
                Sign in
              </button>
            )}
            {signUp ? (
              <p>
                Already have an account?
                <span
                  onClick={() => {
                    handleSignin();
                  }}
                  className="span-sign-up"
                >
                  Sign in
                </span>
              </p>
            ) : (
              <p>
                Don't have an account?
                <span
                  onClick={() => {
                    handleSignUp();
                  }}
                  className="span-sign-up"
                >
                  Sign up
                </span>
              </p>
            )}
          </form>
        </div>
        <div className="our-brand">@Hassan-Adawieh</div>
      </div>
    </div>
  );
};

export default Login;
