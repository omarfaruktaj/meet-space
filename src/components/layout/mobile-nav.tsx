import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { AlignLeft } from "lucide-react";
import Logo from "../ui/logo";
import MainNav from "./main-nav";
export default function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <AlignLeft />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="mb-4">
          <SheetTitle>
            <div className="flex items-start mb-3">
              <Logo />
            </div>
          </SheetTitle>
        </SheetHeader>

        <div className="mp-10">
          <MainNav />
        </div>
      </SheetContent>
    </Sheet>
  );
}
