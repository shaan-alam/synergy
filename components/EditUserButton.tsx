'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { UserForm } from '@/components/UserForm'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { User } from '@/lib/types'

interface EditUserButtonProps {
  user: User
}

export function EditUserButton({ user }: EditUserButtonProps) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">Edit</Button>
      </SheetTrigger>
      <SheetContent>
        <UserForm user={user} onSuccess={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  )
}