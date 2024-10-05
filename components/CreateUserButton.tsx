'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { UserForm } from '@/components/UserForm'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

export function CreateUserButton() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="mb-4">Create User</Button>
      </SheetTrigger>
      <SheetContent>
        <UserForm onSuccess={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  )
}