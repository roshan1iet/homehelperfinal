import React, { useState } from 'react';
import validator from 'validator';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './LoginForm.css'; 
import { Link } from 'react-router-dom';
function LoginA() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationMessage, setValidationMessage] = useState("");
  const [messageColor, setMessageColor] = useState("black");
  const navigate = useNavigate(); // Initialize useNavigate hook

  const validatePassword = (value) => {
    if (validator.isStrongPassword(value, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    })) {
      setValidationMessage("Password is Strong!");
      setMessageColor("green");
    } else {
      setValidationMessage("Please use a mix of uppercase, lowercase letters, numbers, and symbols.");
      setMessageColor("red");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validatePassword(password);
    if (validator.isStrongPassword(password)) {
      console.log('Email:', email);
      console.log('Password:', password);
      // After successful login, redirect to the role selection page
      navigate('/role-selection');
    } else {
      console.log('Password is not strong enough.');
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="4">
          <div className="card">
            <h2>Login</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail"><br></br><br></br>
                <Form.Label>Email address</Form.Label><br></br><br></br>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group><br></br>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label><br></br><br></br>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validatePassword(e.target.value);
                  }}
                /><br></br>
                <p className="validation-message" style={{ color: messageColor }}>{validationMessage}</p>
              </Form.Group>
              <br></br><br></br>
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Form><br></br>
            <p className="mt-3">
              Don't have an account? <li><Link to="/RegistrationForm">Register Here</Link></li>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginA;
