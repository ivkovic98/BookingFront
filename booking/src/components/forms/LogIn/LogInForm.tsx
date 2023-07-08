import "./LogInForm.css";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../../services/api/authentication-api.services";
import { useState } from "react";
import { LoginModel } from "../../../models/Login";

function LogInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const loginPressed = (e: { preventDefault: any }) => {
    e.preventDefault();
    var loginData = { email: email, password: password, rememberMe: rememberMe } as LoginModel;
    loginApi(loginData)
      .then((result: any) => {
        localStorage.setItem("token", result.token);
        navigate("home-page");
      })
      .catch((error: string) => alert(error));
  };

  const handleEmailChanged = (e: { target: { value: any } }) => {
    const { value } = e.target;
    setEmail(value);
  };

  const handlePasswordChanged = (e: { target: { value: any } }) => {
    const { value } = e.target;
    setPassword(value);
  };

  const handleRememberMe = () => {
    setRememberMe((prev) => !prev);
  };

  const handleRegisterPressed = () => {
    window.location.href = "/register";
  };

  return (
    <form className="login-form">
      <h2>Log In</h2>
      <Form.Group className="mb-3" style={{ width: "100%" }} controlId="formGroupEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmailChanged} />
      </Form.Group>
      <Form.Group className="mb-3" style={{ width: "100%" }} controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={handlePasswordChanged} />
      </Form.Group>
      <Form.Check type="switch" id="custom-switch" label="Remember me" onChange={handleRememberMe} />
      <Button className="submit-button" variant="primary" type="submit" onClick={loginPressed}>
        Log In
      </Button>
      <p className="register-label" onClick={handleRegisterPressed}>
        New to booking? <u>Register here.</u>
      </p>
    </form>
  );
}

export default LogInForm;
