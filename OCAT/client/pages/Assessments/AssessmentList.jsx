import React, { useEffect, useMemo, useState } from 'react';
import { useRowSelect, useSortBy, useTable } from 'react-table';
import { Button } from 'react-bootstrap';
import { format } from 'date-fns';
import { clone } from 'lodash';
import { AssessmentService } from '../../services/AssessmentService';
import { Checkbox } from '../../components/Checkbox';

export const AssessmentList = () => {
  const [ assessments, setAssessments ] = useState([]);

  const COLUMNS = [
    {
      Header: `ID`,
      accessor: `id`,
    },
    {
      Header: `Cat Name`,
      accessor: `cat_name`,
    },
    {
      Header: `Cat Date of Birth`,
      accessor: `cat_date_of_birth`,
    },
    {
      Header: `Risk Level`,
      accessor: `risk_level`,
    },
    {
      Header: `Score`,
      accessor: `score`,
    },
    {
      Header: `Created at`,
      accessor: `created_at`,
    },
  ];

  // fetch all assessments using the AssessmentService.getList function from OCAT/client/services/AssessmentService.js
  useEffect(() => {
    const fetchAssessments = async () => {
      setAssessments(await AssessmentService.getList());
    };
    fetchAssessments();
  }, []);

  const onClick = async (ids) => {
    const status = await AssessmentService.delete(ids);
    const dlt = ids.Selected;
    if (status.status === 1) {
      // remove the assessments from the page
      let _assessments = clone(assessments);
      for (const id of dlt) {
        _assessments = _assessments.filter((assessment) => assessment.id != id);
      }
      setAssessments(_assessments);
    } else {
      alert(`There was a problem, please try again.`);
    }
  };

  const columns = useMemo(() => COLUMNS, []);

  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    prepareRow,
    rows,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data: assessments,
    },
    useSortBy,
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(_columns => [
        {
          id: `selection`,
          Header: ({ getToggleAllRowsSelectedProps }) =>
            <Checkbox {...getToggleAllRowsSelectedProps()} />,
          Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
        },
        ..._columns,
      ]);
    },
  );

  return (
    <div className="table-responsive">
      <table {...getTableProps()} className="table table-bordered table-hover">
        <thead>
          {headerGroups.map(headerGroup =>
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column =>
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render(`Header`)}
                  <span>
                    {column.isSorted ? column.isSortedDesc ? ` 🔽` : ` 🔼` : ``}
                  </span>
                </th>)}
            </tr>)}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} id={assessments.id}>
                {row.cells.map(cell => <td {...cell.getCellProps()}>{cell.render(`Cell`)}</td>)}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div />
      <Button
        onClick={() => onClick({ Selected: selectedFlatRows.map((row) => row.original.id) })}
        variant="primary"
      >
        Delete selected rows
      </Button>
    </div>
  );
};
