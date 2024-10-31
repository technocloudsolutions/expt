"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Expense } from '@/types';

// Define vibrant colors array using your color scheme
const chartColors = [
  '#5F0F40', // Tyrian purple
  '#9A031E', // Carmine
  '#FB8B24', // UT orange
  '#E36414', // Spanish orange
  '#0E0A06', // Smoky black
  '#0F4C5C', // Midnight green
  '#D4A373', // Tan
  '#7B2CBF', // Purple
  '#FF6B6B', // Coral
  '#4CAF50', // Green
  '#2196F3', // Blue
  '#FF9800', // Orange
];

interface ExpenseChartProps {
  expenses: Expense[];
}

interface ChartData {
  category: string;
  amount: number;
  fill: string;
}

export function ExpenseChart({ expenses }: ExpenseChartProps) {
  // Group expenses by category
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  // Convert to chart data format with random colors
  const data: ChartData[] = Object.entries(categoryTotals).map(([category, amount], index) => ({
    category: category.charAt(0).toUpperCase() + category.slice(1),
    amount,
    fill: chartColors[index % chartColors.length] // Cycle through colors
  }));

  const handleMouseEnter = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.style.filter = 'brightness(1.2)';
    }
  };

  const handleMouseLeave = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.style.filter = 'brightness(1.1)';
    }
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
        <XAxis 
          dataKey="category" 
          tick={{ fill: 'hsl(var(--foreground))' }}
        />
        <YAxis 
          tick={{ fill: 'hsl(var(--foreground))' }}
        />
        <Tooltip 
          formatter={(value: number) => `Rs. ${value.toFixed(2)}`}
          contentStyle={{
            backgroundColor: 'hsl(var(--background))',
            border: '1px solid hsl(var(--border))',
            borderRadius: 'var(--radius)',
          }}
          labelStyle={{
            color: 'hsl(var(--foreground))',
          }}
        />
        <Bar 
          dataKey="amount" 
          radius={[4, 4, 0, 0]}
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`}
              fill={entry.fill}
              id={`bar-${index}`}
              style={{
                filter: 'brightness(1.1)',
                transition: 'filter 0.3s ease-in-out',
              }}
              onMouseEnter={() => handleMouseEnter(`bar-${index}`)}
              onMouseLeave={() => handleMouseLeave(`bar-${index}`)}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
} 