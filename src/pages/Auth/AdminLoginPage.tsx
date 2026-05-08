/**
 * Admin Login Page - Development Only
 * Supports both Super Admin and Moderator logins
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Lock, Shield, Users } from 'lucide-react';
import { login, getCurrentSession, isSuperAdmin } from '@/services/adminAuth';

export const AdminLoginPage: React.FC = () => {
  const [loginCode, setLoginCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Check if already authenticated
  useEffect(() => {
    const session = getCurrentSession();
    if (session) {
      // Redirect based on role
      if (session.role === 'super_admin') {
        navigate('/admin');
      } else {
        navigate('/admin/my-assignments');
      }
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Small delay for UX
    await new Promise(resolve => setTimeout(resolve, 300));

    const result = await login(loginCode);

    if (result.success && result.session) {
      // Redirect based on role
      if (result.session.role === 'super_admin') {
        navigate('/admin');
      } else {
        navigate('/admin/my-assignments');
      }
    } else {
      setError(result.error || 'Login failed. Please try again.');
      setLoginCode('');
    }

    setIsLoading(false);
  };

  return (
    <PageLayout title="Admin Login">
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-20 h-20 bg-indian-saffron/10 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-10 h-10 text-indian-saffron" />
            </div>
            <CardTitle className="text-3xl text-spiritual-800">Admin Access</CardTitle>
            <p className="text-spiritual-600 mt-2">
              Development Mode Only
            </p>
            <div className="mt-2 px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-xs text-yellow-800">
                <Lock className="w-3 h-3 inline mr-1" />
                This admin panel is only available in local development
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="loginCode" className="block text-sm font-medium text-spiritual-700 mb-2">
                  Login Code
                </label>
                <Input
                  id="loginCode"
                  type="password"
                  placeholder="Enter your login code..."
                  value={loginCode}
                  onChange={(e) => setLoginCode(e.target.value)}
                  className="text-center text-lg"
                  disabled={isLoading}
                  autoFocus
                />
                <p className="text-xs text-gray-500 mt-2 text-center">
                  <Users className="w-3 h-3 inline mr-1" />
                  Super Admin or Moderator code
                </p>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm text-center">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-indian-saffron hover:bg-indian-saffron/90 text-lg py-6"
                disabled={isLoading || !loginCode}
              >
                {isLoading ? 'Authenticating...' : 'Access Admin Panel'}
              </Button>

              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600 text-center">
                  Session valid for 24 hours
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default AdminLoginPage;

