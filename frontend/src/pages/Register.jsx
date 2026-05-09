import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData.name, formData.email, formData.password);
      toast.success('Registration successful');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-page-top">
        <div className="auth-brand">TaskOrbit</div>
      </div>
      <div className="auth-card fade-in">
        <h2 className="auth-title">Create an Account</h2>
        <form onSubmit={onSubmit}>
          <div className="input-group">
            <label className="input-label">Name</label>
            <input
              type="text"
              name="name"
              className="input-field"
              value={formData.name}
              onChange={onChange}
              required
            />
          </div>
          <div className="input-group">
            <label className="input-label">Email</label>
            <input
              type="email"
              name="email"
              className="input-field"
              value={formData.email}
              onChange={onChange}
              required
            />
          </div>
          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              type="password"
              name="password"
              className="input-field"
              value={formData.password}
              onChange={onChange}
              required
              minLength="6"
            />
          </div>
          <button type="submit" className="btn btn-primary w-full mt-4">
            Sign Up
          </button>
        </form>
        <p className="text-center mt-4 text-muted">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
