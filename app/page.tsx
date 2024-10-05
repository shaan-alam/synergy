'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/toaster'
import { UserList } from '@/components/UserList'
import { CreateUserButton } from '@/components/CreateUserButton'

const queryClient = new QueryClient()

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">User Management</h1>
        <CreateUserButton />
        <UserList />
      </main>
      <Toaster />
    </QueryClientProvider>
  )
}