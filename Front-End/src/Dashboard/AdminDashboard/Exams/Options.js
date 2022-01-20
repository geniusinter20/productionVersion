import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form } from 'antd';
const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};


const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }



  return <td {...restProps}>{childNode}</td>;
};



class EditableTable extends React.Component {


  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'Options',
        dataIndex: 'text',
        width: '80%',
        editable: true,
      },

      {

        dataIndex: 'operation',
        render: (_, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
              <a>Delete</a>
            </Popconfirm>
          ) : null,
      },
    ];

    this.state = {
      status: this.props.status,
      dataSource: this.props.Options,
      count: this.props.Options.length,
      Qid: this.props.QID,
      answerKey: this.props.Options.filter(item => item.isAnswer).map(item => item.key),
    };
  }

  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    var temp = dataSource.filter((item) => item.key !== key)
    temp= temp.map((e,ind)=>({...e, key:ind}))
    console.log("rem:", temp)
    this.setState({
      dataSource: [...temp]
    });
    if(temp.length===0) this.props.setValidQuestion(false)
    this.props.setOptions(temp)
  };
  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      text: `Click to edit ${count}`,
      isAnswer: false,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
    this.props.setOptions([...dataSource, newData])
  };
  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    //console.log(newData)
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({
      dataSource: newData,
    });
    this.props.setOptions(newData)
  };
  handleSetAnswer = (row) => {
    this.props.setValidQuestion(true)
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    newData.forEach((e, i) => {
      i === index ? newData[i].isAnswer = true : newData[i].isAnswer = false
    })
    this.setState({
      dataSource: newData,
      answerKey: [index]
    });
    this.props.setOptions(newData)
  };


  static getDerivedStateFromProps(props, state) {
    //console.log("state", state.Qid)
    //console.log("props",props.QID)
    if(state.dataSource !== props.dataSource)
    return{
      dataSource: state.dataSource,
      count: props.Options.length
    }
    return {
      dataSource: props.Options,
      count: props.Options.length
    }
  }
  static getDerivedStateFromProps(props, state){
    if(props.Options.length===0){
        //console.log("cvxvcxvcxvx")
        return{
            dataSource: []
        }
    }
}
  render() {
    //console.log("opt", this.props.Options)
    //console.log("answerKey:", this.state.answerKey[0])

    const { dataSource } = this.state;
    //console.log("dataSource:", dataSource)
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const selectedRowKeys = this.state.answerKey;
    const rowSelection = {
      selectedRowKeys,
      onSelect: (record, selected, selectedRows, nativeEvent) => {
        this.handleSetAnswer(selectedRows[0])
        //console.log("selectedRows", selectedRows)
        //console.log("1",this.props.questionAnswer)
        //this.props.setQuestionAnswer(selectedRows)
        //console.log("2",this.props.questionAnswer)
      }
    }
    //console.log("rowselec", rowSelection)
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <Button
          onClick={this.handleAdd}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          Add Option
        </Button>
        <Table
        pagination={{ position: ["none"] }}
          rowSelection={{
            type: "radio",
            ...rowSelection,
          }
          }
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    );
  }
}

export default EditableTable;