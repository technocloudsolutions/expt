import Auth from '@/components/auth';
import EnhancedExpenseTracker from '@/components/enhanced-expense-tracker';

export default function Home() {
  return (
    <main className="container mx-auto p-2 sm:p-4 max-w-7xl">
      <div className="space-y-6 sm:space-y-8">
        <div className="relative z-10">
          <Auth />
        </div>
        <div className="relative z-0">
          <EnhancedExpenseTracker />
        </div>
      </div>
    </main>
  );
}