import React,{useEffect} from 'react';
import { Button, Space, Table,Spin, Input, Col,Row } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos,startTodoFetch } from '../redux/actions';

const { Search } = Input;

 
const TodoListing = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state)


  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => { 
    dispatch(startTodoFetch());

    setTimeout(() => { 
         dispatch(fetchTodos());
    },1000);
   }, [dispatch]); 


  const handleChange = (pagination, filters, sorter) => {
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
      columnKey: 'id',
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

  const onSearch=(e)=>{ 
    setSearchTerm(e);
    localStorage.setItem('searchTerm',e);
  }

  /*-----SEARCH IN LIST OBJCET */
  const resetFilter = ()=>{
    setSearchTerm('');
    localStorage.removeItem('searchTerm');
  }

  let listData = counter?.list?.data ? counter?.list?.data:[];
  let searchString = searchTerm || localStorage.getItem('searchTerm');
  if(searchString){
    searchString = searchString.toLowerCase();
    let newResultArr = listData && listData.length && listData.reduce((acc,item)=>{
        
        let objTitle = item.title.toLowerCase();
        if(objTitle.includes(searchString)){
          acc.push(item)
        }
        return acc;
    },[]);
    listData = newResultArr;
  }
  /*-----SEARCH IN LIST OBJCET */


  return (
    <>
    {counter?.error ? 
      <h1>{counter?.error}</h1>
    :  
    <Spin tip='Please wait loading...' spinning={counter?.loading}>
        
      <Row gutter={24}
       style={{
          marginTop: 16,
        }}
      >
        <Col span={2}>
         </Col>
        <Col span={18}>
              <Search className="searchBar"
              defaultValue={searchString || ''}
              placeholder="Search on Table Data" onSearch={onSearch} />
        </Col>
        <Col span={4}>
        <Button onClick={resetFilter}>Reset</Button> 
         </Col>
      </Row> 



      <Row gutter={24}>
        <Col span={2}>
        </Col>
        <Col span={20}>
          <Space
            style={{
              marginBottom: 16,
              marginTop: 16,
            }}
          >
            <Button onClick={setAgeSort}>Sort age</Button>
            <Button onClick={clearFilters}>Clear filters</Button>
            <Button onClick={clearAll}>Clear filters and sorters</Button>
          </Space>
         </Col>
         <Col span={2}>
        </Col>
      </Row>
      
      <Row gutter={24}>
        <Col span={24}> 
          <Table columns={columns} dataSource={listData} onChange={handleChange} /> 
        </Col>
      </Row>
      </Spin> }
     
    </>
  );
};

export default TodoListing;