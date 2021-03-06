import { astComment } from "../../ast/comment";
import { astLf } from "../../ast/endOfLine";
import { astSpaces } from "../../ast/indent";
import { InlineTrivia, MultilineTrivia } from "../../ast/trivia";
import { multilineTriviaParser, inlineTriviaParser } from "../../parser/parser";
import { applyParser, getInlineRange, getRange } from "../../parser/utils";

// Inline trivia parsing
describe("should parse inline trivia", () => {
  const params: Array<[string, InlineTrivia[]]> = [
    ["", []],
    ["// Comment", [astComment(" Comment", getInlineRange(0, 0, 10))]],
    [" ", [astSpaces(1, getInlineRange(0, 0, 1))]],
    [
      "  // Comment",
      [
        astSpaces(2, getInlineRange(0, 0, 2)),
        astComment(" Comment", getInlineRange(0, 2, 12)),
      ],
    ],
  ];

  for (const [input, expected] of params) {
    test(input, () => {
      const actual = applyParser(inlineTriviaParser, input);
      expect(actual).toEqual(expected);
    });
  }
});

// Multiline trivia parsing
describe("should parse multiline trivia", () => {
  const params: Array<[string, MultilineTrivia[]]> = [
    ["", []],
    ["// Comment", [astComment(" Comment", getInlineRange(0, 0, 10))]],
    [" ", [astSpaces(1, getInlineRange(0, 0, 1))]],
    [
      "  // Comment",
      [
        astSpaces(2, getInlineRange(0, 0, 2)),
        astComment(" Comment", getInlineRange(0, 2, 12)),
      ],
    ],
    [
      " \n ",
      [
        astSpaces(1, getInlineRange(0, 0, 1)),
        astLf(getRange(0, 1, 1, 0)),
        astSpaces(1, getInlineRange(1, 0, 1)),
      ],
    ],
    [
      "// Line 1\n// Line 2",
      [
        astComment(" Line 1", getInlineRange(0, 0, 9)),
        astLf(getRange(0, 9, 1, 0)),
        astComment(" Line 2", getInlineRange(1, 0, 9)),
      ],
    ],
  ];

  for (const [input, expected] of params) {
    test(input, () => {
      const actual = applyParser(multilineTriviaParser, input);
      expect(actual).toEqual(expected);
    });
  }
});
