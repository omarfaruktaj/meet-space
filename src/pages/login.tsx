import LoginForm from "@/features/user/components/login-form";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="min-w-96 rounded-md shadow-md p-6">
      <h3 className="text-2xl font-bold text-center">Log in</h3>

      <LoginForm />

      <p className="mt-4">
        Don't have an account?{" "}
        <Link className="text-primary" to="/signup">
          Sign up
        </Link>
      </p>
    </div>
  );
}
