import { RouterProvider } from 'react-router'
import { Toaster } from 'sonner'
import { router } from './router'

export function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'font-body',
        }}
      />
    </>
  )
}
