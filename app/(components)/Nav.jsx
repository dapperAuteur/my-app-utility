import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

const Nav = async () => {
  const session = await getServerSession(options);

  return (
    <header className='bg-gray-600'>
      <nav className='flex justified-between items-center w-full px-10 py-4'>
        <div className='flex gap-10'>
          <Link href="/">Home</Link>
          <Link href="/create-account">Create Account</Link>
          <Link href="/create-user">Create User</Link>
          <Link href="/create-transaction">Create Transaction</Link>
          <Link href="/client-member">Client Member</Link>
          <Link href="/member">Member</Link>
          <Link href="/public">Public</Link>
          {
            session ? (
              <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
            ) : (
              <Link href="/api/auth/signin">Login</Link>
            )
          }
        </div>
      </nav>
    </header>
  )
}

export default Nav