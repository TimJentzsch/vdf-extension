import { getInlineRange } from "../../parser/utils";
import { astComment } from "../../ast/comment";
import { astIndent } from "../../ast/indent";
import { astUnquotedKey } from "../../ast/key";
import AstProperty, {  astStringProperty } from "../../ast/property";
import { astQuotedString } from "../../ast/string";

describe("astStringProperty", () => {
  test("should create string property without trivia", () => {
    const key = astUnquotedKey("key", getInlineRange(0, 0, 3));
    const value = astQuotedString("value", getInlineRange(0, 3, 10));

    const actual = astStringProperty(key, [], value);
    const expected: AstProperty = {
      type: "property",
      valueType: "string",
      key,
      value,
      children: [key, value],
      range: getInlineRange(0, 0, 10),
    };

    expect(actual).toEqual(expected);
  });

  test("should create string property with between trivia", () => {
    const key = astUnquotedKey("key", getInlineRange(0, 0, 3));
    const betweenTrivia = astIndent(" ", getInlineRange(0, 3, 4));
    const value = astQuotedString("value", getInlineRange(0, 4, 11));

    const actual = astStringProperty(key, [betweenTrivia], value);
    const expected: AstProperty = {
      type: "property",
      valueType: "string",
      key,
      value,
      children: [key, betweenTrivia, value],
      range: getInlineRange(0, 0, 11),
    };

    expect(actual).toEqual(expected);
  });

  test("should create string property with post trivia", () => {
    const key = astUnquotedKey("key", getInlineRange(0, 0, 3));
    const value = astQuotedString("value", getInlineRange(0, 3, 10));
    const postTrivia = astComment(" Comment", getInlineRange(0, 10, 20));

    const actual = astStringProperty(key, undefined, value, [postTrivia]);
    const expected: AstProperty = {
      type: "property",
      valueType: "string",
      key,
      value,
      children: [key, value, postTrivia],
      range: getInlineRange(0, 0, 20),
    };

    expect(actual).toEqual(expected);
  });

  test("should create string property with between and post trivia", () => {
    const key = astUnquotedKey("key", getInlineRange(0, 0, 3));
    const betweenTrivia = astIndent(" ", getInlineRange(0, 3, 4));
    const value = astQuotedString("value", getInlineRange(0, 4, 11));
    const postTrivia = astComment(" Comment", getInlineRange(0, 11, 21));

    const actual = astStringProperty(key, [betweenTrivia], value, [postTrivia]);
    const expected: AstProperty = {
      type: "property",
      valueType: "string",
      key,
      value,
      children: [key, betweenTrivia, value, postTrivia],
      range: getInlineRange(0, 0, 21),
    };

    expect(actual).toEqual(expected);
  });
});