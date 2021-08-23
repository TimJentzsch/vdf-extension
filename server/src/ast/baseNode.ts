import { Range } from "vscode-languageserver/node";
import AstNode from "./node";

export type NodeType =
  | "bracket"
  | "comment"
  | "endOfLine"
  | "key"
  | "object"
  | "property"
  | "indent"
  | "string";

export default interface AstBaseNode {
  /** The type of the node. */
  type: NodeType;
  /** The list of all children of the node. */
  children: AstNode[];
  /** The range of the node in the full text. */
  range: Range;
}