import "./LogIn/LogInForm.css";
import { Button, Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { registerGuestApi, registerManagerApi } from "../../services/api/authentication-api.services";
import { RegisterManagerModel } from "../../models/Manager";
import { EMAIL_REGEX, LETTERS_REGEX, PHONE_REGEX } from "../../constants";
import { RegisterGuestModel } from "../../models/Guest";

function RegisterForm() {
  const hotelId = useParams().hotelId;

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);

  const [surname, setSurname] = useState("");
  const [surnameError, setSurnameError] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState(false);

  const [formValid, setformValid] = useState(false);

  const handleNameChange = (e: { target: { value: any } }) => {
    const { value } = e.target;
    setNameError(!LETTERS_REGEX.test(value));
    setName(value);
  };

  const handleSurnameChanged = (e: { target: { value: any } }) => {
    const { value } = e.target;
    setSurnameError(!LETTERS_REGEX.test(value));
    setSurname(value);
  };

  const handleEmailChanged = (e: { target: { value: any } }) => {
    const { value } = e.target;
    setEmailError(!EMAIL_REGEX.test(value));
    setEmail(value);
  };

  const handlePhoneChanged = (e: { target: { value: any } }) => {
    const { value } = e.target;
    setPhoneError(!PHONE_REGEX.test(value));
    setPhoneNumber(value);
  };

  const handlePasswordChanged = (e: any) => {
    const { value } = e.target;
    setPasswordError(value.length < 4 ? true : false);
    setPassword(value);
  };

  const handleConfirmPasswordChange = (e: { target: { value: any } }) => {
    const { value } = e.target;
    setConfirmPassword(value);
  };

  const registerPressed = (e: any) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    if (validateForm()) {
      var registerModel = {
        email: email,
        password: password,
        name: name,
        surname: surname,
        phoneNumber: phoneNumber,
      } as RegisterGuestModel;

      if (hotelId) {
        var registerManagerModel = {
          ...registerModel,
          hotelId: hotelId,
        } as RegisterManagerModel;
        registerManagerApi(registerManagerModel)
          .then((data) => {
            window.location.href = "/";
          })
          .catch((error) => alert(error));
      } else {
        registerGuestApi(registerModel)
          .then((data) => {
            window.location.href = "/";
          })
          .catch((error) => alert(error));
      }
    }
  };

  const validateForm = () => {
    if (
      !email ||
      !name ||
      !surname ||
      !password ||
      !phoneNumber ||
      emailError ||
      nameError ||
      surnameError ||
      passwordError ||
      phoneError ||
      password !== confirmPassword
    ) {
      setformValid(false);
      return false;
    } else {
      setformValid(true);
      return true;
    }
  };

  return (
    <Form noValidate validated={formValid} className="login-form" onSubmit={registerPressed}>
      <h2>Register</h2>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Row>
          <Col>
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              isValid={name ? true : false}
              isInvalid={nameError}
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={handleNameChange}
            />
            <Form.Control.Feedback type="invalid">Please enter name using only letters</Form.Control.Feedback>
          </Col>
          <Col>
            <Form.Label>Surname</Form.Label>
            <Form.Control
              isValid={surname ? true : false}
              required
              isInvalid={surnameError}
              type="text"
              placeholder="Enter surname"
              value={surname}
              onChange={handleSurnameChanged}
            />
            <Form.Control.Feedback type="invalid">Please enter surname using only letters</Form.Control.Feedback>
          </Col>
        </Row>
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          isValid={phoneNumber ? true : false}
          isInvalid={phoneError}
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={handlePhoneChanged}
        />
        <Form.Control.Feedback type="invalid">Phone number cannot contain letters</Form.Control.Feedback>

        <Form.Label>Email address</Form.Label>
        <Form.Control
          isValid={email ? true : false}
          isInvalid={emailError}
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={handleEmailChanged}
        />
        <Form.Control.Feedback type="invalid">Invalid email format</Form.Control.Feedback>

        <Row>
          <Col>
            <Form.Label>Password</Form.Label>
            <Form.Control
              isValid={password ? true : false}
              isInvalid={passwordError}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={handlePasswordChanged}
            />
            <Form.Control.Feedback type="invalid">Password must be at least 5 characters long</Form.Control.Feedback>
          </Col>

          <Col>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              isValid={confirmPassword ? true : false}
              isInvalid={password !== confirmPassword}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <Form.Control.Feedback type="invalid">Passwords do not match</Form.Control.Feedback>
          </Col>
        </Row>
        <p className="show-password" onClick={(prev) => setShowPassword((prev) => !prev)}>
          {showPassword ? "hide" : "show"} password
        </p>
      </Form.Group>
      <Button className="submit-button" variant="primary" type="submit">
        Register
      </Button>
      <p className="register-label" onClick={() => (window.location.pathname = "/")}>
        Already have an account? <u>Log in.</u>
      </p>
    </Form>
  );
}

export default RegisterForm;
