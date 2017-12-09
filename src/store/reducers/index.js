import { combineReducers } from 'redux';

import { ADD_WORKFLOW_ITEM, MOVE_WORKFLOW_ITEM, DELETE_WORKFLOW_ITEM } from "../actions";

export const initialWorkflowState = {
  actions: [
		"Import",
		"Export",
		"Sort",
		"Extract",
		"Split",
	],
  items: [
		{
			"id": 1,
			"action": "Import"
		},
		{
			"id": 2,
			"action": "Sort"
		},
		{
			"id": 3,
			"action": "Extract"
		},
		{
			"id": 4,
			"action": "Export"
		}
	]
};


const workflow = (state = initialWorkflowState, action) => {
  switch (action.type) {
    case ADD_WORKFLOW_ITEM: {
      const items = [...state.items];
      const id = items.reduce((maxId, item) => Math.max(maxId, item.id), 0) + 1;
      items.splice(action.index, 0, { id, action: action.action});
      return {
        ...state,
        items
      };
    }
    case MOVE_WORKFLOW_ITEM: {
      const items = [...state.items];
      const item = items[action.from];
      items.splice(action.from, 1);
      items.splice(action.to, 0, item);
      return {
        ...state,
        items
      };
    }
    case DELETE_WORKFLOW_ITEM: {
      const items = [...state.items];
      items.splice(action.index, 1);
      return {
        ...state,
        items
      };
    }
    default: return state;
  }
}

const rootReducer = combineReducers({
  workflow
});

export default rootReducer;
