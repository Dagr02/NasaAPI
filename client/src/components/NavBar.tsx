import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react"
import { EarthIcon } from "lucide-react"
import ThemeToggle from "./ThemeToggle"
import { Link } from "react-router-dom"



const NavBar: React.FC = () => {

    return (
        <Navbar isBordered>
            <NavbarBrand>
                <EarthIcon />
                <span className="font-bold text-xl text-foreground text-glow">My App</span>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-10 text-foreground transition-colors duration-300" justify="center">
                <NavbarItem>
                    <Link to="/">
                        <span className="text-xl hover:text-primary"> Home </span>
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link to="/MRP">
                        <span className="text-xl hover:text-primary"> Mars Rover Photos </span>
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <ThemeToggle />
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}

export default NavBar