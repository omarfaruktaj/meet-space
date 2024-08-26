import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import SidebarNav from "./sidebar-nav";
import Logo from "../ui/logo";

export default function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <SheetTitle />
        <div className="flex items-center gap-2 text-lg font-semibold">
          <Logo />
        </div>
        <SidebarNav />
      </SheetContent>
    </Sheet>
  );
}
