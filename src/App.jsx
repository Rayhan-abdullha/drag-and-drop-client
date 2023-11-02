import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { imgData } from "./db/data";
import Modal from "./components/modal/Modal";
import Card from "./components/card/Card";
import Header from "./components/header/Header";

function App() {
  const [data, setData] = useState(imgData);
  const [selectId, setSetSelectId] = useState([]);
  const [confirmDel, setConfirmDel] = useState(false);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(data);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setData(items);
  };

  const handleSelect = (id) => {
    if (selectId.includes(id)) {
      const filterId = selectId.filter((idx) => idx !== id);
      setSetSelectId(filterId);
    } else {
      setSetSelectId([...selectId, id]);
    }
  };

  const confirmDeleteImages = (confimed = true) => {
    if (confimed) {
      const filterData = data.filter((item) => !selectId.includes(item.id));
      setData(filterData);
      setConfirmDel(false);
      setSetSelectId([]);
    } else {
      setConfirmDel(confimed);
    }
  };

  return (
    <div className="App">
      <Header setConfirmDel={setConfirmDel} selectId={selectId} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable-1">
          {(provided) => (
            <div
              className="image-gallery"
              ref={provided.innerRef}
              {...provided.draggableProps}
            >
              {data.map((image, index) => (
                <Draggable
                  key={image.id}
                  draggableId={image.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <Card
                      image={image}
                      index={index}
                      provided={provided}
                      handleSelect={handleSelect}
                      selectId={selectId}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {confirmDel && (
        <Modal openmodal={confirmDel} confirmDel={confirmDeleteImages} />
      )}
    </div>
  );
}

export default App;
