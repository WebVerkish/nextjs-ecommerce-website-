"use client"

import { Moon, Sun } from "lucide-react";
import {useTheme} from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if(!mounted) return null

  return (
    // <div>
    //   The current theme is: {theme}
    //   <button onClick={() => setTheme(theme === "dark"? "light":"dark")}>{theme === "light"? <Moon/> : <Sun/> }</button>
    //   <button onClick={() => setTheme('dark')}>Dark Mode</button>
    // </div>
    <button onClick={()=> setTheme(theme === "dark"? "light":"dark")} className="text-lime-700 dark:text-lime-500">
        {theme === "light"? <Moon/> : <Sun/> }
    </button>
  )
};