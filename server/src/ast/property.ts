import AstBaseNode from "./baseNode";
import AstKey from "./key";
import AstObject from "./object";
import AstString from "./string";

/** The value of a property. */
export type AstValue = AstString | AstObject;

/** A key-value pair within an object. */
export default interface AstProperty extends AstBaseNode {
  type: "property";
  /** The key of the property. */
  key: AstKey;
  /** The value of the property. Can be undefined for incomplete documents. */
  value?: AstValue;
}
