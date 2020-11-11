import '@servicenow/now-input';
import '@servicenow/now-dropdown';
import '@servicenow/now-button';
import {
  SEARCH_BUTTON_CLICKED,
  RESET_BUTTON_CLICKED,
} from '../constants';

export const view = (state, dispatch) => {
  const { number, shortDescription, assignmentGroup, assignedTo } = state;
  const search = () => dispatch(SEARCH_BUTTON_CLICKED, { number, shortDescription, assignmentGroup, assignedTo });
  const reset = () => dispatch(RESET_BUTTON_CLICKED);
  return (
    <div>
      <h3>Filters</h3>
      <div className="container">
        <now-input
          className={'modal__label'}
          label="Number"
          name="number"
          type="text"
          value={number}
        ></now-input>
        <now-input
          className={'modal__label'}
          label="Short Description"
          name="shortDescription"
          value={shortDescription}
          type="text"
        ></now-input>
        <now-input
          className={'modal__label'}
          label="assignmentGroup"
          type="text"
          name="assignmentGroup"
          value={assignmentGroup}
        ></now-input>
        <now-input
          className={'modal__label'}
          label="Assigned To"
          type="text"
          name="assignedTo"
          value={assignedTo}
        ></now-input>
        <div className="block left">
          <now-dropdown
            placeholder="Select state"
            select="single"
            items={[
              { id: 'new', label: 'New' },
              { id: 'inProgress', label: 'In Progress' },
              { id: 'onHold', label: 'On Hold' },
            ]}
            variant="secondary"
            size="sm"
          ></now-dropdown>
        </div>
        <div className="block right">
          <now-button on-click={search} label="Search" variant="secondary" icon="add-item-above-fill" size="md"></now-button>
          <now-button on-click={reset} label="Reset" variant="secondary-negative" size="md"></now-button>
        </div>
      </div>
    </div>
  );
};
