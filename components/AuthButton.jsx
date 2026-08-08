"use client"
import React, { useState } from 'react'
import { Button } from './ui/button'
import { LogIn, LogOut } from 'lucide-react'
import {AuthModal} from './AuthModal.js'
import { signOut } from '@/app/actions'

const AuthButton = ({user}) => {

    const [showAuthModal, setShowAuthModal] = useState(false);
    if(user) {
        return (
           <form action={signOut}>
            <Button variant="ghost" size="lg" type="submit" className="rounded-4xl px-6 py-6 gap-2 hover:bg-red-700 hover:text-white bg-accent-foreground text-white">
                <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
           </form>
        )
    }
  return (
    <>
    <Button
            onClose={()=>setShowAuthModal(true)}
            onClick={()=>setShowAuthModal(true)}
            variant="default"   
            size="lg"
            className="bg-accent-foreground px-6 py-6 rounded-4xl hover:bg-green-950 gap-2"
          >
            <LogIn />
            Sign In
          </Button>
          <AuthModal isOpen={showAuthModal}
           onClose={()=>setShowAuthModal(false)} />
          </>
  )
}

export default AuthButton
