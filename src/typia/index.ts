import * as Batch from "../domain/Batch";
import typia from 'typia';
export const parseOrderLine = (text: string) => ((input: string): typia.Primitive<Batch.OrderLine> => { const assert = (input: any): Batch.OrderLine => {
    const __is = (input: any): input is Batch.OrderLine => {
        return "object" === typeof input && null !== input && ("string" === typeof (input as any).orderId && "string" === typeof (input as any).sku && "number" === typeof (input as any).quantity);
    };
    if (false === __is(input))
        ((input: any, _path: string, _exceptionable: boolean = true): input is Batch.OrderLine => {
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
export const parseBatch = (text: string) => ((input: string): typia.Primitive<Batch.T> => { const assert = (input: any): Batch.T => {
    const __is = (input: any): input is Batch.T => {
        const $io0 = (input: any): boolean => "string" === typeof input.id && "string" === typeof input.sku && "number" === typeof input.quantity && (null === input.eta || "number" === typeof input.eta) && (Array.isArray(input.allocations) && input.allocations.every((elem: any) => "object" === typeof elem && null !== elem && $io1(elem)));
        const $io1 = (input: any): boolean => "string" === typeof input.orderId && "string" === typeof input.sku && "number" === typeof input.quantity;
        return "object" === typeof input && null !== input && $io0(input);
    };
    if (false === __is(input))
        ((input: any, _path: string, _exceptionable: boolean = true): input is Batch.T => {
            const $guard = (typia.assertParse as any).guard;
            const $ao0 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.id || $guard(_exceptionable, {
                path: _path + ".id",
                expected: "string",
                value: input.id
            })) && ("string" === typeof input.sku || $guard(_exceptionable, {
                path: _path + ".sku",
                expected: "string",
                value: input.sku
            })) && ("number" === typeof input.quantity || $guard(_exceptionable, {
                path: _path + ".quantity",
                expected: "number",
                value: input.quantity
            })) && (null === input.eta || "number" === typeof input.eta || $guard(_exceptionable, {
                path: _path + ".eta",
                expected: "(null | number)",
                value: input.eta
            })) && ((Array.isArray(input.allocations) || $guard(_exceptionable, {
                path: _path + ".allocations",
                expected: "Array<OrderLine>",
                value: input.allocations
            })) && input.allocations.every((elem: any, _index1: number) => ("object" === typeof elem && null !== elem || $guard(_exceptionable, {
                path: _path + ".allocations[" + _index1 + "]",
                expected: "OrderLine",
                value: elem
            })) && $ao1(elem, _path + ".allocations[" + _index1 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".allocations[" + _index1 + "]",
                expected: "OrderLine",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".allocations",
                expected: "Array<OrderLine>",
                value: input.allocations
            }));
            const $ao1 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.orderId || $guard(_exceptionable, {
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
                expected: "T",
                value: input
            })) && $ao0(input, _path + "", true) || $guard(true, {
                path: _path + "",
                expected: "T",
                value: input
            });
        })(input, "$input", true);
    return input;
}; input = JSON.parse(input); return assert(input) as any; })(text);
export const assertBatch = (data: unknown) => ((input: any): Batch.T => {
    const __is = (input: any): input is Batch.T => {
        const $io0 = (input: any): boolean => "string" === typeof input.id && "string" === typeof input.sku && "number" === typeof input.quantity && (null === input.eta || "number" === typeof input.eta) && (Array.isArray(input.allocations) && input.allocations.every((elem: any) => "object" === typeof elem && null !== elem && $io1(elem)));
        const $io1 = (input: any): boolean => "string" === typeof input.orderId && "string" === typeof input.sku && "number" === typeof input.quantity;
        return "object" === typeof input && null !== input && $io0(input);
    };
    if (false === __is(input))
        ((input: any, _path: string, _exceptionable: boolean = true): input is Batch.T => {
            const $guard = (typia.assert as any).guard;
            const $ao0 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.id || $guard(_exceptionable, {
                path: _path + ".id",
                expected: "string",
                value: input.id
            })) && ("string" === typeof input.sku || $guard(_exceptionable, {
                path: _path + ".sku",
                expected: "string",
                value: input.sku
            })) && ("number" === typeof input.quantity || $guard(_exceptionable, {
                path: _path + ".quantity",
                expected: "number",
                value: input.quantity
            })) && (null === input.eta || "number" === typeof input.eta || $guard(_exceptionable, {
                path: _path + ".eta",
                expected: "(null | number)",
                value: input.eta
            })) && ((Array.isArray(input.allocations) || $guard(_exceptionable, {
                path: _path + ".allocations",
                expected: "Array<OrderLine>",
                value: input.allocations
            })) && input.allocations.every((elem: any, _index1: number) => ("object" === typeof elem && null !== elem || $guard(_exceptionable, {
                path: _path + ".allocations[" + _index1 + "]",
                expected: "OrderLine",
                value: elem
            })) && $ao1(elem, _path + ".allocations[" + _index1 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".allocations[" + _index1 + "]",
                expected: "OrderLine",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".allocations",
                expected: "Array<OrderLine>",
                value: input.allocations
            }));
            const $ao1 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.orderId || $guard(_exceptionable, {
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
                expected: "T",
                value: input
            })) && $ao0(input, _path + "", true) || $guard(true, {
                path: _path + "",
                expected: "T",
                value: input
            });
        })(input, "$input", true);
    return input;
})(data);
