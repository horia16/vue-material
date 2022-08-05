/**
 * Returns all the classes in a CSS module as a space-separated string.
 */
export default function (module: CSSModuleClasses): string {
  return Object.values(module).join(" ");
}
