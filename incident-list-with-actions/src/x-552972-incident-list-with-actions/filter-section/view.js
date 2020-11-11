import '@servicenow/now-input';
import '@servicenow/now-dropdown';
import '@servicenow/now-button';
import {
  SEARCH_BUTTON_CLICKED,
  RESET_BUTTON_CLICKED,
} from '../constants';

export const view = (state, dispatch) => {
  const { number, shortDescription, assignmentGroup, assignedTo, selectedStateIds } = state;
  const { incidentStates } = state.properties;

  const search = () => dispatch(SEARCH_BUTTON_CLICKED, { number, shortDescription, assignmentGroup, assignedTo, selectedStateIds });
  const reset = () => dispatch(RESET_BUTTON_CLICKED);

  let items = incidentStates.map(state => (
    {
      label: state.label,
      id: state.sequence
    }
  ));
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
          label="AssignmentGroup"
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
        <div className="dropdown">
          <now-dropdown
            placeholder="Select state"
            select="multi"
            items={items}
            variant="secondary"
            name="selectedStateIds"
            selectedItems={selectedStateIds}
            value={selectedStateIds}
            size="sm"
          ></now-dropdown>
        </div>
        <div className="justify-end">
          <now-button className="marginRight" on-click={search} label="Search" variant="secondary" icon="add-item-above-fill" size="md"></now-button>
          <now-button on-click={reset} label="Reset" variant="secondary-negative" size="md"></now-button>
        </div>
      </div>
    </div >
  );
};
