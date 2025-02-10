// import React, { useState } from 'react';
// import { Form, Button, Container, Row, Col } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import './WorkerRegistrationForm.css';

// function RegistrationForm() {
//   const [step, setStep] = useState(1);
//   const [role, setRole] = useState('');
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     password: '',
//     city: '',
//     state: '',
//     pincode: '',
//   });

//   const navigate = useNavigate();

//   const handleRoleSelection = (selectedRole) => {
//     setRole(selectedRole);
//     if (selectedRole === 'Worker') {
//       navigate('/worker-register'); // Navigate to Worker Registration
//     } else {
//       setStep(2); // Proceed to User Registration
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log({ role, ...formData });
//     // You can add the logic to handle registration or API calls here
//   };

//   return (
//     <Container>
//       <Row className="justify-content-md-center">
//         <Col md="6">
//           <h2>Register</h2>
//           <br />
//           {step === 1 && (
//             <div>
//               <h3>Register as:</h3>
//               <Button variant="primary" className="me-2" onClick={() => handleRoleSelection('User')}>
//                 User
//               </Button>
//               <Button variant="secondary" onClick={() => handleRoleSelection('Worker')}>
//                 Worker
//               </Button>
//             </div>
//           )}
//           {step === 2 && (
//             <Form onSubmit={handleSubmit}>
//               <Form.Group controlId="formName">
//                 <Form.Label>Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter your name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                 />
//               </Form.Group>

//               <Form.Group controlId="formEmail">
//                 <Form.Label>Email</Form.Label>
//                 <Form.Control
//                   type="email"
//                   placeholder="Enter your email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                 />
//               </Form.Group>

//               <Form.Group controlId="formPhone">
//                 <Form.Label>Phone</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter your phone number"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                 />
//               </Form.Group>

//               <Form.Group controlId="formPassword">
//                 <Form.Label>Password</Form.Label>
//                 <Form.Control
//                   type="password"
//                   placeholder="Enter your password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                 />
//               </Form.Group>

//               <Form.Group controlId="formCity">
//                 <Form.Label>City</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter your city"
//                   name="city"
//                   value={formData.city}
//                   onChange={handleChange}
//                 />
//               </Form.Group>

//               <Form.Group controlId="formState">
//                 <Form.Label>State</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter your state"
//                   name="state"
//                   value={formData.state}
//                   onChange={handleChange}
//                 />
//               </Form.Group>

//               <Form.Group controlId="formPincode">
//                 <Form.Label>Pincode</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter your pincode"
//                   name="pincode"
//                   value={formData.pincode}
//                   onChange={handleChange}
//                 />
//               </Form.Group>

//               <Button variant="primary" type="submit">
//                 Register
//               </Button>
//             </Form>
//           )}
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default RegistrationForm;

import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './WorkerRegistrationForm.css';

function RegistrationForm() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === 'Worker') {
      navigate('/worker-register'); // Navigate to Worker Registration
    } else {
      setStep(2); // Proceed to User Registration
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!formData.pincode) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must be a 6-digit number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log({ role, ...formData });
      // Add logic to handle registration (e.g., API call)
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="6">
          <h2>Register</h2>
          <br />
          {step === 1 && (
            <div>
              <h3>Register as:</h3><br></br>
              <Button variant="primary" className="me-2" onClick={() => handleRoleSelection('User')}>
                User
              </Button><br></br><br></br><br></br>
              <Button variant="primary" className="me-2" onClick={() => handleRoleSelection('Worker')}>
                Worker
              </Button>
            </div>
          )}
          {step === 2 && (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your phone number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  isInvalid={!!errors.phone}
                />
                <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formState">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formPincode">
                <Form.Label>Pincode</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  isInvalid={!!errors.pincode}
                />
                <Form.Control.Feedback type="invalid">{errors.pincode}</Form.Control.Feedback>
              </Form.Group>

              <Button variant="primary" type="submit">
                Register
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default RegistrationForm;
