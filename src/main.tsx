
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterWrapper } from './components/Router-wrapper.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './context/auth-provider.tsx'


const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(

    <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <RouterWrapper />
      </AuthProvider>
    </QueryClientProvider>
  
)
