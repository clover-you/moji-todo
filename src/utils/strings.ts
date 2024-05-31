/**
 * check whether a string is empty.
 *
 * @param str string that need to be checked
 * @returns if it is empty the return true or return false
 */
export function has(str?: string) {
  const size = str?.trim()?.length ?? 0
  return size > 0
}
