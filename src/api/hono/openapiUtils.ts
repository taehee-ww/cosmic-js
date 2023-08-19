import { createRoute } from '@hono/zod-openapi'
import { AnyZodObject, ZodSchema } from 'zod'

export const jsonBody = <SchemaT extends ZodSchema>(schema: SchemaT, description?: string) => ({
	content: {
		'application/json': {
			schema
		},
	},
	description: description ?? '',
})

export const getRoute = <PathT extends string, ParamsT extends AnyZodObject, QueryT extends AnyZodObject, SchemaT extends ZodSchema>(path: PathT, { params, query, res: resSchema }: { params?: ParamsT, query?: QueryT, res: SchemaT }) => createRoute({
	method: 'get',
	path,
	request: {
		params,
		query
	},
	responses: {
		200: jsonBody(resSchema, resSchema.description),
	},
})

export const postRoute = <PathT extends string, ReqSchemaT extends ZodSchema, ResSchemaT extends ZodSchema>(path: PathT, { req: reqSchema, res: resSchema }: { req: ReqSchemaT, res: ResSchemaT }) => createRoute({
	method: 'post',
	path,
	request: {
		body: jsonBody(reqSchema, reqSchema.description)
	},
	responses: {
		201: jsonBody(resSchema, resSchema.description),
	},
})