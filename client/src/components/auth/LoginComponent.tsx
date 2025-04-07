import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const loginSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginInputs = z.infer<typeof loginSchema>;

const LoginComponent: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginInputs>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit: SubmitHandler<LoginInputs> = (data) => {
		// Implement login logic here
		console.log("Login submitted:", data);
	};

	return (
		<div className='flex items-center justify-center h-screen bg-gray-100'>
			<div className='bg-white p-8 rounded shadow-md w-96'>
				<h2 className='text-2xl font-semibold mb-6 text-center'>Login</h2>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className='mb-4'>
						<label
							className='block text-gray-700 text-sm font-bold mb-2'
							htmlFor='email'
						>
							Email
						</label>
						<input
							type='email'
							id='email'
							{...register("email")}
							className='w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300'
						/>
						{errors.email && (
							<p className='text-red-500 text-xs mt-1'>
								{errors.email.message}
							</p>
						)}
					</div>
					<div className='mb-6'>
						<label
							className='block text-gray-700 text-sm font-bold mb-2'
							htmlFor='password'
						>
							Password
						</label>
						<input
							type='password'
							id='password'
							{...register("password")}
							className='w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300'
						/>
						{errors.password && (
							<p className='text-red-500 text-xs mt-1'>
								{errors.password.message}
							</p>
						)}
					</div>
					<button
						type='submit'
						className='w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
					>
						Login
					</button>
				</form>
			</div>
		</div>
	);
};

export default LoginComponent;
