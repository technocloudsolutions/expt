import Auth from '@/components/auth';
import EnhancedExpenseTracker from '@/components/enhanced-expense-tracker';

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <Auth />
      <EnhancedExpenseTracker />
    </main>
  );
}