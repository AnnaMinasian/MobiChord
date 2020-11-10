import { createCustomElement } from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import '@servicenow/now-template-card';
import '@servicenow/now-modal';
import '@servicenow/now-input';
import styles from './styles.scss';
import actionsHandlers from './actionHandlers';

const view = (state, { updateState }) => {
	const { incidents = [], showModal = false, currentIncident = {} } = state;
	return (
		<div>
			<h2>Incidents</h2>
			<div className="container">
				{incidents.map(item => {
					return (
						<div>
							<now-template-card-assist
								tagline={{ "icon": "tree-view-long-outline", "label": "Incident" }}
								actions={[
									{ id: 'open', label: 'Open Record', incidentId: item.sys_id },
									{ id: 'delete', label: 'Delete', incidentId: item.sys_id }
								]}
								heading={{ "label": item.short_description }}
								content={[
									{
										"label": "Number", "value": {
											"type": "string", "value": item.number
										}
									},
									{
										"label": "State", "value": {
											"type": "string", "value": item.state
										}
									},
									{
										"label": "AssignmentGroup", "value": {
											"type": "string", "value": item.assignment_group.display_value
										}
									},
									{
										"label": "Assigned To", "value": {
											"type": "string", "value": item.assigned_to.display_value
										}
									}]}
								contentItemMinWidth="300" footerContent={{ "label": "Updated", "value": item.sys_updated_on }}
								configAria={{}}>
							</now-template-card-assist>
						</div>
					)
				})}
			</div>
			<now-modal size="lg" opened={showModal}
				content="This is modal text content. It can be set using the 'content' property or as JSX using the default slot."
				footerActions={[{ label: "Delete", variant: "primary-negative", incidentId: currentIncident.sys_id }]}>
				<div className="container">
					<now-input
						className={'modal__label'}
						label="Number"
						type="text"
						value={currentIncident.number ? currentIncident.number : ''}
					></now-input>
					<now-input
						className={'modal__label'}
						label="State"
						type="text"
						value={currentIncident.state ? currentIncident.state : ''}
					></now-input>
					<now-input
						className={'modal__label'}
						label="Opened At"
						type="text"
						value={currentIncident.opened_at ? currentIncident.opened_at : ''}
					></now-input>
					<now-input
						className={'modal__label'}
						label="Short Description"
						type="text"
						value={currentIncident.short_description ? currentIncident.short_description : ''}
					></now-input>
					<now-input
						className={'modal__label'}
						label="Assignment Group"
						type="text"
						value={currentIncident.assignment_group ? currentIncident.assignment_group.display_value : ''}
					></now-input>
					<now-input
						className={'modal__label'}
						label="Assigned To"
						type="text"
						value={currentIncident.assigned_to ? currentIncident.assigned_to.display_value : ''}
					></now-input>
				</div>
			</now-modal>
		</div >
	);
};

createCustomElement('x-552972-incident-list-with-actions', {
	renderer: { type: snabbdom },
	view,
	styles,
	...actionsHandlers
});
