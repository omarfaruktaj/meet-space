import SignupForm from "@/features/user/components/signup-form";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="min-w-96 rounded-md shadow-md p-6">
      <h3 className="text-2xl font-bold text-center">Sign Up</h3>

      <SignupForm />

      <p
        className="mt-4
      "
      >
        Already have an account?{" "}
        <Link className="text-primary" to={"/login"}>
          login
        </Link>
      </p>
    </div>
  );
}
