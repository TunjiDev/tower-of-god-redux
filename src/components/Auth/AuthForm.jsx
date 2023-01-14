import { useState, useContext } from "react";
// import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

// import { useDispatch, useSelector } from "react-redux";
import useInput from "../../hooks/useInput";
import AuthContext from "../../context-store/authContext";

// import { authActions } from "../../redux-store/auth";
import styles from "./AuthForm.module.css";
import LoadingSpinner from "../UI/LoadingSpinner";

const isNotEmptyAndGreaterThan8 = (value) => value.trim() !== "" && value.trim().length >= 8;
const isEmail = (value) => value.includes("@");

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [httpError, setHttpError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  // const isLogin = useSelector((state) => state.auth.isLogin);
  // const dispatch = useDispatch();

  const switchAuthModeHandler = () => {
    // dispatch(authActions.switchAuthMode());
    setIsLogin((prevState) => !prevState);
  };

  //FORM VALIDATION LOGIC
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput(isEmail);

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangedHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput(isNotEmptyAndGreaterThan8);

  let formIsValid = false;

  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

  const submitHandler = (e) => {
    e.preventDefault();

    if (!formIsValid) {
      return;
    }

    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDKGJ7OL5ilMU9rOOQWzRT5rlrROSl0uHQ";
    } else {
      url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDKGJ7OL5ilMU9rOOQWzRT5rlrROSl0uHQ";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: emailValue,
        password: passwordValue,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          // console.log(res.json());
          resetEmailInput();
          resetPasswordInput();
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication Failed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        const expirationTime = new Date(new Date().getTime() + Number(data.expiresIn * 1000));
        authCtx.login(data.idToken, expirationTime.toISOString());
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
        setHttpError(err.message);

        setTimeout(() => {
          setHttpError(null);
        }, 3000);
      });

    // resetEmailInput();
    // resetPasswordInput();
  };

  const emailInputClasses = emailInputHasError ? `${styles.control} ${styles.invalid}` : `${styles.control}`;
  const passwordInputClasses = passwordInputHasError ? `${styles.control} ${styles.invalid}` : `${styles.control}`;

  let content = null;

  if (httpError) content = <p className={styles.errorText}>{httpError}</p>;
  if (isLoading) content = <LoadingSpinner />;

  return (
    <section className={styles.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={emailInputClasses}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            required
            value={emailValue}
            onChange={emailChangedHandler}
            onBlur={emailBlurHandler}
          />
          {emailInputHasError && <p className={styles.errorText}>Please enter a valid email address!</p>}
        </div>

        <div className={passwordInputClasses}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            value={passwordValue}
            onChange={passwordChangedHandler}
            onBlur={passwordBlurHandler}
          />
          {passwordInputHasError && (
            <p className={styles.errorText}>Password must not be empty and must be at least 8 characters long!</p>
          )}
        </div>

        <div className={styles.actions}>
          {!isLoading && <button>{isLogin ? "Login" : "Create Account"}</button>}

          {content}

          <button type="button" className={styles.toggle} onClick={switchAuthModeHandler}>
            {isLogin ? "Create new account" : "Login to an existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
