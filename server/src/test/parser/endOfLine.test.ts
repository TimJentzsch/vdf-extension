import AstEndOfLine, { astCrLf, astLf } from "../../ast/endOfLine";
import { endOfLineParser } from "../../parser/parser";
import { applyParser, getRange } from "../../parser/utils";

// End of line parsing
describe("should parse end of line", () => {
  const params: Array<[string, AstEndOfLine]> = [
    [
      "\n",
      astLf(getRange(0, 0, 1, 0)),
    ],
    [
      "\r\n",
      astCrLf(getRange(0, 0, 1, 0)),
    ],
  ];

  for (const [input, expected] of params) {
    test(input, () => {
      const actual = applyParser(endOfLineParser, input);
      expect(actual).toEqual(expected);
    });
  }
});
