"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { setTheme } = useTheme()
  const [btnTheme, setBtnTheme] = React.useState<string>(localStorage.getItem('theme') ? localStorage.getItem('theme') as 'dark' | 'light' : 'dark')
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => {
        setTheme(btnTheme === 'dark' ? 'light' : 'dark');
        setBtnTheme(btnTheme === 'dark' ? 'light' : 'dark')
      }}
      className="h-[1.2rem] w-[1.2rem] bg-transparent hover:bg-secondary p-[14px]"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
