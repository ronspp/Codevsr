import AuthPage from '@/components/auth-page';

export const metadata = {
  title: 'Log in — Mangation',
  description: 'Log in to your Mangation reading shelf.',
};

export default function LoginPage() {
  return <AuthPage mode="login" />;
}
