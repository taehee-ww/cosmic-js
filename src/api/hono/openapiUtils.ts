import { createRoute } from '@hono/zod-openapi'
import { AnyZodObject, ZodSchema } from 'zod'

type ConfigT = Parameters<typeof createRoute>[0]['responses'][string]['content'] extends infer A | undefined ? A : never
export type SchemaBaseT = ConfigT['string']['schema']

export const jsonBody = <SchemaT extends SchemaBaseT>(schema: SchemaT, description?: string) => ({
	content: {
		'application/json': {
			schema
		},
	},
	description: description ?? '',
})

export const getRoute = <PathT extends string, ParamsT extends AnyZodObject, QueryT extends AnyZodObject, SchemaT extends SchemaBaseT>(path: PathT, { params, query, res: resSchema }: { params?: ParamsT, query?: QueryT, res: SchemaT }) => createRoute({
	method: 'get',
	path,
	request: {
		params,
		query
	},
	responses: {
		200: jsonBody(resSchema, 'description' in resSchema ? resSchema.description : undefined),
	},
})

export const postRoute = <PathT extends string, ReqSchemaT extends SchemaBaseT, ResSchemaT extends SchemaBaseT>(path: PathT, { req: reqSchema, res: resSchema }: { req: ReqSchemaT, res: ResSchemaT }) => createRoute({
	method: 'post',
	path,
	request: {
		body: jsonBody(reqSchema, 'description' in reqSchema ? reqSchema.description : undefined)
	},
	responses: {
		201: jsonBody(resSchema, 'description' in resSchema ? resSchema.description : undefined),
	},
})