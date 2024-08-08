import React from 'react'
import { useSession } from 'next-auth/react'

function Auth({ children }) {
  const { data: sessionData } = useSession();
  console.log(sessionData, ">>>");

  return (
    <div>{children}</div>
  )
}

export default Auth
