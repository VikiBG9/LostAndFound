import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { buttonVariants } from "./ui/button";
import { Menu } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { LogoIcon } from "./Icons";

interface RouteProps {
  path: string;
  label: string;
}

interface NavbarProps {
  user: string | null;
  setUser: (user: string | null) => void;
}

export const Navbar = ({ user, setUser }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const routeList: RouteProps[] = [
    { path: "/", label: "Home" },
    { path: "/report-lost", label: "Report Lost" },
    { path: "/report-found", label: "Report Found" },
    ...(user
      ? []
      : [
          { path: "/login", label: "Login" },
          { path: "/register", label: "Register" },
        ]),
    { path: "/faq", label: "FAQ" },
  ];

  const handleLogout = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/logout", {}, { withCredentials: true });
      console.log(response.data);
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-background border-b">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container flex justify-between h-14 px-4">
          <NavigationMenuItem>
            <Link to="/" className="font-bold text-xl flex">
              <LogoIcon />
              Lost&Found
            </Link>
          </NavigationMenuItem>

          {/* Mobile Menu */}
          <span className="flex md:hidden">
            <ModeToggle />

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="px-2">
                <Menu className="flex md:hidden h-5 w-5" onClick={() => setIsOpen(true)}>
                  <span className="sr-only">Menu Icon</span>
                </Menu>
              </SheetTrigger>

              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl">Lost&Found</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                  {routeList.map(({ path, label }) => (
                    <Link
                      key={label}
                      to={path}
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      {label}
                    </Link>
                  ))}
                  {/* Logout Button */}
                  {user && ( <button
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                    className={buttonVariants({ variant: "ghost" })}
                  >
                    Logout
                  </button> )}
                </nav>
              </SheetContent>
            </Sheet>
          </span>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-2">
            {routeList.map(({ path, label }) => (
              <Link key={path} to={path} className={buttonVariants({ variant: "ghost" })}>
                {label}
              </Link>
            ))}
            {/* Logout Button */}
            {user && ( <button onClick={handleLogout} className={buttonVariants({ variant: "ghost" })}>
              Logout
            </button>)}
          </nav>

          <div className="hidden md:flex gap-2">
            <a
              href="https://github.com/VikiBG9/LostAndFound"
              target="_blank"
              rel="noopener noreferrer"
              className={`border ${buttonVariants({ variant: "secondary" })}`}
            >
              <GitHubLogoIcon className="mr-2 w-5 h-5" />
              Github
            </a>
            <ModeToggle />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
