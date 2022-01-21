import React, { Component } from 'react';
import { Input, Button } from "antd";
import styled from 'styled-components';
import "./Exams.css";
import { BsSearch, BsPlusSquareDotted, BsPrinter, BsFileArrowUp } from "react-icons/bs";
import { Table, Badge, Menu, Dropdown, Space, Tag, Popconfirm, Image } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { CheckCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { connect } from "react-redux";
import { deleteExam, toggleExamStatus } from "../../../Redux/Actions/ExamsActions";
import { fetchExamsSuccess } from '../../../Redux/Actions/ExamsActions';
function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}
const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
const mapStateToProps = (state) => {
  const { allExams } = state;
  const exams = allExams.exams
  const data = [];
  const loading = state.allExams.loading;
  exams.forEach(element => {
    data.push({
      key: element.key,
      examName: element.examName,
      examCategory: element.examCategory,
      examCreatedDate: element.examCreatedDate,
      examQuestionsIDs: element.examQuestionsIDs,
      examDuration: element.examDuration,
      examStatus: element.examStatus,
      examImageID: element.examImageID,
    })
  });
  data.sort((a, b) => (a.examCreateDate > b.examCreateDate) - (a.examCreateDate < b.examCreateDate))
  return {
    data, loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleExamStatus: (exam) => dispatch(toggleExamStatus(exam)),
    deleteExam: (key) => dispatch(deleteExam(key))
  }
}


class Exams extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        dataIndex: 'examImageID',
        render: id => <Image width={80} height={45} src={`http://localhost:5000/image/${id}`}></Image>
      },
      {
        title: 'Exam',
        dataIndex: 'examName',
      },
      {
        title: 'Category',
        dataIndex: 'examCategory',
        sorter: {
          compare: (a, b) => a.category.charAt(0) - b.category.charAt(0),
        },
        filters: [
          {
            text: 'PMP',
            value: 'PMP',
          },
          {
            text: 'CAPM',
            value: 'CAPM',
          },
        ],
        onFilter: (value, record) => record.category.indexOf(value) === 0,
      },
      {
        title: 'CreatedDate',
        dataIndex: 'examCreatedDate',
        sorter: {
          compare: (a, b) => (a.createdDate > b.createdDate) - (a.createdDate < b.createdDate),
          multiple: 2,
        },
        render: x => x ? new Date(x).toLocaleDateString("en-US", options) : null
      },
      {
        title: 'Status',
        key: 'status',
        dataIndex: 'examStatus',
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
        title: 'QuestionNo',
        dataIndex: 'examQuestionsIDs',
        sorter: {
          compare: (a, b) => a.exams - b.exams,
          multiple: 1,
        },
        render: ids=><div>{ids ? ids.length:0}</div>
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
                  onConfirm={() => { this.confirm(record.key) }}
                  onCancel={this.cancel}
                >
                  <Menu.Item onClick={this.handleDeleteChange} className="menuItemd">Delete</Menu.Item>
                </Popconfirm>
                <Menu.Item className="menuIteme" onClick={() => this.handleEdit(record.key)}>Edit</Menu.Item>
                <Menu.Item className={record.status === true ? "menuItemda" : "menuItema"} onClick={() => this.handleActiveChange(record.key)}>{record.status === true ? <div>deactivate</div> : <div>Activate</div>}</Menu.Item>
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

  state = {
    selectedRowKeys: [], // Check here to configure the default column
    dataSource: [],
    popVisible: false,
    loading: true,
  };

  confirm = (key) => {
    const temp = this.state.dataSource.filter((e) => e.key !== key);
    this.setState({ dataSource: temp })
    this.setState({ popVisible: false });
    this.props.deleteExam(key)

  };

  cancel = () => {
    this.setState({ popVisible: false });
  };

  handleDeleteChange = () => {
    this.setState({ popVisible: true });

  }
  handleActiveChange = (id) => {
    const selectedTest = this.props.data.filter((e) => e.key === id);
    console.log(selectedTest)
    this.props.toggleExamStatus(selectedTest)

  }

  handleEdit = (key) => {
    this.props.navigate(`editexam`, {
      state: {
        id: key,
      }
    })
  }

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  handleClick() {
    //console.log(this.props)
    this.props.navigate('createexam');
  }

  static getDerivedStateFromProps(props, state) {
    if (!props.loading) {
      return { loading: false }
    }
  }

  render() {
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
      <div className="content">
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
            <Button onClick={() => this.handleClick()} type="primary" shape="round" style={{ height: "40px", width: "135px", display: "flex", alignItems: "center", justifyContent: "Space-evenly", padding: "5px" }} icon={<BsPlusSquareDotted style={{ height: "75%", width: "30px" }} />}>Create Exam</Button>
          </div>
        </Header>
        <TableContainer>
          <Table loading={this.state.loading} rowSelection={rowSelection} columns={this.columns} dataSource={this.props.data} onChange={onChange} pagination={{ pageSize: 6, size: "small", position: ['bottomCenter'] }} />
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
export default connect(mapStateToProps, mapDispatchToProps)(Exams);