"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Settings, LogOut, Plus, Home } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: Home },
  { name: "Blog Posts", href: "/admin/blog", icon: FileText },
  { name: "New Post", href: "/admin/blog/new", icon: Plus },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-card border-r min-h-screen p-4">
      <div className="space-y-8">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-2xl bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">KT</span>
          </div>
          <span className="font-semibold text-foreground">Admin</span>
        </div>

        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    isActive && "bg-primary text-primary-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.name}
                </Button>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <form action="/admin/logout" method="POST">
            <Button variant="ghost" className="w-full justify-start text-foreground hover:text-foreground" type="submit">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
