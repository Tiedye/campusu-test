import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addWorkflowItem, moveWorkflowItem, deleteWorkflowItem, saveWorkflow, revertWorkflow } from 'store/actions';
import WorkflowItem from 'components/WorkflowItem';
import WorkflowAction from 'components/WorkflowAction';
import { DragDropContext, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ItemTypes from 'ItemTypes';
import './WorkflowView.css';
import { Link } from 'react-router-dom';

function collectTarget(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

@connect(state => ({
  actions: state.workflow.actions,
  items: state.workflow.items
}), {
  addWorkflowItem,
  moveWorkflowItem,
  deleteWorkflowItem,
  saveWorkflow,
  revertWorkflow
})
@DragDropContext(HTML5Backend)
@DropTarget(ItemTypes.WORKFLOW, {
  drop(props, monitor, component) {
    if (props.items.length === 0) {
      props.addWorkflowItem(monitor.getItem().action, 0);
    }
  },
  canDrop(props) {
    return props.items.length === 0;
  }
}, collectTarget)
export default class WorkflowView extends Component {
  render() {
    const { items, actions, addWorkflowItem, moveWorkflowItem, deleteWorkflowItem, connectDropTarget, saveWorkflow, revertWorkflow, match } = this.props;
    return (
      <div className="WorkflowView">
        <div className="workflow">
          <div className="actions">
            {actions.map((action, i) => (
              <WorkflowAction
                key={action}
                action={action}
              />
            ))}
          </div>
          {connectDropTarget(<div className="items">
            {items.map((item, i) => (
              <WorkflowItem
                key={item.id}
                index={i}
                item={item}
                addItem={addWorkflowItem}
                moveItem={moveWorkflowItem}
                deleteItem={deleteWorkflowItem}
              />
            ))}
          </div>)}
        </div>
        <div className="buttons">
          <Link onClick={() => saveWorkflow(items)} to={match.url.substring(0, match.url.lastIndexOf("/"))}>
          <button>Save</button>
          </Link>
          <Link onClick={() => revertWorkflow()} to={match.url.substring(0, match.url.lastIndexOf("/"))}>
          <button>Cancel</button>
          </Link>
        </div>
      </div>
    );
  }
}
