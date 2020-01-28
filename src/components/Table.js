import React from 'react';
import MaterialTable from 'material-table';

export default function Table(props) {
  const {data: rows} = props.data;

  if (!rows || rows.length <= 0) {
    return null;
  }

  return (
    rows &&
    rows.length > 0 && (
      <MaterialTable
        columns={[
          {title: 'ID', field: 'id'},
          {title: 'Currency name', field: 'name'},
          {title: 'USD price', field: 'usd_price'},
          {title: 'Date', field: 'last_updated'},
          {title: 'Volume 24h', field: 'volume_24h'},
          {title: '% change 1h', field: 'percent_change_1h'},
          {title: '% change 24h', field: 'percent_change_24h'},
          {title: '% change 7d', field: 'percent_change_7d'},
        ]}
        data={rows.map(item => {
          const tableData = {
            id: item.id,
            name: item.name,
            usd_price: item.usd_price,
            last_updated: item.last_updated,
            volume_24h: item.volume_24h,
            percent_change_1h: item.percent_change_1h,
            percent_change_24h: item.percent_change_24h,
            percent_change_7d: item.percent_change_7d,
          };
          return tableData;
        })}
        title="Измерения"
      />
    )
  );
}
