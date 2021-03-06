import { astLBracket, astRBracket } from "../../ast/bracket";
import { astLf } from "../../ast/endOfLine";
import { astSpaces, astTabs } from "../../ast/indent";
import { astQuotedKey, astUnquotedKey } from "../../ast/key";
import AstObject, { astObject } from "../../ast/object";
import { astStringProperty } from "../../ast/property";
import { astQuotedString, astUnquotedString } from "../../ast/string";
import { objectParser } from "../../parser/parser";
import { applyParser, getInlineRange, getRange } from "../../parser/utils";

// Object parsing
describe("objectParser", () => {
  const params: Array<[string, AstObject]> = [
    [
      "{}",
      astObject(
        astLBracket(getInlineRange(0, 0, 1)),
        [],
        astRBracket(getInlineRange(0, 1, 2))
      ),
    ],
    ["{", astObject(astLBracket(getInlineRange(0, 0, 1)), [])],
    [
      "{ key value }",
      astObject(
        astLBracket(getInlineRange(0, 0, 1)),
        [
          astSpaces(1, getInlineRange(0, 1, 2)),
          astStringProperty(
            astUnquotedKey("key", getInlineRange(0, 2, 5)),
            [astSpaces(1, getInlineRange(0, 5, 6))],
            astUnquotedString("value", getInlineRange(0, 6, 11)),
            [astSpaces(1, getInlineRange(0, 11, 12))]
          ),
        ],
        astRBracket(getInlineRange(0, 12, 13))
      ),
    ],
    [
      '{ "key" "value" }',
      astObject(
        astLBracket(getInlineRange(0, 0, 1)),
        [
          astSpaces(1, getInlineRange(0, 1, 2)),
          astStringProperty(
            astQuotedKey("key", getInlineRange(0, 2, 7)),
            [astSpaces(1, getInlineRange(0, 7, 8))],
            astQuotedString("value", getInlineRange(0, 8, 15)),
            [astSpaces(1, getInlineRange(0, 15, 16))]
          ),
        ],
        astRBracket(getInlineRange(0, 16, 17))
      ),
    ],
    [
      "{\n\tkey\tvalue\n}",
      astObject(
        astLBracket(getInlineRange(0, 0, 1)),
        [
          astLf(getRange(0, 1, 1, 0)),
          astTabs(1, getInlineRange(1, 0, 1)),
          astStringProperty(
            astUnquotedKey("key", getInlineRange(1, 1, 4)),
            [astTabs(1, getInlineRange(1, 4, 5))],
            astUnquotedString("value", getInlineRange(1, 5, 10))
          ),
          astLf(getRange(1, 10, 2, 0)),
        ],
        astRBracket(getInlineRange(2, 0, 1))
      ),
    ],
    [
      "{\n\tkey1\tvalue1\n\tkey2\tvalue2\n}",
      astObject(
        astLBracket(getInlineRange(0, 0, 1)),
        [
          astLf(getRange(0, 1, 1, 0)),
          astTabs(1, getInlineRange(1, 0, 1)),
          astStringProperty(
            astUnquotedKey("key1", getInlineRange(1, 1, 5)),
            [astTabs(1, getInlineRange(1, 5, 6))],
            astUnquotedString("value1", getInlineRange(1, 6, 12))
          ),
          astLf(getRange(1, 12, 2, 0)),
          astTabs(1, getInlineRange(2, 0, 1)),
          astStringProperty(
            astUnquotedKey("key2", getInlineRange(2, 1, 5)),
            [astTabs(1, getInlineRange(2, 5, 6))],
            astUnquotedString("value2", getInlineRange(2, 6, 12))
          ),
          astLf(getRange(2, 12, 3, 0)),
        ],
        astRBracket(getInlineRange(3, 0, 1))
      ),
    ],
  ];

  for (const [input, expected] of params) {
    test(input, () => {
      const actual = applyParser(objectParser, input);
      expect(actual).toEqual(expected);
    });
  }
});
