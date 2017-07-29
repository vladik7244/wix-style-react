# Full Page Table component

> A table component for displaying data

## Properties

| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| id | string | - | - | An id to pass to the table |
| data | array | [] | - | The data to display |
| columns | array | [] | - | Configuration of the table's columns. See table below |
| rowDataHook | string | - | - | A data-hook to apply to all table body rows |
| rowClass | string or func | - | - | A class to apply to all table body rows. if rowClass is func, the return value will be used as the class. |
| onRowClick | func | - | - | A callback method to be called on row click. Signature: `onRowClick(rowData, rowNum)` |
| infiniteScroll | bool | false | - | If true, table will not render all data to begin with, but will gradually render the data as the user scrolls |
| itemsPerPage | number | 20 | - | If infiniteScroll is on, this prop will determine how many rows will be rendered on each load |
| width | string or num | '100%' | - | The width of the table. |
| hasMore | boolean | false | - | Whether there are more items to be loaded. Event listeners are removed if false.
| loadMore | func | null | - | A callback when more items are requested by the user. |
| loader | node | Loading ...| - | The loader to show when loading more items. |
| useWindow | boolean | true | - | Add scroll listeners to the window, or else, the component's parentNode. |
| scrollElement | DOM Object | - | - | Add scroll listeners to specified DOM Object. |
| height | number or string | '100%' | - | Table height |
| onSort | func | - | - | A callback that will be called when clicking on sortable header columns.  Signature: `onSort(sortKey)`|
| columnToSortBy | string | - | - | the sortKey of the current acrive sortable column|
| hideHeader | bool | false | - | if true, table header will be hidden|

### Column object props

| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| title | string or node | - | true | A string or any element, the column's header title  |
| render | func | - | true | A function to render column cells. The function will be called with each row's data and should return a TableCell(see below). Signature: `render(rowData, rowNum)` |
| width | string | - | - | The width to apply to the column. No value means column will try to contain its children, if possible |
| sortable | boolean | false | - | is the column sortable |
| sortyKey | string | - | - | the value that will be passed to onSort when clicking on a sortable column |

### TableCell component props
> A cell component for the return value of the column render function

| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| padding | number | 15 | - | The padding of the cell. the padding wil be applied automatically to the header cell's paddingLeft and paddingRight.|

