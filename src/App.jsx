import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { imgData } from "./data";
import Modal from "./components/Modal";

function App() {
  const [data, setData] = useState(imgData);
  const [selectId, setSetSelectId] = useState([]);
  const [confirmDel, setConfirmDel] = useState(false);

  //
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(data);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setData(items);
  };

  //

  const handleSelect = (id) => {
    if (selectId.includes(id)) {
      const filterId = selectId.filter((idx) => idx !== id);
      setSetSelectId(filterId);
    } else {
      setSetSelectId([...selectId, id]);
    }
  };

  const handleDeleteImg = () => {
    setConfirmDel(true);
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
      <div className="header">
        <div className="selected">
          {selectId.length !== 0 ? (
            <>
              <input type="checkbox" defaultChecked />
              <h3>{selectId.length || 0} Files Selected</h3>
            </>
          ) : (
            <h3>Gallery</h3>
          )}
        </div>
        {selectId.length !== 0 && (
          <button className="delete-button" onClick={handleDeleteImg}>
            Deleted Files
          </button>
        )}
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="imgCard">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <div className="image-gallery">
                {data.map((image, index) => (
                  <Draggable
                    key={image.id}
                    draggableId={image.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        key={index}
                        className={`image-card ${
                          index === 0 ? "big" : "small"
                        }`}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <input
                          onClick={() => handleSelect(image.id)}
                          type="checkbox"
                        />
                        <img src={image.img} alt={`Image ${index + 1}`} />
                        <div
                          className={`${
                            selectId.includes(image.id) ? "" : "overlay"
                          }`}
                        ></div>
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>
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
