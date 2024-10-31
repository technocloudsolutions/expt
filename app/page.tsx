import Auth from '@/components/auth';
import EnhancedExpenseTracker from '@/components/enhanced-expense-tracker';

export default function Home() {
  return (
    <main className="container mx-auto p-2 sm:p-4 max-w-7xl">
      <div className="space-y-4">
        <Auth />
        <EnhancedExpenseTracker />
      </div>
    </main>
  );
}