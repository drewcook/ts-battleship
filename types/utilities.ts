/**
 * Helpers
 */

type ReturnOf<F> = F extends { (...args: any[]): infer RT } ? RT : never
type Concat<A extends any[], B extends any[]> = [...A, ...B]
type EndsWith<A extends string, B extends string> = A extends `${any}${B}` ? true : false
type LengthOfTuple<T> = T extends readonly any[] ? T['length'] : never
type If<C, T, F> = C extends true ? T : F
type IsTuple<T> = T extends readonly any[]
	? [...T, any]['length'] extends T['length']
		? false
		: true
	: false // not even an array-ish thing
	// Add accumulator type and recursion to loop over to find index
	type IndexOf<T extends any[], U, Acc extends any[] = []> = T[0] extends U
		? Acc['length']
		: T extends [infer F, ...infer Rest]
			? IndexOf<Rest, U, [...Acc, F]>
			: -1


 // Testing
type Expect<T extends true> = T
type Equal<X, Y> =
 (<T>() => T extends X ? 1 : 2) extends
 (<T>() => T extends Y ? 1 : 2) ? true : false
type NotEqual<X, Y> = true extends Equal<X, Y> ? false : true

// Test Cases
type cases = [
  Expect<Equal<If<true, "apple", "pear">, "apple">>,
  Expect<Equal<If<false, "orange", 42>, 42>>,
	Expect<Equal<EndsWith<"ice cream", "cream">, true>>,
  Expect<Equal<EndsWith<"ice cream", "chocolate">, false>>,
	Expect<Equal<LengthOfTuple<[1, 2, 3]>, 3>>,
  Expect<NotEqual<LengthOfTuple<[1, 2, 3]>, 2>>,
	Expect<Equal<Concat<[], ["hello"]>, ["hello"]>>,
	Expect<Equal<Concat<[42, "a", "b"], [Promise<boolean>]>, [42, "a", "b", Promise<boolean>]>>,
	Expect<Equal<IndexOf<[1, 2, 3], 2>, 1>>,
  Expect<Equal<IndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 2>>,
  Expect<Equal<IndexOf<[0, 0, 0], 2>, -1>>
]
