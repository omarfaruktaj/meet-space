import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  onClick?: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <Button
      onClick={handleClick}
      variant="outline"
      size="sm"
      className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
    >
      <ArrowLeft className="h-5 w-5" />
      <span>Back</span>
    </Button>
  );
};

export default BackButton;
