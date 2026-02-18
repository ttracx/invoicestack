import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'InvoiceStack - Simple Invoice Generator',
  description: 'Professional invoice generator with PDF export, client management, and payment tracking',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
          <footer className="mt-auto bg-gray-50 border-t">
            <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-600">
              © 2026 InvoiceStack powered by VibeCaaS.com a division of NeuralQuantum.ai LLC. All rights reserved.
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  )
}