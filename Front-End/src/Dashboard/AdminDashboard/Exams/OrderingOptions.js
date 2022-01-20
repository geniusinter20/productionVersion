import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form } from 'antd';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import { MenuOutlined } from '@ant-design/icons';
import { arrayMoveImmutable } from 'array-move';
import "./OrderingOptions.css";

const EditableContext = React.createContext(null);
const DragHandle = sortableHandle(() => <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />);
const SortableItem = sortableElement(props => <tr  {...props} />);
const SortableContainer = sortableContainer(props => <tbody {...props} />);
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

export default class OrderingOptions extends React.Component {

  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'Sort',
        dataIndex: 'sort',
        width: 30,
        className: 'drag-visible',
        render: () => <DragHandle />,
      },
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
      dataSource: this.props.status === "editing" ? this.props.Options : [],
      count: this.props.Options.length,
      Qid: this.props.QID,

    };
  }

  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    
    var temp = dataSource.filter((item) => item.key !== key)
    temp = temp.map((e, ind) => ({ ...e, key: ind }))
    console.log("rem:", temp)
    this.setState({
      dataSource: [...temp]
    });
    if(temp.length===0) this.props.setValidQuestion(false)
    this.props.setOptions(temp)
  };
  handleAdd = () => {
    this.props.setValidQuestion(true)
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      text: `Click to edit ${count}`,
      index: dataSource.length
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
    this.props.setOptions([...dataSource, newData])
  };
  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    //console.log(row.key)
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({
      dataSource: newData,
    });
    this.props.setOptions(newData)
  };


  static getDerivedStateFromProps(props, state) {
    //console.log("state", state.Qid)
    //console.log("props",props.QID)
    if (state.dataSource !== props.dataSource)
      return {
        dataSource: state.dataSource,
        count: props.Options.length
      }
    return {
      dataSource: props.Options,
      count: props.Options.length
    }
  }
  onSortEnd = ({ oldIndex, newIndex }) => {
    const { dataSource } = this.state;
    if (oldIndex !== newIndex) {
      const newData = arrayMoveImmutable([].concat(dataSource), oldIndex, newIndex).filter(el => !!el);
      //console.log('Sorted items: ', newData);
      this.setState({ dataSource: newData });
      this.props.setOptions(newData)
    }
  };
  DraggableContainer = props => (
    <SortableContainer
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={this.onSortEnd}
      {...props}
    />
  );

  DraggableBodyRow = ({ className, style, ...restProps }) => {
    const { dataSource } = this.state;
    const [form] = this.props.useForm();
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = dataSource.findIndex(x => x.index === restProps['data-row-key']);
    return <Form form={form} component={false}  >
        <EditableContext.Provider value={form} >
          <SortableItem index={index} {...restProps} ></SortableItem>
        </EditableContext.Provider>
      </Form>
    ;
    // return <SortableItem index={index} {...restProps} >
    //   <Form form={form} component={false} >
    //     <EditableContext.Provider value={form} style={{borderStyle:"solid"}}>
    //       <tr {...restProps} />
    //     </EditableContext.Provider>
    //   </Form>
    // </SortableItem>;
  };
  static getDerivedStateFromProps(props, state) {
    if (props.Options.length === 0) {
      //console.log("cvxvcxvcxvx")
      return {
        dataSource: []
      }
    }
  }
  render() {
    const { dataSource } = this.state;
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
      <div >
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
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
          rowKey="index"
          components={{
            body: {
              wrapper: this.DraggableContainer,
              row: this.DraggableBodyRow,
              cell: EditableCell,
            },
          }}
        />
      </div>
    );
  }
}
