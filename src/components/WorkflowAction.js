import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import ItemTypes from 'ItemTypes';
import './WorkflowAction.css';

const workflowItemSource = {
	beginDrag(props) {
		return {
      action: props.action
    };
  }
}

function collectSource(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		connectDragPreview: connect.dragPreview(),
		isDragging: monitor.isDragging(),
	};
}

@DragSource(ItemTypes.WORKFLOW, workflowItemSource, collectSource)
export default class WorkflowItem extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    action: PropTypes.string.isRequired
  };

  render() {
    const { connectDragSource } = this.props;
    return connectDragSource(
      <div className="workflow-action">
        {this.props.action}
      </div>
    );
  }
}