import React from 'react';
import Select from 'react-select';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const DraggableMultiSelect = ({ options, value, onChange, ...props }) => {
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const items = reorder(
      value,
      result.source.index,
      result.destination.index
    );
    onChange(items);
  };

  const MultiValue = props => {
    return null;
  };

  const customStyles = {
    control: (base) => ({
      ...base,
      marginBottom: '10px',
    }),
    menu: (base) => ({
      ...base,
      maxHeight: '200px',
      overflowY: 'auto'
    })
  };

  return (
    <div>
      <Select
        {...props}
        options={options}
        value={value}
        onChange={onChange}
        isMulti
        components={{ MultiValue }}
        styles={customStyles}
      />
      
      {value?.length > 0 && (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="border rounded"
                style={{
                  height: '200px',
                  overflowY: 'auto',
                  padding: '8px'
                }}
              >
                {value.map((item, index) => (
                  <Draggable 
                    key={item.value} 
                    draggableId={item.value.toString()} 
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="p-2 mb-2 rounded d-flex align-items-center justify-content-between"
                        style={{
                          backgroundColor: snapshot.isDragging ? '#e9ecef' : '#f8f9fa',
                          ...provided.draggableProps.style
                        }}
                      >
                        <span>{item.label}</span>
                        <button
                          onClick={() => {
                            const newValue = value.filter(v => v.value !== item.value);
                            onChange(newValue);
                          }}
                          className="btn btn-link p-0 ms-2"
                          style={{ border: 'none', color: '#6c757d' }}
                          type="button"
                        >
                          ×
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
};

export default DraggableMultiSelect;