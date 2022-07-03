import { Button, Space, Table } from 'antd';
import { useState } from 'react';
const data = [
 
    {
      "userId": 1,
      "id": 1,
      "title": "delectus aut autem",
      "completed": false
    },
     
    {
        "userId": 2,
        "id": 1,
        "title": "sasf ",
        "completed": true
      },
];

const TodoListing = () => {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  const setAgeSort = () => {
    setSortedInfo({
      order: 'descend',
      columnKey: 'age',
    });
  };

  const columns = [
    {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
    sorter: (a, b) => a.id - b.id,
    sortOrder: sortedInfo.columnKey === 'id' ? sortedInfo.order : null,
    ellipsis: true,
    }, 
    {
    title: 'userId',
    dataIndex: 'userId',
    key: 'userId',
    sorter: (a, b) => a.userId - b.userId,
    sortOrder: sortedInfo.columnKey === 'userId' ? sortedInfo.order : null,
    ellipsis: true,
    },
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title',
      filters: [
        {
          text: 'Joe',
          value: 'Joe',
        },
        {
          text: 'Jim',
          value: 'Jim',
        },
      ],
      filteredValue: filteredInfo.title || null,
      onFilter: (value, record) => record.title.includes(value),
      sorter: (a, b) => a.title.length - b.title.length,
      sortOrder: sortedInfo.columnKey === 'title' ? sortedInfo.order : null,
      ellipsis: true,
    }, 
    {
        title: 'completed',
        dataIndex: 'completed',
        key: 'completed',
        filters: [
          {
            text: 'Yes',
            value: true,
          },
          {
            text: 'No',
            value: false,
          },
        ],
        filteredValue: filteredInfo.completed,
        onFilter: (value, record) => record.completed.includes(value),
        sorter: (a, b) => a.completed.length - b.completed.length,
        sortOrder: sortedInfo.columnKey === 'completed' ? sortedInfo.order : null,
        ellipsis: true,
      }, 
  ];
  return (
    <>
      <Space
        style={{
          marginBottom: 16,
        }}
      >
        <Button onClick={setAgeSort}>Sort age</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table columns={columns} dataSource={data} onChange={handleChange} />
    </>
  );
};

export default TodoListing;