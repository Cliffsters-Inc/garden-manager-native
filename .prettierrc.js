module.exports = {
  /** config for import sorting @see https://github.com/trivago/prettier-plugin-sort-imports */
  importOrder: ["^@core/(.*)$", "^@server/(.*)$", "^@ui/(.*)$", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true,
};
