import { ChevronLeft } from "lucide-react";
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
    <div className="mb-8">
      <Button
        onClick={handleClick}
        variant="ghost"
        size="sm"
        className="flex items-center space-x-2  "
      >
        <ChevronLeft className="h-5 w-5" />
        <span>Back</span>
      </Button>
    </div>
  );
};

export default BackButton;
