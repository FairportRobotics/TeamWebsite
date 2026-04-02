import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/robots/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/robots/"!</div>
}
