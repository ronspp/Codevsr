import AuthPage from '@/components/auth-page';

export const metadata = {
  title: 'Create an account — Mangation',
  description: 'Create your Mangation reading shelf.',
};

export default function RegisterPage() {
  return <AuthPage mode="register" />;
}
