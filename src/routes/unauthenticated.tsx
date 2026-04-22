import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/unauthenticated')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/unauthenticated"!</div>
}
