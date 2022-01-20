
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { uuid } from 'uuidv4';
import styled from "styled-components";
import { Button, Typography, Tooltip } from "antd";
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { BiEdit } from "react-icons/bi"

const { Paragraph } = Typography;
const columnsFromBackend = {
    ["root"]: {
        name: "Options",
        items: []
    },
};

const onDragEnd = (result, columns, setColumns, setOptions) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        let newColumns = {
            ...columns,
            [source.droppableId]: {
                ...sourceColumn,
                items: sourceItems
            },
            [destination.droppableId]: {
                ...destColumn,
                items: destItems
            }
        }
        setOptions([newColumns])
        setColumns(newColumns);
    } else {
        const column = columns[source.droppableId];
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        let newColumns = {
            ...columns,
            [source.droppableId]: {
                ...column,
                items: copiedItems
            }
        }
        setOptions([newColumns])
        setColumns(newColumns);
    }
};

function MatchingOptions(props) {
    const [columns, setColumns] = useState(props.Options[0]);
    useEffect(() => {
        if (Object.keys(columns).length > 1 && columns.root.items.length===0) {
            Object.keys(columns).forEach(k => {
                if (columns[k].items.length > 0) props.setValidQuestion(true)
            })
        }
        else props.setValidQuestion(false)

        props.setOptions([columns])
    }, [columns])
    const addColumn = () => {
        setColumns({
            ...columns, [uuid()]: {
                name: "newColumn",
                items: []
            }
        })
    }
    const addItem = () => {
        const newItem = { id: uuid(), content: "Second task" }
        const newItems = [...columns.root.items, newItem]
        const newColumn = columns.root
        newColumn.items = newItems
        const newColumns = { ...columns }
        newColumns.root = newColumn
        setColumns(newColumns)
    }
    const deleteItem = (columnID, itemID) => {
        const newItems = columns[columnID].items.filter(x => x.id !== itemID)
        const newColumn = columns[columnID]
        newColumn.items = newItems
        const newColumns = { ...columns }
        newColumns[columnID] = newColumn
        setColumns(newColumns)
    }
    const deleteColumn = (columnID) => {
        Object.filter = (obj, predicate) =>
            Object.keys(obj)
                .filter(key => predicate(key))
                .reduce((res, key) => (res[key] = obj[key], res), {});
        var newColumns = Object.filter(columns, key => key !== columnID);
        setColumns(newColumns)
        //setColumns(columns.map(({ columnID, ...rest }) => rest))
    }
    const changeColumnTitle = (newTitle, columnID) => {
        const newColumn = columns[columnID]
        newColumn.name = newTitle
        const newColumns = { ...columns }
        newColumns[columnID] = newColumn
        setColumns(newColumns)
    }
    const changeItemContent = (newContent, columnID, itemID) => {
        const newColumn = columns[columnID]
        const newItems = newColumn.items
        const itemIndex = newColumn.items.findIndex(i => i.id === itemID)
        newItems.splice(itemIndex, 1, { id: itemID, content: newContent })
        newColumn.items = [...newItems];
        const newColumns = { ...columns }
        newColumns[columnID] = newColumn
        setColumns(newColumns)
    }
    //console.log("columns", columns)
    return (
        <div style={{ display: "flex", justifyContent: "center", height: "100%", flexDirection: "column", gap: "20px", width: "100%" }}>
            <div style={{ display: "flex", gap: "20px" }} >
                <Button1 type="default" onClick={() => addColumn()}>Add Column</Button1>
                <Button1 type="default" onClick={() => addItem()}>Add Item</Button1>
            </div>

            <DragDropContext
                onDragEnd={result => onDragEnd(result, columns, setColumns, props.setOptions)}
            >
                {Object.entries(columns).map(([columnId, column], index) => {
                    return (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "20px",
                                width: "100%",
                            }}
                            key={columnId}
                        >
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <TextField style={{ maxWidth: "300px" }} defaultValue={column.name} required id="standard-basic"
                                    label="Column Title" variant="standard"
                                    onChange={(e) => changeColumnTitle(e.target.value, columnId)}
                                />
                                <Button1 disabled={columnId === "root"} type="default" onClick={() => deleteColumn(columnId)}>delete</Button1>
                            </div>

                            <div >
                                <Droppable droppableId={columnId} key={columnId}>
                                    {(provided, snapshot) => {
                                        return (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                style={{
                                                    background: "#E8E8E8",
                                                    padding: 5,
                                                    width: "100%",
                                                    minHeight: 200,
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                    gap: "5px"
                                                }}
                                            >
                                                {column.items.map((item, index) => {
                                                    return (
                                                        <Draggable
                                                            key={item.id}
                                                            draggableId={item.id}
                                                            index={index}
                                                        >
                                                            {(provided, snapshot) => {
                                                                return (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        style={{
                                                                            // border: "solid 0.5px #AEAEAE",
                                                                            display: "flex",
                                                                            alignItems: "center",
                                                                            justifyContent: "space-between",
                                                                            userSelect: "none",
                                                                            padding: "10px",
                                                                            minHeight: "50px",
                                                                            backgroundColor: "white",
                                                                            color: "white",
                                                                            width: "100%",
                                                                            ...provided.draggableProps.style
                                                                        }}
                                                                    >

                                                                        <CusParagraph
                                                                            ellipsis={true && { rows: 5, expandable: true }}
                                                                            editable={{
                                                                                autoSize: true,
                                                                                tooltip: 'click to edit option',
                                                                                icon: <BiEdit />,
                                                                                onChange: (v) => changeItemContent(v, columnId, item.id),
                                                                            }}
                                                                        >{item.content}
                                                                        </CusParagraph>
                                                                        <Tooltip title="Remove Option">
                                                                            <IconButton onClick={() => deleteItem(columnId, item.id)} className='hi' aria-label="delete">
                                                                                <DeleteIcon />
                                                                            </IconButton></Tooltip>
                                                                    </div>
                                                                );
                                                            }}
                                                        </Draggable>
                                                    );
                                                })}
                                                {provided.placeholder}
                                            </div>
                                        );
                                    }}
                                </Droppable>
                            </div>
                        </div>
                    );
                })}
            </DragDropContext>
        </div>
    );
}
const CusParagraph = styled(Paragraph)`
margin-top: 10px;
font-size: 15px;
line-height: 16px;
width: 90%;
max-width: 40vw;
&>*{
    margin-left: 10px;
}
&>*>*{
    height: 90%;
    width: 18px;
    color: #3c3c3c;
}
`
const Button1 = styled(Button)`
background-color: #E8E8E8;
color: #444444;
border: none;
&:hover{
    animation: btnmove22 0.6s;
    animation-fill-mode: forwards;
    color: #444444;
    border: none
}

@keyframes btnmove22 {
   100% {
    background-color: #444444 ;
    color: white;
   }
   0% {
        background-color: white;
        color: #444444;
   }
}

`
export default MatchingOptions;
