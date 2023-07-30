import type { OrderLine } from "../domain/Batch";
import typia from 'typia';
export const parseOrderLine = (text: unknown) => ((input: string): typia.Primitive<OrderLine> => { const assert = (input: any): OrderLine => {
    const __is = (input: any): input is OrderLine => {
        return "object" === typeof input && null !== input && ("string" === typeof (input as any).orderId && "string" === typeof (input as any).sku && "number" === typeof (input as any).quantity);
    };
    if (false === __is(input))
        ((input: any, _path: string, _exceptionable: boolean = true): input is OrderLine => {
            const $guard = (typia.assertParse as any).guard;
            const $ao0 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.orderId || $guard(_exceptionable, {
                path: _path + ".orderId",
                expected: "string",
                value: input.orderId
            })) && ("string" === typeof input.sku || $guard(_exceptionable, {
                path: _path + ".sku",
                expected: "string",
                value: input.sku
            })) && ("number" === typeof input.quantity || $guard(_exceptionable, {
                path: _path + ".quantity",
                expected: "number",
                value: input.quantity
            }));
            return ("object" === typeof input && null !== input || $guard(true, {
                path: _path + "",
                expected: "OrderLine",
                value: input
            })) && $ao0(input, _path + "", true) || $guard(true, {
                path: _path + "",
                expected: "OrderLine",
                value: input
            });
        })(input, "$input", true);
    return input;
}; input = JSON.parse(input); return assert(input) as any; })(text);
