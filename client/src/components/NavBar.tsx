import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@heroui/react"
import { EarthIcon } from "lucide-react"
import ThemeToggle from "./ThemeToggle"
import { Link } from "react-router-dom"
import { useState } from "react"



const NavBar: React.FC = () => {
    const [isMenuOpen, setMenuOpen] = useState(false)
    return (
        <Navbar isBordered onMenuOpenChange={setMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle 
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />  
                <NavbarBrand>
                    <EarthIcon />
                    <span className="font-bold text-xl text-foreground text-glow">My App</span>
                </NavbarBrand>
            </NavbarContent>
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
                <NavbarItem>
                    <Link to="/NeoWs">
                        <span className="text-xl hover:text-primary"> Near Earth Objects </span>
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <ThemeToggle />
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu>    
                <NavbarMenuItem onClick={() => setMenuOpen(!isMenuOpen)}>
                    <Link to="/">
                        <span className="text-xl hover:text-primary"> Home </span>
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem onClick={() => setMenuOpen(!isMenuOpen)}>
                    <Link to="/MRP">
                        <span className="text-xl hover:text-primary"> Mars Rover Photos </span>
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem onClick={() => setMenuOpen(!isMenuOpen)}>
                    <Link to="/NeoWs">
                        <span className="text-xl hover:text-primary"> Near Earth Objects </span>
                    </Link>
                </NavbarMenuItem>
            </NavbarMenu>

        </Navbar>
    )
}

export default NavBar