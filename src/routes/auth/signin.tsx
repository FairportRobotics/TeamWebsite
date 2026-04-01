import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/signin')({
  component: RouteComponent,
})

function RouteComponent() {
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
        <Button onClick={handleSignIn}>Sign In</Button>
      </section>
    </main>
  )
}
