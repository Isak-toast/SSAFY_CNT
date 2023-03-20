import React from "react";
import { useTable, useSortBy } from "react-table";

function Table({ columns, data }) {
  // const headList = columns.map((value, key) => (
  //   <th className="px-6 py-3" key={key}>
  //     {value.Header}
  //   </th>
  // ));

  // console.log(data);

  // const dataList = data.map((value, key) => (
  //   <tr>
  //     <td className="px-6 py-3" key={key}>
  //       {value.order}
  //     </td>
  //     <td className="px-6 py-3" key={key}>
  //       <div>
  //         <div className="flex items-center justify-items-center">
  //           <div className="flex-shrink-0 h-10 w-10">
  //             <img className="mt-2 h-7 w-10 " src={value.imgSrc} alt="" />
  //           </div>
  //           <div className="ml-3">
  //             <div>{value.nation}</div>
  //           </div>
  //         </div>
  //       </div>
  //     </td>
  //     <td className="px-6 py-3" key={key}>
  //       {value.date}
  //     </td>
  //     <td className="px-6 py-3" key={key}>
  //       {value.amount}
  //     </td>
  //     <td className="px-6 py-3" key={key}>
  //       {value.amountPortion}
  //     </td>
  //     <td className="px-6 py-3" key={key}>
  //       {value.weight}
  //     </td>
  //     <td className="px-6 py-3" key={key}>
  //       {value.weightPortion}
  //     </td>
  //     <td className="px-6 py-3" key={key}>
  //       {value.hsCode}
  //     </td>
  //   </tr>
  // ));

  // console.log(dataList);

  // return (
  //   <>
  //     <div className="relative overflow-auto">
  //       <table className="w-full font-mun m-2">
  //         <thead>
  //           <tr>{headList}</tr>
  //         </thead>
  //         <div>
  //           <tbody>{dataList}</tbody>
  //         </div>
  //       </table>
  //     </div>
  //   </>
  // );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);
  console.log({ data });
  return (
    <>
      <table
        {...getTableProps()}
        className="min-w-full divide-y divide-blue-800 font-mun"
      >
        <thead className="bg-blue-300">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()} className="divide-y h-96">
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()} role="cell">
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default Table;

export function AvatarCell({ value }) {
  const imgSrc = "./../../../../../assets/nationalFlags/" + value + ".gif";
  return (
    <div className="flex items-center justify-items-center">
      <div className="flex-shrink-0 h-10 w-10">
        <img className="mt-2 h-7 w-10 " src={imgSrc} alt="" />
      </div>
      <div className="ml-3">
        <div>{value}</div>
      </div>
    </div>
  );
}
