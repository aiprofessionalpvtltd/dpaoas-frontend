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
    // Dropped outside the list
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

  // Custom components for react-select
  const MultiValue = props => {
    return null; // Hide default multi-value display
  };

  // Custom styles to accommodate the draggable list
  const customStyles = {
    control: (base) => ({
      ...base,
      marginBottom: '10px',
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
                className="p-2 border rounded-md"
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
                        className={`p-2 mb-2 rounded-md flex items-center justify-between ${
                          snapshot.isDragging ? 'bg-blue-100' : 'bg-gray-50'
                        }`}
                      >
                        <span>{item.label}</span>
                        <button
                          onClick={() => {
                            const newValue = value.filter(v => v.value !== item.value);
                            onChange(newValue);
                          }}
                          style={{marginLeft:"6px", border:"none"}}
                          
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