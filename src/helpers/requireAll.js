// requires and returns all modules that match
export default function requireAll(requireContext) {
  if (__DEV__) {
    console.info(requireContext.keys());
  }
  return requireContext.keys().map(requireContext);
}
