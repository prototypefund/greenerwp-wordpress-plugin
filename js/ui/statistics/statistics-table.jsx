import {
	useSortBy,
  useTable
} from 'react-table'

import React from 'react';

const { __, _x, _n, _nx } = wp.i18n;

const StatisticsTable = ( props ) => {
	var entries = [];

	const columns = React.useMemo( () => [
		{
			Header: __( 'Path', 'greenerwp' ),
			Cell: ( { cell: {value}, row: row } ) => (
				<>
				{String(value)}
				<div class="row-actions">
					<a target="_blank" href={"https://scan.greenerwp.net/?url=" + encodeURIComponent( row.original.url ) }>{ __( 'Scan page', 'greenerwp' ) }</a>
				</div>
				</>
			),
			accessor: 'path',
		},
		{
			Header: __( 'Post', 'greenerwp' ),
			Cell: ( { cell: {value}, row: row } ) => (
				<>
					{ value &&
						<a href={ row.original.permalink }>
							{String(value)}
						</a>
					}
				</>
			),
			accessor: 'title',
		},
		{
			Header: __( 'Size', 'greenerwp' ),
			Cell: ( { cell: {value} } ) => (
				<>{String( Math.round( value / 1000 ) / 1000 )} MB</>
			),
			accessor: 'transferred',
			sortDescFirst: true,
		},
		{
			Header: __( 'Views', 'greenerwp' ),
			accessor: 'views',
			sortDescFirst: true,
		},
		{
			Header: __( 'Total', 'greenerwp' ),
			Cell: ( { cell: {value} } ) => (
				<>{String( Math.round( value / 1000 ) / 1000 )} MB</>
			),
			accessor: 'totalTransferred',
			sortDescFirst: true,
		},
	], [] );

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
  } = useTable({
    columns,
    data: props.statistics,
		disableSortRemove: true,
		initialState: {
			sortBy: [
				{
					id: 'totalTransferred',
					desc: true,
				},
			],
		},
  },
							 useSortBy
	);

	var table = (
		<table {...getTableProps()} class="wp-list-table widefat fixed striped ">
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
							<th {...column.getHeaderProps(column.getSortByToggleProps())}>
								{column.render('Header')}
								<span>
                  {column.isSorted
                  ? column.isSortedDesc
                  ? ' 🔽'
                  : ' 🔼'
                  : ''}
                </span>
							</th>
            ))}
          </tr>
        ))}
      </thead>
			<tbody {...getTableBodyProps()}>
				{rows.map(
					(row, i) => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map(cell => {
									return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
								})}
							</tr>
						)}
				)}
			</tbody>
		</table>
	);

	return (
		<div>
			{ props.isLoading && (
					<p>
						{__( 'Loading statistics...', 'greenerwp' )}
					</p>
			) }
			{ props.hasError && (
					<p>
						{__( 'Could not load statistics.', 'greenerwp' )}
					</p>
			) }
			{ ! props.isLoading && ! props.hasError && table }
		</div>
	);
};

export default StatisticsTable;