import MobileSidebar from "./mobile-sidebar";
import UserProfile from "../user-profile";

export default function Topbar() {
  return (
    <header className="flex h-14 items-center justify-between md:justify-end gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <MobileSidebar />
      <UserProfile />
    </header>
  );
}
