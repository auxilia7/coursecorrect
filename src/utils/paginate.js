import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  // value returns a regular array
  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value();
}
