import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Add your whitelisted IPs here
const WHITELISTED_IPS = [
  '192.168.1.1',  // Example IP - replace with your IPs
  '10.0.0.1',      // Add as many as needed
  // Add your actual IP addresses here
]

export function middleware(request: NextRequest) {
  // Get the client IP
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
  
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
