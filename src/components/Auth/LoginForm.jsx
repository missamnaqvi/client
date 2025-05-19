import React from "react";
import { useForm } from "react-hook-form";

function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("Form Data:", data);
        // Add login logic here (API call, token save, etc.)
    };

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="max-w-96 w-full mx-auto mt-10 p-6 border rounded shadow">
                <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full px-3 py-2 border rounded"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Invalid email address",
                                },
                            })}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 border rounded"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters",
                                },
                            })}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-700"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
