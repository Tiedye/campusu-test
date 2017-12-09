export const ADD_WORKFLOW_ITEM = 'add workflow item';
export const addWorkflowItem = (action, index) => ({
  type: ADD_WORKFLOW_ITEM,
  action,
  index
});

export const MOVE_WORKFLOW_ITEM = 'move workflow item';
export const moveWorkflowItem = (from, to) => ({
  type: MOVE_WORKFLOW_ITEM,
  from,
  to
});

export const DELETE_WORKFLOW_ITEM = 'delete workflow item';
export const deleteWorkflowItem = index => ({
  type: DELETE_WORKFLOW_ITEM,
  index
});

export const saveWorkflow = (items) => (dispatch) => localStorage.setItem('workflow', JSON.stringify(items));