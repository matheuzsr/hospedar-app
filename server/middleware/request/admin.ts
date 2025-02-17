import { defineRequestMiddleware, getHeader } from 'h3'
import { SignInService } from '../../service/supabase/sign/signin/SignInService'
import { UnauthorizedError } from '~/server/errors/errors'

const ignorePaths = ['signin', 'signup']

export default defineRequestMiddleware((event) => {
  if (ignorePaths.some((path) => event.path.includes(path))) return
  if (!event.path.startsWith('/api/admin')) return

  const authHeader = getHeader(event, 'authorization')
  if (!authHeader) throw new UnauthorizedError('No token provided')

  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader

  const service = new SignInService()
  const isValid = service.validateToken(token)
  if (!isValid) throw new UnauthorizedError('Invalid token')
})
