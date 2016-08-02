function getDataPlaceholderSelector(key) {
  return '[data-smx-ph="' + key + '"]';
}

export default function populateDataPlaceholders(phObject, updateElement) {

  Object.keys(phObject).map(function map(key, index) {
    updateElement(getDataPlaceholderSelector(key), phObject[key]);
  })

}
