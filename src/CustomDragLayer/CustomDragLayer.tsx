import React, { FC, CSSProperties } from 'react';
import { XYCoord, useDragLayer } from 'react-dnd';
import { Column } from '../Column';
import { CustomDragLayerContainer } from './styles';

const getItemStyles = (currentOffset: XYCoord | null): CSSProperties => {
  if (!currentOffset) {
    return {
      display: 'none'
    };
  }

  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;

  return {
    transform,
    WebkitTransform: transform
  }
};

export const CustomDragLayer: FC = () => {
  const { isDraggin, item, currentOffset} = useDragLayer(monitor => ({
    item: monitor.getItem(),
    currentOffset: monitor.getSourceClientOffset(),
    isDraggin: monitor.isDragging()
  }));

  return isDraggin ? (
    <CustomDragLayerContainer>
      <div style={getItemStyles(currentOffset)}>
        <Column
          id={item.id}
          text={item.text}
          index={item.index}
          isPreview={true}
        />
      </div>
    </CustomDragLayerContainer>
  ) : null;
};
