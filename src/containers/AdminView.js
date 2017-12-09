import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addWorkflowItem, moveWorkflowItem, deleteWorkflowItem, saveWorkflow } from 'store/actions';
import WorkflowItem from 'components/WorkflowItem';
import WorkflowAction from 'components/WorkflowAction';
import { DragDropContext, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ItemTypes from 'ItemTypes';
import './AdminView.css';

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
  saveWorkflow
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
export default class AdminView extends Component {

  render() {
    const { items, actions, addWorkflowItem, moveWorkflowItem, deleteWorkflowItem, connectDropTarget } = this.props;
    return (
      <div className="AdminView">
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
          <button type="button" onClick={saveWorkflow(items)}>Save</button>
        </div>
      </div>
    );
  }
}
