import { Link } from "react-router-dom";
import { Button } from "./button";

export default function Logo() {
  return (
    <Button variant={"ghost"}>
      <Link to="/" className=" text-xl font-bold ">
        Meet Space
      </Link>
    </Button>
  );
}
