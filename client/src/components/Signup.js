import React, { useState } from 'react';
import { Form, Button, Container, Alert, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    organizationName: '' // Only for organizer
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // ✅ added loading state
  const navigate = useNavigate();

  // ✅ Added validation function
  const validateField = (fieldName, value) => {
    let error = '';

    switch (fieldName) {
      case 'username':
        if (!value.trim()) error = 'Username is required';
        break;
      case 'phone':
        if (!/^\d{10}$/.test(value)) error = 'Phone must be 10 digits';
        break;
      case 'email':
        if (!/\S+@\S+\.\S+/.test(value)) error = 'Invalid email';
        break;
      case 'password':
        if (value.length < 6) error = 'Password must be at least 6 characters';
        break;
      case 'confirmPassword':
        if (value !== formData.password) error = 'Passwords do not match';
        break;
      case 'role':
        if (!value) error = 'Role is required';
        break;
      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [fieldName]: error
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    validateField(name, value); // live validation
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    Object.keys(formData).forEach((field) => validateField(field, formData[field]));

    if (Object.values(errors).some((err) => err)) {
      return; // Don't submit if there are errors
    }

    setLoading(true);
    console.log('Signup data:', formData);

    // Fake delay for signup simulation
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <Container className="login-container">
      <Card className="login-card">
        <Card.Body>
          <h2 className="text-center mb-4">Create Your Account</h2>
          {Object.values(errors).some((err) => err) && (
            <Alert variant="danger" className="text-center">
              Please fix the errors before submitting
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            {/* Username */}
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              {errors.username && <small className="text-danger">{errors.username}</small>}
            </Form.Group>

            {/* Phone */}
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              {errors.phone && <small className="text-danger">{errors.phone}</small>}
            </Form.Group>

            {/* Email */}
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <small className="text-danger">{errors.email}</small>}
            </Form.Group>

            {/* Password */}
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {errors.password && <small className="text-danger">{errors.password}</small>}
            </Form.Group>

            {/* Confirm Password */}
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              {errors.confirmPassword && (
                <small className="text-danger">{errors.confirmPassword}</small>
              )}
            </Form.Group>

            {/* Role Selection */}
            <Form.Group className="mb-3">
              <Form.Label>Registering as:</Form.Label>
              <div>
                <Form.Check
                  type="radio"
                  label="Organizer"
                  name="role"
                  value="Organizer"
                  checked={formData.role === 'Organizer'}
                  onChange={handleChange}
                  inline
                />
                <Form.Check
                  type="radio"
                  label="Attendee"
                  name="role"
                  value="Attendee"
                  checked={formData.role === 'Attendee'}
                  onChange={handleChange}
                  inline
                />
              </div>
              {errors.role && <small className="text-danger">{errors.role}</small>}
            </Form.Group>

            <div className="d-grid gap-2 mb-4">
              <Button variant="primary" type="submit" size="lg" disabled={loading}>
                {loading ? 'Signing up...' : 'Sign Up'}
              </Button>
            </div>

            <div className="text-center">
              Already have an account? <Link to="/login">Log In</Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Signup;
