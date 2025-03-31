
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

// Define types for our user and context
export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  isAdmin?: boolean;
  isBanned?: boolean;
  status?: 'active' | 'banned';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Dummy users for testing
const dummyUsers = [
  {
    id: 'admin1',
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    isAdmin: true,
    isBanned: false,
    status: 'active' as const,
  },
  {
    id: 'user1',
    email: 'john@example.com',
    password: 'password123',
    name: 'John Doe',
    avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
    isAdmin: false,
    isBanned: false,
    status: 'active' as const,
  },
  {
    id: 'user2',
    email: 'jane@example.com',
    password: 'password123',
    name: 'Jane Smith',
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    isAdmin: false,
    isBanned: false,
    status: 'active' as const,
  },
  {
    id: 'banned1',
    email: 'banned@example.com',
    password: 'password123',
    name: 'Banned User',
    avatar: 'https://randomuser.me/api/portraits/men/55.jpg',
    isAdmin: false,
    isBanned: true,
    status: 'banned' as const,
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('auctionverse_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundUser = dummyUsers.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );
      
      if (foundUser) {
        const { password, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem('auctionverse_user', JSON.stringify(userWithoutPassword));
        
        toast({
          title: "Successfully logged in",
          description: `Welcome back, ${userWithoutPassword.name}!`,
        });
        
        // Redirect admin users to admin panel, regular users to home
        if (userWithoutPassword.isAdmin) {
          navigate('/admin');
        }
        
        return true;
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive"
        });
        return false;
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "An error occurred during login",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Signup function
  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userExists = dummyUsers.some(
        u => u.email.toLowerCase() === email.toLowerCase()
      );
      
      if (userExists) {
        toast({
          title: "Signup failed",
          description: "Email already exists",
          variant: "destructive"
        });
        return false;
      }
      
      // In a real app, we would save the user to a database
      // Here we just create a new user object
      const newUser = {
        id: `user${Date.now()}`,
        email,
        name,
        avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 70)}.jpg`,
        isAdmin: false,
        isBanned: false,
        status: 'active' as const,
      };
      
      setUser(newUser);
      localStorage.setItem('auctionverse_user', JSON.stringify(newUser));
      
      toast({
        title: "Account created",
        description: `Welcome to AuctionVerse, ${name}!`,
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Signup failed",
        description: "An error occurred during signup",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('auctionverse_user');
    setUser(null);
    navigate('/login');
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  const value = {
    user,
    isLoading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.isAdmin || false,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
