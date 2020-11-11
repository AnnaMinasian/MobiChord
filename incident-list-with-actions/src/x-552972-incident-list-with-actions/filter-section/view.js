import '@servicenow/now-input';
import '@servicenow/now-checkbox';
import '@servicenow/now-button';

export const view = () => {
  return (
    <div>
      <h3>Filters</h3>
      <div className="container">
        <now-input
          className={'modal__label'}
          label="Number"
          type="text"
        ></now-input>
        <now-input
          className={'modal__label'}
          label="Short Description"
          type="text"
        ></now-input>
        <now-input
          className={'modal__label'}
          label="Assignment Group"
          type="text"
        ></now-input>
        <now-input
          className={'modal__label'}
          label="Assigned To"
          type="text"
        ></now-input>
        <div className="block left">
          <now-checkbox label="Active" value="false"></now-checkbox>
          <now-checkbox label="Closed" value="false"></now-checkbox>
        </div>
        <div className="block right">
          <now-button label="Search" variant="secondary" icon="add-item-above-fill" size="md"></now-button>
          <now-button label="Reset" variant="secondary-negative" size="md"></now-button>
        </div>
      </div>
    </div>
  );
};
