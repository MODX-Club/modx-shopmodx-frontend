export default function join(argument) {
  let delimiter = arguments[0]
  return Array.prototype.slice.call(arguments, 1).join(delimiter)
}
