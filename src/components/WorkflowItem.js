import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from 'ItemTypes';
import './WorkflowItem.css';

const workflowItemSource = {
	beginDrag(props) {
		return {
      id: props.id,
      index: props.index
    };
  }
}

const workflowItemTarget = {
	hover(props, monitor, component) {
    if ('index' in monitor.getItem()) {
      const dragIndex = monitor.getItem().index;
      const hoverIndex = props.index;
      
      if (dragIndex === hoverIndex) {
        return;
      }
  
      props.moveItem(dragIndex, hoverIndex);
  
      monitor.getItem().index = hoverIndex;
    }
  },
  drop(props, monitor, component) {
    if ('action' in monitor.getItem()) {
      props.addItem(monitor.getItem().action, props.index);
    }
  }
}

function collectTarget(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

function collectSource(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		connectDragPreview: connect.dragPreview(),
		isDragging: monitor.isDragging(),
	};
}

@DropTarget(ItemTypes.WORKFLOW, workflowItemTarget, collectTarget)
@DragSource(ItemTypes.WORKFLOW, workflowItemSource, collectSource)
export default class WorkflowItem extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    item: PropTypes.object.isRequired,
    addItem: PropTypes.func.isRequired,
    moveItem: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired
  };

  render() {
    const { connectDragSource, connectDropTarget, deleteItem, index } = this.props;
    return connectDragSource(connectDropTarget(
      <div className="workflow-item">
        <div className="workflow-item-inner">
          {this.props.item.action}
          <span className="delete" onClick={() => deleteItem(index)}>×</span>
        </div>
      </div>
    ));
  }
}