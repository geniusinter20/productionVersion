import React, { Component } from 'react';
import { Input, Button } from "antd";
import styled from 'styled-components';
import "./PracticeTests.css";
import { BsSearch, BsPlusSquareDotted, BsPrinter, BsFileArrowUp } from "react-icons/bs";
import { Table, Badge, Menu, Dropdown, Space, Tag, Popconfirm, Spin, Image } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { CheckCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { connect } from "react-redux";
import { deletePracticeTest, togglePracticeTestStatus, selectedPracticeTest } from "../../../Redux/Actions/practiceTestsActions";
import { useNavigate } from 'react-router-dom';
import { fetchPracticeTestsSuccess } from '../../../Redux/Actions/practiceTestsActions';
import noImage from "../../../Images/noImage.png"

function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}
const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
const mapStateToProps = (state) => {
  const { allPracticeTests } = state;
  const practiceTests = allPracticeTests.practiceTests
  const data = [];
  const loading = state.allPracticeTests.loading;
  practiceTests.forEach(element => {
    data.push({
      testImageID: element.testImageID,
      id: element._id,
      key: 0,
      product: element.testTitle,
      category: element.testCategory,
      testCreatedDate: element.testCreatedDate,
      exams: element.testExamsIDs?element.testExamsIDs.length:0,
      status: element.testStatus,
      price: element.testPrice,

    })
  });
  data.sort((a, b) => (a.testCreateDate > b.testCreateDate) - (a.testCreateDate < b.testCreateDate))
  return {
    data, loading
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchPracticeTestsSuccess: ()=> dispatch(fetchPracticeTestsSuccess()),
    togglePracticeTestStatus: (test) => dispatch(togglePracticeTestStatus(test)),
    deletePracticeTest: (test => dispatch(deletePracticeTest(test))),
    selectedPracticeTest: (id => dispatch(selectedPracticeTest(id)))
  }
}

class PracticeTests extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        dataIndex: 'testImageID',
        render: id=>{
          //console.log(`imageID=${id}`)
          return(<Image fallback={noImage} width={80} height={45} src={id?`https://exporagenius:5000/image/${id}`:noImage}></Image>)}
      },
      {
        title: 'PracticeTest',
        dataIndex: 'product',
      },
      {
        title: 'Category',
        dataIndex: 'category',
      },
      {
        title: 'CreatedDate',
        dataIndex: 'testCreatedDate',
        sorter: {
          compare: (a, b) => (new Date(a.testCreatedDate)> new Date(b.testCreatedDate)) - (new Date(a.testCreatedDate)< new Date(b.testCreatedDate)),
          multiple: 2,
        },
        render: x=> x? new Date(x).toLocaleDateString("en-US", options):null
      },
      {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        render: status => (
          <>
            {
              <Tag className={status === true ? "tag" : "tag1"} icon={status === false ? <MinusCircleOutlined className="icon" /> : <CheckCircleOutlined className="icon" />} color={status === false ? "warning" : 'blue'}>
                {status === true ? "ACTIVE" : "PENDING"}
              </Tag>
            }
          </>
        ),
      },
      {
        title: 'Exams',
        dataIndex: 'exams',
        sorter: {
          compare: (a, b) => a.exams - b.exams,
          multiple: 1,
        },
      },
      {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: (_, record) => (
          <Space size="middle">
            <Dropdown overlay={
              <Menu>
                <Popconfirm
                  title="Are you sure delete this task?"
                  visible={this.state.popVisible}
                  onConfirm={() => { this.confirm(record.id) }}
                  onCancel={this.cancel}
                >
                  <Menu.Item onClick={this.handleDeleteChange} className="menuItemd">Delete</Menu.Item>
                </Popconfirm>
                <Menu.Item onClick={()=>this.handleEdit(record.id)} className="menuIteme">Edit</Menu.Item>
                <Menu.Item className={record.status === true ? "menuItemda" : "menuItema"} onClick={() => this.handleActiveChange(record.id)}>{record.status === true ? <div>deactivate</div> : <div>Activate</div>}</Menu.Item>
              </Menu>
            }>
              <a>
                Action <DownOutlined />
              </a>
            </Dropdown>
          </Space>
        ),
      },

    ];

  }
  componentDidMount(){
    this.props.fetchPracticeTestsSuccess();
  }

  state = {
    selectedRowKeys: [], // Check here to configure the default column
    dataSource: [],
    popVisible: false,
    loading: true,
  };
  static getDerivedStateFromProps(props, state){
    if(!props.loading) {
      return {loading: false}
    }
  }
  confirm = (id) => {
    const temp = this.state.dataSource.filter((e) => e.id !== id);
    this.setState({ dataSource: temp })
    this.setState({ popVisible: false });
    this.props.deletePracticeTest(id)

  };

  cancel = () => {
    this.setState({ popVisible: false });
  };

  handleDeleteChange = () => {
    this.setState({ popVisible: true });
  }
  handleActiveChange = (id) => {
    const selectedTest = this.props.data.filter((e) => e.id === id);
    this.props.togglePracticeTestStatus(selectedTest[0])
  }

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  handleClick() {
    //console.log(this.props)
    this.props.navigate("createpracticetest");
  }

  handleEdit=(id)=>{
    this.props.navigate(`editpracticetest`,{state:{id:id}})
  }

  render() {
    //console.log(this.state.loading)
    //console.log(this.props.data);
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      selections: [
        Table.SELECTION_ALL,
        Table.SELECTION_INVERT,
        Table.SELECTION_NONE,
        {
          key: 'odd',
          text: 'Select Odd Row',
          onSelect: changableRowKeys => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return false;
              }
              return true;
            });
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          },
        },
        {
          key: 'even',
          text: 'Select Even Row',
          onSelect: changableRowKeys => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return true;
              }
              return false;
            });
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          },
        },
      ],
    };
    return (
      <div className="content" >
        <Header>
          <Input style={{ width: "32vw" }} size="large" placeholder="Search" prefix={<BsSearch style={{ marginRight: "10px", color: "#303030" }} />} />
          <div
            style={{
              display: "flex",
              gap: "1vw"
            }}
          >
            <Button shape="round" style={{ height: "40px", width: "100px", display: "flex", alignItems: "center", justifyContent: "Space-evenly", padding: "5px" }} icon={<BsFileArrowUp style={{ height: "75%", width: "30px" }} />}>Export</Button>
            <Button shape="round" style={{ height: "40px", width: "100px", display: "flex", alignItems: "center", justifyContent: "Space-evenly", padding: "5px" }} icon={<BsPrinter style={{ height: "75%", width: "30px" }} />}>Print</Button>
            <Button onClick={() => this.handleClick()} type="primary" shape="round" style={{ height: "40px", width: "135px", display: "flex", alignItems: "center", justifyContent: "Space-evenly", padding: "5px" }} icon={<BsPlusSquareDotted style={{ height: "75%", width: "30px" }} />}>Create Test</Button>
          </div>
        </Header>
        <TableContainer>
          <Table  columns={this.columns} dataSource={this.props.data}
          loading={this.state.loading}
           onChange={onChange} pagination={{ pageSize: 6, size: "small", position: ['bottomCenter'] }} />
        </TableContainer>
      </div>
    );
  }
}

const Header = styled.div`
margin:4vh 4vw 2vh 4vw;
display: flex;
justify-content: space-between;
`
const TableContainer = styled.div`
margin:4vh 4vw 2vh 4vw;
`
export default connect(mapStateToProps, mapDispatchToProps)(PracticeTests);