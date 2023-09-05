import { rest } from 'msw'
import { setupServer, type SetupServer } from 'msw/node'
import { handlers } from './handlers.http'

// This configures a request mocking server with the given request handlers.
const server: SetupServer = setupServer(...handlers)

export { rest, server }
