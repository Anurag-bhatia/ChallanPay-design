import { RouterProvider } from 'react-router'
import { Toaster } from 'sonner'
import { router } from './router'

export function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        theme="dark"
        toastOptions={{
          className: 'font-body',
          classNames: {
            success: '[&_[data-icon]]:text-emerald-400',
          },
          ariaProps: {
            role: 'status',
            'aria-live': 'polite',
          },
        }}
      />
    </>
  )
}
