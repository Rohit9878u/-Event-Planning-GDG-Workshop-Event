"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, LogOut, User } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("gdg_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("gdg_user")
    localStorage.removeItem("gdg_token")
    setUser(null)
    window.location.href = "/"
  }

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Events" },
    { href: "/events/create", label: "Create Event" },
  ]

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-gdg-blue" />
              <div className="h-3 w-3 rounded-full bg-gdg-red" />
              <div className="h-3 w-3 rounded-full bg-gdg-yellow" />
              <div className="h-3 w-3 rounded-full bg-gdg-green" />
            </div>
            <span className="text-lg font-semibold">GDG Workshop Manager</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === link.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="hidden items-center gap-4 md:flex">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <User className="h-4 w-4" />
                    {user.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="text-muted-foreground">{user.email}</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button size="sm">Login</Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="border-t border-border py-4 md:hidden">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium ${pathname === link.href ? "text-primary" : "text-muted-foreground"}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {user ? (
                <button onClick={handleLogout} className="text-left text-sm font-medium text-destructive">
                  Logout ({user.name})
                </button>
              ) : (
                <Link href="/login" className="text-sm font-medium text-primary" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
