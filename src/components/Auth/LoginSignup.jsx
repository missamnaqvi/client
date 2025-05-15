import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  User,
  Lock,
  Mail,
  Phone,
  Building,
  UserPlus,
  LogIn,
} from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/authSlice";

// Authentication Tabs
const AuthTabs = {
  LOGIN: "login",
  REGISTER: "register",
  PG_OWNER_REGISTER: "pg_owner_register",
};

// Role Selection Options
const UserRoles = [
  {
    value: "resident",
    label: "Resident",
    description: "Looking for a PG accommodation",
  },
  {
    value: "pg_owner",
    label: "PG Owner",
    description: "List and manage your PG properties",
  },
];

const AuthenticationModule = () => {
  const [activeTab, setActiveTab] = useState(AuthTabs.LOGIN);
  const [selectedRole, setSelectedRole] = useState(null);
  const [loginError, setLoginError] = useState("");
  const [registrationError, setRegistrationError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  // Role Selection Handler
  const handleRoleSelection = (role) => {
    setSelectedRole(role);
  };

  // Login Submission Handler
  const handleLogin = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        data,
        { withCredentials: true } // Include credentials to handle cookies
      );

      if (response?.data?.message === "Login successful") {
        toast.success(response.data.message);

        // console.log("reponse", response.data);
        // Dispatch action to save user details to Redux store
        dispatch(setUser(response.data.user));

        // Redirect or additional actions
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response.data.message || "Login failed. Please try again.";
        toast.error(errorMessage);
        setLoginError(errorMessage);
      } else {
        toast.error("A network error occurred. Please try again.");
      }
    }
  };

  // Registration Submission Handler
  const handleRegistration = async (data) => {
    // Validate passwords match
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Validate role selection
    if (!selectedRole) {
      toast.error("Please select a user role");
      return;
    }

    // Prepare user data for the API call
    const userData = {
      ...data,
      role: selectedRole.value,
    };

    try {
      // Make the API request
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        userData
      );

      // Display success message
      toast.success(response.data.message || "User registered successfully!");
      setRegistrationError(null);

      // Handle post-registration actions (e.g., redirect)
      // Example: Redirect to login page
      navigate("/login");
    } catch (error) {
      if (error.response) {
        // Handle errors from the backend
        const { status, data } = error.response;
        const errorMessage =
          data.message || "Registration failed. Please try again.";

        if (status === 400) {
          toast.error("Please fill in all required fields.");
        } else if (status === 409) {
          toast.error(errorMessage); // Handle duplicate email/contact number
        } else if (status === 500) {
          toast.error("A server error occurred. Please try again later.");
        } else {
          toast.error(errorMessage);
        }

        setRegistrationError(errorMessage);
      } else {
        // Handle network or client-side errors
        toast.error("A network error occurred. Please check your connection.");
        setRegistrationError("Network error. Please try again later.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-4xl flex overflow-hidden">
        {/* Left Side - Illustration */}
        <div className="w-1/2 bg-gradient-to-br from-blue-500 to-purple-600 text-white p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Welcome to PG Management</h2>
          <p className="text-lg mb-8">
            Find your perfect accommodation, manage your PG, or simplify your
            property operations.
          </p>
          <div className="space-y-4">
            {UserRoles.map((role) => (
              <div
                key={role.value}
                onClick={() => handleRoleSelection(role)}
                className={`p-3 rounded-lg border-2 transition-all duration-300 cursor-pointer ${
                  selectedRole?.value === role.value
                    ? "border-white bg-white/20"
                    : "border-transparent hover:bg-white/10"
                }`}
              >
                <h3 className="font-semibold">{role.label}</h3>
                <p className="text-sm opacity-75">{role.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Authentication Form */}
        <div className="w-1/2 p-12">
          {/* Tab Navigation */}
          <div className="flex mb-8 bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setActiveTab(AuthTabs.LOGIN)}
              className={`flex-1 py-2 rounded-full flex items-center justify-center ${
                activeTab === AuthTabs.LOGIN
                  ? "bg-blue-500 text-white"
                  : "text-gray-500 hover:bg-gray-200"
              }`}
            >
              <LogIn className="mr-2" />
              Login
            </button>
            <button
              onClick={() => setActiveTab(AuthTabs.REGISTER)}
              className={`flex-1 py-2 rounded-full flex items-center justify-center ${
                activeTab === AuthTabs.REGISTER
                  ? "bg-blue-500 text-white"
                  : "text-gray-500 hover:bg-gray-200"
              }`}
            >
              <UserPlus className="mr-2" /> Register
            </button>
          </div>

          {/* Login Form */}
          {activeTab === AuthTabs.LOGIN && (
            <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("email", { required: "Email is required" })}
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
              </div>
              {loginError && (
                <p className="text-red-500 text-sm">{loginError}</p>
              )}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Login
              </button>
            </form>
          )}

          {/* Registration Form */}
          {activeTab === AuthTabs.REGISTER && (
            <form
              onSubmit={handleSubmit(handleRegistration)}
              className="space-y-6"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="name"
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("name", {
                      required: "name is required",
                    })}
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("contactNumber", {
                      required: "Phone number is required",
                    })}
                  />
                </div>
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("email", { required: "Email is required" })}
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                  })}
                />
              </div>

              {/* Role Selection */}
              <div className="grid grid-cols-3 gap-2">
                {UserRoles.map((role) => (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => handleRoleSelection(role)}
                    className={`py-2 rounded-lg border-2 transition-all duration-300 ${
                      selectedRole?.value === role.value
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {role.label}
                  </button>
                ))}
              </div>

              {registrationError && (
                <p className="text-red-500 text-sm">{registrationError}</p>
              )}

              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Create Account
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthenticationModule;
