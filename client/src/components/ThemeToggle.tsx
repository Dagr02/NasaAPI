import { useTheme } from "@/contexts/ThemeContext"
import {Switch} from "@heroui/react"
import { MoonIcon, SunIcon } from "lucide-react";




const ThemeToggle: React.FC = () => {
    const {theme, toggleTheme} = useTheme();

    return(
        <Switch 
            checked={theme === "dark"}
            onChange={toggleTheme}
            size="lg"
            color="secondary"
            startContent={<SunIcon className="h-12 w-12 text-yellow-300"/>}
            endContent={<MoonIcon className="h-12 w-12 text-blue-300"/>}
        />
    )
}

export default ThemeToggle