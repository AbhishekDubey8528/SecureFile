import { useState } from "react";
import { Menu, Search, Bell, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/utils/auth";
import { ThemeToggle } from "@/components/theme-toggle";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { user } = useAuth();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Searching for:", searchQuery);
  };
  
  return (
    <header className="glass-panel flex items-center justify-between px-8 py-4 mx-8 mt-6 rounded-2xl">
      <div className="flex items-center md:hidden">
        <Button variant="ghost" size="icon" onClick={onMenuClick} className="text-slate-600 hover:text-slate-900">
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      
      <form onSubmit={handleSearch} className="relative w-full max-w-xl hidden md:block">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
        <Input 
          type="text" 
          className="pl-10 pr-4 py-2 w-full rounded-xl border border-white/20 bg-background/40 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors shadow-inner" 
          placeholder="Search files and folders..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>
      
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="text-slate-600 hover:text-slate-900 hover:bg-slate-100">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-slate-600 hover:text-slate-900 hover:bg-slate-100">
          <HelpCircle className="h-5 w-5" />
        </Button>
        <ThemeToggle />
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-medium shadow-lg hover:shadow-primary/50 transition-shadow">
          {user?.username?.charAt(0).toUpperCase() || "U"}
        </div>
      </div>
    </header>
  );
}
