import { authClient } from '#/lib/auth-client'
import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  async function handleSignUp() {
    const { data, error } = await authClient.signUp.email({
      name: 'John Doe', // required
      email: 'john.doe@example.com', // required
      password: 'password1234', // required
      image: 'https://example.com/image.png',
      callbackURL: '/',
    })

    console.log('handleSignUp', data)
    console.log('handleSignUp', error)
  }

  async function handleSignIn() {
    const { data, error } = await authClient.signIn.email({
      email: 'john.doe@example.com', // required
      password: 'password1234', // required
      rememberMe: true,
      callbackURL: '/',
    })

    console.log('handleSignIn', data)
    console.log('handleSignIn', error)
  }

  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <section>
        <Button onClick={handleSignUp}>Sign Up</Button>
        <Button onClick={handleSignIn}>Sign In</Button>
      </section>
    </main>
  )
}
