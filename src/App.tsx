import { useState } from "react";
import { TableHeader } from "./TableHeader";
import { SORT_DIRECTIONS } from "./lib/types";

export default function App() {
  const [sortList, setSortList] = useState<string[]>([]);

  function handleColumnSortChange(
    name: string,
    sort: SORT_DIRECTIONS | undefined,
    isMulti: boolean
  ) {
    let newList: string[] = [];

    if (isMulti) {
      newList = sortList.filter((item) => !item.includes(name));
      if (sort !== undefined) {
        newList = [...newList, `${name}_${sort}`];
      }
    } else {
      if (sort !== undefined) {
        newList = [`${name}_${sort}`];
      }
    }

    setSortList(newList);
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <table className="border-collapse">
        <thead>
          <tr>
            <TableHeader
              name="Status"
              sortList={sortList}
              onChange={handleColumnSortChange}
            />
            <TableHeader
              name="Date"
              sortList={sortList}
              onChange={handleColumnSortChange}
            />
            <TableHeader
              name="Name"
              sortList={sortList}
              onChange={handleColumnSortChange}
            />
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Row 1</td>
            <td>Row 1</td>
            <td>Row 1</td>
          </tr>
          <tr>
            <td>Row 2</td>
            <td>Row 2</td>
            <td>Row 2</td>
          </tr>
          <tr>
            <td>Row 3</td>
            <td>Row 3</td>
            <td>Row 3</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
