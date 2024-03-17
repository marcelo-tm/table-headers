import { useEffect, useState } from "react";
import { FaSort, FaSortUp, FaSortDown, FaX } from "react-icons/fa6";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { SORT_DIRECTIONS } from "./lib/types";

type TableHeaderProps = {
  name: string;
  sortList: string[];
  onChange: (
    name: string,
    sort: SORT_DIRECTIONS | undefined,
    isMulti: boolean
  ) => void;
};

function selectIcon(direction: SORT_DIRECTIONS | undefined) {
  if (direction === SORT_DIRECTIONS.ASC) return <FaSortUp />;
  else if (direction === SORT_DIRECTIONS.DESC) return <FaSortDown />;
  return <FaSort />;
}

export function TableHeader({ name, sortList, onChange }: TableHeaderProps) {
  const [sortDirection, setSortDirection] = useState<
    SORT_DIRECTIONS | undefined
  >(undefined);
  const [sortIndex, setSortIndex] = useState(0);

  useEffect(() => {
    if (sortList.some((item) => item.includes(name))) {
      if (sortList.includes(`${name}_ASC`))
        setSortDirection(SORT_DIRECTIONS.ASC);
      else setSortDirection(SORT_DIRECTIONS.DESC);
    } else {
      setSortDirection(undefined);
      setSortIndex(0);
    }
  }, [name, sortList]);

  console.log();

  useEffect(() => {
    if (
      sortList.length > 1 &&
      sortDirection &&
      sortList.some((item) => item.includes(name))
    ) {
      setSortIndex(sortList.indexOf(`${name}_${sortDirection}`) + 1);
    }
  }, [name, sortDirection, sortList]);

  function handleSortChange(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    sort: SORT_DIRECTIONS | undefined
  ) {
    let isMulti = false;

    // CTRL key on mac opens the context menu
    if (e.ctrlKey || e.metaKey) {
      isMulti = true;
    }
    setSortDirection(sort);
    onChange(name, sort, isMulti);
  }

  return (
    <th className="p-2">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2">
          {name} {selectIcon(sortDirection)}{" "}
          {sortIndex ? <p className="text-sm">{sortIndex}</p> : null}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="gap-2"
            onClick={(e) => handleSortChange(e, SORT_DIRECTIONS.ASC)}
          >
            Sort ASC <FaSortUp />
          </DropdownMenuItem>
          <DropdownMenuItem
            className="gap-2"
            onClick={(e) => handleSortChange(e, SORT_DIRECTIONS.DESC)}
          >
            Sort DESC <FaSortDown />
          </DropdownMenuItem>
          <DropdownMenuItem
            className="gap-2"
            onClick={(e) => handleSortChange(e, undefined)}
          >
            Clear sort <FaX />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </th>
  );
}
