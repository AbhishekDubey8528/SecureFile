import { useLocation, Link } from "wouter";
import { cn } from "@/lib/utils";
import { useAuth } from "@/utils/auth";
import { 
  Shield, 
  Home, 
  File, 
  Share, 
  Users, 
  Clock, 
  Trash,
  UserCheck,
  BarChart2,
  Settings,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const routes = [
  {
    label: "Dashboard",
    icon: Home,
    href: "/",
  },
  {
    label: "My Files",
    icon: File,
    href: "/my-files",
  },
  {
    label: "Shared with Me",
    icon: Share,
    href: "/shared-files",
  },
  {
    label: "Team Files",
    icon: Users,
    href: "/team-files",
  },
  {
    label: "Security Settings",
    icon: Shield,
    href: "/mfa-setup",
  },
  {
    label: "Trash",
    icon: Trash,
    href: "/trash",
  },
];

interface SidebarProps {
  showMobile: boolean;
  onCloseMobile: () => void;
}

export function Sidebar({ showMobile, onCloseMobile }: SidebarProps) {
  const { logout } = useAuth();
  const [pathname] = useLocation();
  
  return (
    <div className={cn("pb-12 min-h-[calc(100vh-2rem)] my-4 ml-4 w-56 rounded-3xl glass-panel fixed relative md:block")}>
      <div className="space-y-4 py-4">
        <div className="px-2 py-2">
          <h2 className="mb-8 mt-4 px-3 text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-primary to-purple-400">SecureFiles</h2>
          <div className="space-y-1">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={pathname === route.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start text-sm transition-all duration-300",
                  pathname === route.href 
                    ? "bg-primary/20 text-primary hover:bg-primary/30 shadow-[inset_0_0_10px_rgba(124,58,237,0.2)]" 
                    : "text-foreground/70 hover:text-foreground hover:bg-background/40"
                )}
                asChild
              >
                <Link to={route.href}>
                  <route.icon className="mr-2 h-4 w-4" />
                  {route.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="px-3 py-2 absolute bottom-4 w-full">
        <Button
          variant="ghost"
          className="w-full justify-start text-sm text-slate-300 hover:text-white hover:bg-slate-800"
          onClick={() => logout()}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}

interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

function NavLink({ href, icon, label, isActive }: NavLinkProps) {
  return (
    <Link href={href}>
      <a 
        className={cn(
          "block py-2.5 px-4 rounded transition duration-200 flex items-center",
          isActive ? "bg-gray-900 text-white" : "hover:bg-gray-700"
        )}
      >
        <span className="w-6">{icon}</span>
        <span>{label}</span>
      </a>
    </Link>
  );
}
