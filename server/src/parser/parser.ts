import { alt, apply, rule, tok } from "typescript-parsec";
import AstComment, { astComment } from "../ast/comment";
import AstEndOfLine, { astEndOfLine } from "../ast/endOfLine";
import AstKey, { astKeyFromString } from "../ast/key";
import AstIndent, { astIndent } from "../ast/indent";
import AstString, { astQuotedString, astUnquotedString } from "../ast/string";
import { VDFToken } from "../lexer/lexer";
import { getRangeFromToken } from "./utils";

// To avoid circular imports, all parsers are defined in a single file

// ====================================================================
// DECLARATIONS
// ====================================================================

/** Parse a comment. */
export const commentParser = rule<VDFToken, AstComment>();

/** Parse a string literal value. */
export const stringParser = rule<VDFToken, AstString>();

/** Parse a property key. */
export const keyParser = rule<VDFToken, AstKey>();

/** Parse spaces and tabs (no line endings). */
export const indentParser = rule<VDFToken, AstIndent>();

/** Parse line endings. */
export const endOfLineParser = rule<VDFToken, AstEndOfLine>();

// ====================================================================
// DEFINITIONS
// ====================================================================

// --------------------------------------------------------------------
// Comment
// --------------------------------------------------------------------
commentParser.setPattern(
  apply(tok(VDFToken.comment), (token) => {
    const value = token.text.slice(2);
    const range = getRangeFromToken(token);

    return astComment(value, range);
  })
);

// --------------------------------------------------------------------
// String
// --------------------------------------------------------------------
stringParser.setPattern(
  alt(
    // Quoted string
    apply(tok(VDFToken.quotedString), (token) => {
      const text = token.text;
      const isTerminated = text.length >= 2 && text[text.length - 1] === '"';
      const value = isTerminated
        ? text.slice(1, text.length - 1)
        : text.slice(1);
      const range = getRangeFromToken(token);

      return astQuotedString(isTerminated, value, range);
    }),
    // Unquoted string
    apply(tok(VDFToken.unquotedString), (token) => {
      const value = token.text;
      const range = getRangeFromToken(token);

      return astUnquotedString(value, range);
    })
  )
);

// --------------------------------------------------------------------
// Key
// --------------------------------------------------------------------
keyParser.setPattern(
  apply(stringParser, (astString) => {
    return astKeyFromString(astString);
  })
);

// --------------------------------------------------------------------
// Indent (spaces and tabs)
// --------------------------------------------------------------------
indentParser.setPattern(
  apply(tok(VDFToken.space), (token) => {
    const value = token.text;
    const range = getRangeFromToken(token);

    return astIndent(value, range);
  })
);

// --------------------------------------------------------------------
// End of line
// --------------------------------------------------------------------
endOfLineParser.setPattern(
  apply(tok(VDFToken.endOfLine), (token) => {
    const value = token.text;
    const eolType = token.text === "\n" ? "LF" : "CRLF";
    const range = getRangeFromToken(token);

    return astEndOfLine(value, eolType, range);
  })
);
