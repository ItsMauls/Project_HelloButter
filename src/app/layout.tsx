
import { Inter } from 'next/font/google'
import './globals.css'

import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hallo Butter',
  description: 'Hallo Butter Page',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="en">
        <body className={inter.className}>
          <script src="https://unpkg.com/boxicons@2.1.4/dist/boxicons.js"></script>
          <link rel="icon" href="/img/helloCake-2.png" />
          {children}
        
        </body>
      </html>
  )
}

