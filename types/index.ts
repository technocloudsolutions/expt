export interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  userId: string;
  createdAt: any; // Firebase Timestamp
}

export interface MonthlyTotal {
  month: string;
  year: string;
  total: number;
}

export interface FirestoreError {
  code: string;
  message: string;
} 