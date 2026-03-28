export type DictValue = string | Record<string, unknown>;
type Dict = Record<string, DictValue>;

function resolve(obj: Dict, path: string): string {
  const parts = path.split(".");
  let current: DictValue = obj as DictValue;
  for (const part of parts) {
    if (typeof current !== "object" || current === null) return path;
    current = (current as Record<string, DictValue>)[part] ?? path;
  }
  return typeof current === "string" ? current : path;
}

export function createTranslator(dict: Dict) {
  return function t(key: string, params?: Record<string, string | number>): string {
    let value = resolve(dict, key);
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        value = value.replaceAll(`{{${k}}}`, String(v));
      }
    }
    return value;
  };
}
