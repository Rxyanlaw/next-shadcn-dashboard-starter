import { redirect } from 'next/navigation';

export default function Dashboard() {
  // Directly redirect to overview
  // Middleware will ensure this page is only accessible to authenticated users
  redirect('/dashboard/overview');
}