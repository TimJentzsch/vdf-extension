import AstBracket from "./bracket";
import AstComment from "./comment";
import AstEndOfLine from "./endOfLine";
import AstObject from "./object";
import AstProperty from "./property";
import AstIndent from "./indent";
import AstString from "./string";
import AstKey from "./key";
import AstRoot from "./root";

type AstNode =
  | AstBracket
  | AstComment
  | AstEndOfLine
  | AstIndent
  | AstKey
  | AstObject
  | AstProperty
  | AstRoot
  | AstString;

export default AstNode;
