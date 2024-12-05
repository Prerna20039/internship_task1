import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state

    // Validate inputs
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Password cannot be empty.");
      return;
    }

    try {
      // Send login request to API
      const response = await axios.post("https://reqres.in/api/login", {
        email,
        password,
      });

      // On successful login, save the token and redirect to dashboard
      const { token } = response.data;
      localStorage.setItem("token", token);
      alert("Login successful!");
      window.location.href = "/dashboard"; // Replace with React Router navigation if used
    } catch (err) {
      // Handle login errors
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.imageContainer}>
          <img src="/image2.svg" alt="Login" style={styles.image} />
        </div>

        <div style={styles.formContainer}>
          <h2 style={styles.heading}>Admin Login</h2>

          {/* Email Input */}
          <div style={styles.inputGroup}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              placeholder="Enter your email"
            />
          </div>

          {/* Password Input */}
          <div style={styles.inputGroup}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder="Enter your password"
            />
          </div>

          {/* Error Message */}
          {error && <p style={styles.error}>{error}</p>}

          {/* Submit Button */}
          <button type="submit" style={styles.button}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100%",
    backgroundColor: "#f5f5f5",
  },
  form: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "30px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    width: "70%",
    height: "70%",
  },
  imageContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "500px",
    height: "500px",
    borderRadius: "5px",
  },
  formContainer: {
    flex: 2,
    paddingLeft: "20px",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: "20px",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#333",
    marginBottom: "8px",
    display: "block",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxSizing: "border-box", // Ensures padding is included in width
  },
  button: {
    width: "100%",
    padding: "12px",
    fontSize: "18px", // Larger text for better visibility
    backgroundColor: "#245CD0",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.2s", // Add hover effect
    marginTop: "20px",
  },
  buttonHover: {
    backgroundColor: "#0056b3", // Darker blue on hover
    transform: "scale(1.05)", // Slight zoom effect on hover
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginBottom: "10px",
  },
};

export default LoginForm;