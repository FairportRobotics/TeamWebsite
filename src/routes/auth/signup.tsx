import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/signup')({
  component: RouteComponent,
})

function RouteComponent() {
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

  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <section>
        <Button onClick={handleSignUp}>Sign Up</Button>
      </section>
    </main>
  )
}
