import { useState } from "react";
import styles from "./SignUp.module.css";
import TextInput from "../../components/Textinput/Textinput";
import signupSchema from "../../schemas/signupSchema";
import { useFormik } from "formik";
import { setUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signup } from "../../api/internal";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const handleSignup = async () => {
    const data = {
      username: values.username,
      password: values.password,
      phoneNumber: values.phoneNumber,
    };

    const response = await signup(data);

    if (response.status === 201) {
      // setUser
      const user = {
        _id: response.data.user._id,
        email: response.data.user.email,
        username: response.data.user.username,
        isStadiumOwner: response.data.user.isStadiumOwner,
        auth: response.data.auth,
      };

      dispatch(setUser(user));

      // redirect homepage
      navigate("/");
    } else if (response.code === "ERR_BAD_REQUEST") {
      // display error message
      setError(response.response.data.message);
    }
  };

  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },

    validationSchema: signupSchema,
  });

  return (
    <div className={styles.signupWrapper}>
      <div className={styles.signupHeader}>Create an account</div>

      <TextInput
        type="text"
        name="username"
        value={values.username}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="username"
        error={errors.username && touched.username ? 1 : undefined}
        errormessage={errors.username}
      />

      <TextInput
        type="text"
        name="phoneNumber"
        value={values.phoneNumber}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="phoneNumber"
        error={errors.phoneNumber && touched.phoneNumber ? 1 : undefined}
        errormessage={errors.phoneNumber}
      />

      <TextInput
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="password"
        error={errors.password && touched.password ? 1 : undefined}
        errormessage={errors.password}
      />

      <button
        onClick={handleSignup}
        disabled={
          !values.username ||
          !values.password ||
          !values.phoneNumber ||
          errors.username ||
          errors.password ||
          errors.phoneNumber
        }
        className="rounded-full border border-solid border-primary bg-transparent text-lg text-black px-14 py-5 hoverBtn m-6"
      >
        SignUp
      </button>

      <span>
        Already have an account?{" "}
        <button className={styles.login} onClick={() => navigate("/login")}>
          Log In
        </button>
      </span>

      {error !== "" ? <p className={styles.errorMessage}>{error}</p> : ""}
    </div>
  );
}

export default Signup;
