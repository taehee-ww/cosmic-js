import { createRouter, Response as FeResponse, useCORS } from 'fets'
import { z } from 'zod'
import { BATCH, ORDER_LINE } from '../../domain/fixtures'

const router = createRouter({
  plugins: [
    useCORS({
      origin: 'file:///home/taehee/github/cosmic-for-all/cosmic-js/src/api/fets/redoc.html',
      credentials: true
    })
  ],
  openAPI: {
    components: {
      schemas: {
        Batch: {
          type: "object",
          examples: [
            {
              ...BATCH,
              allocations: [ORDER_LINE]
            }
          ],
          properties: {
            id: {
              type: "string"
            },
            sku: {
              type: "string"
            },
            quantity: {
              type: "number"
            },
            eta: {
              type: "number",
              nullable: true
            },
            allocations: {
              type: "array",
              items: {
                $ref: '#/components/schemas/OrderLine'
              }
            }
          },
          nullable: false,
          required: [
            "id",
            "sku",
            "quantity",
            "eta",
            "allocations"
          ]
        },
        OrderLine: {
          type: "object",
          examples: [
            ORDER_LINE
          ],
          properties: {
            orderId: { type: "string" },
            sku: { type: "string" },
            quantity: { type: "number" }
          },
          nullable: false,
          required: [
            "orderId",
            "sku",
            "quantity"
          ]
        }
      }
    } as const
  }
}).route({
  method: 'GET',
  path: '/batches',
  operationId: 'getBatches',
  description: '배치들을 가져옵니다',
  schemas: {
    responses: {
      200: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/Batch'
        }
      }
    }
  } as const,
  handler: () => FeResponse.json([{
    ...BATCH,
    allocations: [ORDER_LINE]
  }])
})
  .route({
    method: 'GET',
    path: '/batches/Id',
    operationId: 'getBatchById',
    description: 'Id로 Batch 하나를 찾습니다',
    schemas: {
      responses: {
        200: z.object({
          id: z.string(),
          sku: z.string(),
          quantity: z.number(),
          eta: z.number().nullable(),
          allocations: z.array(z.object({
            orderId: z.string(),
            sku: z.string(),
            quantity: z.number().int().min(1)
          }))
        })
      }
    } as const,
    handler: () => FeResponse.json({
      ...BATCH,
      allocations: [ORDER_LINE]
    })
  })
  .route({
    method: 'GET',
    path: '/redoc',
    schemas: {
      responses: {
        200: {
          type: 'string'
        }
      }
    } as const,
    handler: () => new FeResponse(Bun.file('./src/api/fets/redoc.html').stream(), {
      headers: {
        'Content-Type': 'text/html'
      }
    })
  })
const server = Bun.serve(router)
console.info(`Swagger UI is available at http://localhost:${server.port}/redoc`)