import { createContext, useContext, useEffect, useState } from "react";


type Theme = "light" | "dark"

interface ThemeContextTypes {
    theme: Theme
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextTypes | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>("dark")

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as Theme | null
        if(savedTheme){
            setTheme(savedTheme)
        }
    }, [])

    useEffect(() => {
        document.documentElement.classList.remove("light", "dark")
        document.documentElement.classList.add(theme)
        localStorage.setItem("theme", theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === "light" ? "dark" : "light")
    }

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if(context === undefined){
        throw new Error("useTheme must be used within a ThemeProvider")
    }
    return context
}