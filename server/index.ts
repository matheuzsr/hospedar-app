import type { H3Event} from 'h3'
import { defineEventHandler, sendError, createError } from 'h3'

/**
 * Função que encapsula defineEventHandler e já trata erros automaticamente.
 */
export function defineSafeEventHandler<T>(
    handler: (event: H3Event) => Promise<T>
) {
    return defineEventHandler(async (event) => {
        try {
            return await handler(event)
        } catch (error: any) {
            console.error(`[Erro] ${error.message}`)
            console.error(`[Stack] ${error.stack}`)
            
            return sendError(event, createError({
                statusCode: error.statusCode || 500,
                message: error.message || 'Erro interno na API',
                data: error.data
            }))
        }
    })
}
