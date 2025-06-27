
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  GraduationCap, 
  Home, 
  BookOpen, 
  MessageSquare, 
  User, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

const Navigation = () => {
  const { user, setUser, isTeacher } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    setUser(null);
    toast({
      title: "See you later! 👋",
      description: "You've been logged out successfully",
    });
    navigate('/');
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(part => part[0]).join('').toUpperCase();
  };

  const navItems = [
    {
      name: 'Dashboard',
      path: isTeacher ? '/teacher' : '/student',
      icon: Home
    },
    {
      name: 'Classroom Board',
      path: '/classroom',
      icon: MessageSquare
    }
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  if (!user) return null;

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <GraduationCap className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-800">ClassConnect</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActivePath(item.path) ? "default" : "ghost"}
                  className={`flex items-center space-x-2 ${
                    isActivePath(item.path) 
                      ? "bg-indigo-600 text-white hover:bg-indigo-700" 
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Button>
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {/* User Info */}
            <div className="hidden sm:flex items-center space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-indigo-100 text-indigo-600 text-sm">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-medium text-gray-700">{user.name}</p>
                <p className="text-gray-500 capitalize">{user.role}</p>
              </div>
            </div>

            {/* Logout Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="hidden sm:flex items-center space-x-2 text-gray-600 border-gray-300 hover:bg-gray-50"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t bg-white">
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link 
                  key={item.path} 
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button
                    variant={isActivePath(item.path) ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      isActivePath(item.path) 
                        ? "bg-indigo-600 text-white" 
                        : "text-gray-600"
                    }`}
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Button>
                </Link>
              ))}
              
              {/* Mobile User Info */}
              <div className="pt-4 border-t mt-4">
                <div className="flex items-center space-x-3 px-3 py-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-indigo-100 text-indigo-600 text-sm">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <p className="font-medium text-gray-700">{user.name}</p>
                    <p className="text-gray-500 capitalize">{user.role}</p>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="w-full justify-start text-gray-600 mt-2"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
