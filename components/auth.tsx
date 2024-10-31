'use client';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LogIn, 
  LogOut, 
  UserPlus, 
  Mail, 
  Lock, 
  Shield,
  Key,
  AlertCircle,
  CheckCircle2,
  Wallet
} from 'lucide-react';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const { signup, login, logout, user } = useAuth();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      await signup(email, password);
      setMessage('Successfully signed up!');
      setEmail('');
      setPassword('');
    } catch (error: any) {
      setError(error.message || 'Error signing up');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      await login(email, password);
      setMessage('Successfully logged in!');
      setEmail('');
      setPassword('');
    } catch (error: any) {
      setError(error.message || 'Error logging in');
    }
  };

  if (user) {
    return (
      <div className="fixed top-4 right-4 z-50 flex items-center gap-4 glass p-2 rounded-full shadow-lg animate-float">
        <div className="flex items-center gap-2 px-3">
          <Shield className="w-4 h-4 text-success" />
          <span className="text-sm font-medium text-foreground">
            {user.email}
          </span>
        </div>
        <Button
          onClick={logout}
          variant="outline"
          size="sm"
          className="rounded-full bg-gradient-primary hover:opacity-90 text-white transition-all duration-300"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    );
  }

  return (
    <Card className="max-w-md mx-auto mt-8 shadow-lg border-t-4 border-t-primary glass">
      <CardHeader className="space-y-1">
        <div className="flex justify-center mb-4">
          <Wallet className="w-12 h-12 text-primary animate-float" />
        </div>
        <CardTitle className="text-2xl text-center font-heading">
          Welcome to Expense Tracker
        </CardTitle>
        <p className="text-center text-muted-foreground">
          Manage your expenses with ease
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger 
              value="login" 
              className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground"
            >
              <Key className="w-4 h-4 mr-2" />
              Login
            </TabsTrigger>
            <TabsTrigger 
              value="signup" 
              className="data-[state=active]:bg-gradient-accent data-[state=active]:text-accent-foreground"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Sign Up
            </TabsTrigger>
          </TabsList>

          {error && (
            <div className="mb-4 p-3 text-sm text-destructive-foreground bg-destructive/10 rounded-md flex items-center">
              <AlertCircle className="w-4 h-4 mr-2 text-destructive" />
              {error}
            </div>
          )}
          {message && (
            <div className="mb-4 p-3 text-sm text-success bg-success/10 rounded-md flex items-center">
              <CheckCircle2 className="w-4 h-4 mr-2 text-success" />
              {message}
            </div>
          )}

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90">
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                <UserPlus className="w-4 h-4 mr-2" />
                Sign Up
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
} 