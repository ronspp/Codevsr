import AuthPage from '@/components/auth-page';

export const metadata = {
  title: 'Reset your password — Mangation',
  description: 'Request a password reset link for your Mangation account.',
};

export default function ForgotPasswordPage() {
  return <AuthPage mode="forgot" />;
}
