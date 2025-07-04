import React, { useState } from 'react';
import { ArrowRight, Mail, Lock, User } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '@/lib/api';

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Call the register API endpoint
      await authService.register(credentials.username, credentials.email, credentials.password);
      
      toast({
        title: "Success",
        description: "Your account has been created successfully. Please log in.",
        variant: "default",
      });
      
      // Navigate to login page
      navigate('/login', { replace: true });
    } catch (error: any) {
      // Handle registration error
      const errorMessage = error.response?.data?.error || "Registration failed. Please try again.";
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="w-full max-w-md opacity-0 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
      <div className="mb-8 opacity-0 animate-slideUp" style={{ animationDelay: '0.3s' }}>
        <h2 className="text-2xl font-semibold mb-2">Create Your Account</h2>
        <p className="text-sm text-gray-500">Fill in your details to get started</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2 opacity-0 animate-slideUp" style={{ animationDelay: '0.4s' }}>
          <label htmlFor="username" className="block text-sm font-medium mb-1">
            Username
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <User size={18} className="text-tech-muted" />
            </div>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              placeholder="Enter your username"
              value={credentials.username}
              onChange={handleChange}
              className="input-field pl-10"
              required
            />
          </div>
        </div>

        <div className="space-y-2 opacity-0 animate-slideUp" style={{ animationDelay: '0.5s' }}>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Mail size={18} className="text-tech-muted" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              value={credentials.email}
              onChange={handleChange}
              className="input-field pl-10"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2 opacity-0 animate-slideUp" style={{ animationDelay: '0.6s' }}>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Create Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Lock size={18} className="text-tech-muted" />
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="Create a strong password"
              value={credentials.password}
              onChange={handleChange}
              className="input-field pl-10"
              required
            />
          </div>
        </div>
        
        <div className="pt-4 opacity-0 animate-slideUp" style={{ animationDelay: '0.7s' }}>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-auto group"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Create Account
                  <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              )}
            </button>
            <Link to="/login" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
              Already have an account? Login
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;