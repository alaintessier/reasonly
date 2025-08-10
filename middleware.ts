import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Add your whitelisted IPs here
const WHITELISTED_IPS = [
  '74.126.100.235',  // Your current public IP
  // Add more IPs below if needed (office, home, etc.)
]

export function middleware(request: NextRequest) {
  // Get the client IP from headers
  const forwardedFor = request.headers.get('x-forwarded-for')
  const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : request.headers.get('x-real-ip') || 'unknown'
  
  // Check if IP is whitelisted
  if (!WHITELISTED_IPS.includes(ip)) {
    return new NextResponse('Access Denied', { status: 403 })
  }
  
  return NextResponse.next()
}

// Apply middleware to all routes
export const config = {
  matcher: '/:path*',
}
