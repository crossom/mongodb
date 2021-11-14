import {
	Append,
	IfNotExists,
	Max,
	Min,
	Minus,
	Plus,
	Pop,
	Remove,
	SymbiosisError,
} from "@techmmunity/symbiosis";
import { formatSaveData } from "../../lib/utils/format-save-data";

describe("formatSaveData Util", () => {
	// eslint-disable-next-line sonarjs/cognitive-complexity
	describe("With valid params", () => {
		it("should return formatted data (simple data)", () => {
			let result: any;

			const data = {
				foo: "bar",
				bar: {
					fooBar: 1,
					fgh: [
						{
							xyz: "bar",
						},
					],
				},
				abc: ["foo"],
			};

			try {
				result = formatSaveData(data);
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual({
				$set: data,
				$unset: {},
				$inc: {},
				$min: {},
				$max: {},
				$push: {},
				$pop: {},
			});
		});

		it("should return formatted data (simple data + Plus)", () => {
			let result: any;

			const data = {
				foo: "bar",
				bar: {
					fooBar: 1,
					fgh: [
						{
							xyz: "bar",
						},
					],
				},
			};

			try {
				result = formatSaveData({
					...data,
					abc: Plus(1),
				});
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual({
				$set: data,
				$unset: {},
				$inc: {
					abc: 1,
				},
				$min: {},
				$max: {},
				$pop: {},
				$push: {},
			});
		});

		it("should return formatted data (simple data + Minus)", () => {
			let result: any;

			const data = {
				foo: "bar",
				bar: {
					fooBar: 1,
					fgh: [
						{
							xyz: "bar",
						},
					],
				},
			};

			try {
				result = formatSaveData({
					...data,
					abc: Minus(1),
				});
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual({
				$set: data,
				$unset: {},
				$inc: {
					abc: -1,
				},
				$min: {},
				$max: {},
				$pop: {},
				$push: {},
			});
		});

		it("should return formatted data (simple data + Min)", () => {
			let result: any;

			const data = {
				foo: "bar",
				bar: {
					fooBar: 1,
					fgh: [
						{
							xyz: "bar",
						},
					],
				},
			};

			try {
				result = formatSaveData({
					...data,
					abc: Min(10),
				});
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual({
				$set: data,
				$unset: {},
				$inc: {},
				$min: {
					abc: 10,
				},
				$max: {},
				$pop: {},
				$push: {},
			});
		});

		it("should return formatted data (simple data + Max)", () => {
			let result: any;

			const data = {
				foo: "bar",
				bar: {
					fooBar: 1,
					fgh: [
						{
							xyz: "bar",
						},
					],
				},
			};

			try {
				result = formatSaveData({
					...data,
					abc: Max(10),
				});
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual({
				$set: data,
				$unset: {},
				$inc: {},
				$min: {},
				$max: {
					abc: 10,
				},
				$pop: {},
				$push: {},
			});
		});

		it("should return formatted data (simple data + Remove)", () => {
			let result: any;

			const data = {
				foo: "bar",
				bar: {
					fooBar: 1,
					fgh: [
						{
							xyz: "bar",
						},
					],
				},
			};

			try {
				result = formatSaveData({
					...data,
					abc: Remove(),
				});
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual({
				$set: data,
				$unset: {
					abc: "",
				},
				$inc: {},
				$min: {},
				$max: {},
				$pop: {},
				$push: {},
			});
		});

		it("should return formatted data (simple data + Append)", () => {
			let result: any;

			const data = {
				foo: "bar",
				bar: {
					fooBar: 1,
					fgh: [
						{
							xyz: "bar",
						},
					],
				},
			};

			try {
				result = formatSaveData({
					...data,
					abc: Append("foo"),
				});
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual({
				$set: data,
				$unset: {},
				$inc: {},
				$min: {},
				$max: {},
				$push: {
					abc: {
						$each: ["foo"],
					},
				},
				$pop: {},
			});
		});

		it("should return formatted data (simple data + Pop)", () => {
			let result: any;

			const data = {
				foo: "bar",
				bar: {
					fooBar: 1,
					fgh: [
						{
							xyz: "bar",
						},
					],
				},
			};

			try {
				result = formatSaveData({
					...data,
					abc: Pop(1),
				});
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual({
				$set: data,
				$unset: {},
				$inc: {},
				$min: {},
				$max: {},
				$push: {},
				$pop: {
					abc: 1,
				},
			});
		});

		it("should return formatted data (with 2 SaveOperators of the same kind)", () => {
			let result: any;

			const data = {
				foo: "bar",
				bar: {
					fooBar: 1,
					fgh: [
						{
							xyz: "bar",
						},
					],
				},
			};

			try {
				result = formatSaveData({
					...data,
					abc: Pop(1),
					fgh: Pop(1),
				});
			} catch (err: any) {
				result = err;
			}

			expect(result).toStrictEqual({
				$set: data,
				$unset: {},
				$inc: {},
				$min: {},
				$max: {},
				$push: {},
				$pop: {
					abc: 1,
					fgh: 1,
				},
			});
		});
	});

	describe("With invalid params", () => {
		it("should throw error with unsupported SaveOperator", () => {
			let result: any;

			try {
				result = formatSaveData({
					abc: IfNotExists(1),
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof SymbiosisError).toBeTruthy();
			expect(result.code).toBe("INVALID_PARAM");
			expect(result.origin).toBe("SYMBIOSIS");
			expect(result.message).toBe("SaveOperator not supported");
			expect(result.details).toStrictEqual([
				'MongoDB doesn\'t support "ifNotExists" operator',
			]);
		});

		it("should throw error with invalid Pop value", () => {
			let result: any;

			try {
				result = formatSaveData({
					abc: Pop("foo"),
				});
			} catch (err: any) {
				result = err;
			}

			expect(result instanceof SymbiosisError).toBeTruthy();
			expect(result.code).toBe("INVALID_PARAM");
			expect(result.origin).toBe("SYMBIOSIS");
			expect(result.message).toBe("Invalid param");
			expect(result.details).toStrictEqual([
				'"Pop" operator only supports ONE parameter with the value `1` (last item) OR `-1` (first item).',
			]);
		});
	});
});
