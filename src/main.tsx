import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './routes/router.tsx'
import { Toaster } from 'sonner'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AuthProvider from './context/AuthProvider.tsx'


const queryClient = new QueryClient()


createRoot(document.getElementById('root')!).render(
  <StrictMode>



    <QueryClientProvider client={queryClient}>


      <AuthProvider>


        <RouterProvider router={router}>
        </RouterProvider>


        <Toaster position="top-right" />

      </AuthProvider>



    </QueryClientProvider>



  </StrictMode>,
)
