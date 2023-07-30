import { Effect } from 'effect';

export function withCatch<R, E, A>(program: Effect.Effect<R, E, A>): Effect.Effect<R, never, E | A>{
	return program.pipe(
		Effect.catchAll((error) => Effect.succeed(error))
	)
}
