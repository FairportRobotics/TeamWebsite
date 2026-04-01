import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/root')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <h1>Authorization</h1>
      <Outlet />
    </div>
  )
}
