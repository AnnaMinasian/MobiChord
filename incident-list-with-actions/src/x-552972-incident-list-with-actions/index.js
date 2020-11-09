import { createCustomElement, actionTypes } from '@servicenow/ui-core';
import { createHttpEffect } from '@servicenow/ui-effect-http';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import '@servicenow/now-template-card';
import '@servicenow/now-modal';
import '@servicenow/now-input';
import styles from './styles.scss';
const { COMPONENT_BOOTSTRAPPED } = actionTypes;

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
					value={currentIncident.state ? currentIncident.short_description : ''}
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
			</now-modal>

		</div >
	);
};

createCustomElement('x-552972-incident-list-with-actions', {
	actionHandlers: {
		[COMPONENT_BOOTSTRAPPED]: (coeffects) => {
			const { dispatch } = coeffects;

			dispatch('FETCH_INCIDENTS', {
				sysparm_display_value: true
			});
		},
		'FETCH_INCIDENTS': createHttpEffect('api/now/table/incident', {
			method: 'GET',
			queryParams: ['sysparm_display_value'],
			successActionType: 'FETCH_INCIDENTS_SUCCESS'
		}),
		'FETCH_INCIDENTS_SUCCESS': (coeffects) => {
			const { action, updateState } = coeffects;
			const { result } = action.payload;

			updateState({ incidents: result });
		},
		'NOW_DROPDOWN_PANEL#ITEM_CLICKED': ({
			action,
			state,
			updateState,
			dispatch,
		}) => {
			const { payload } = action;

			if (payload.item.id === 'open') {
				dispatch("OPEN_INCIDENT_MODAL", { incidentId: payload.item.incidentId });
				updateState({ currentIncident: state.incidents.filter(incident => incident.sys_id == payload.item.incidentId)[0] });
			} else if (payload.item.id === 'delete') {
				dispatch("DELETE_INCIDENT_CLICKED", { incidentId: payload.item.incidentId });
			}
		},
		'OPEN_INCIDENT_MODAL': (coeffects) => {
			const { action, updateState } = coeffects;

			updateState({ showModal: true });
		},
		'DELETE_INCIDENT_CLICKED': ({
			action,
			dispatch,
		}) => {
			dispatch('DELETE_INCIDENT', { sys_id: action.payload.incidentId });
		},
		'DELETE_INCIDENT': createHttpEffect('api/now/table/incident/:sys_id', {
			method: 'DELETE',
			pathParams: ['sys_id'],
			successActionType: 'DELETE_INCIDENT_SUCCESS',
			errorActionType: 'DELETE_INCIDENT_FAILED',
		}),
		'DELETE_INCIDENT_SUCCESS': (coeffects) => {
			const { dispatch } = coeffects;
			dispatch('FETCH_INCIDENTS');
		},
		'DELETE_INCIDENT_FAILED': (coeffects) => {
			// console.log(); possible logging here
		},
		'CLOSE_MODAL': ({
			updateState,
		}) => {
			updateState({ showModal: false });
		},
		'NOW_MODAL#FOOTER_ACTION_CLICKED': ({
			action,
			dispatch,
		}) => {
			const { payload } = action;
			dispatch('DELETE_INCIDENT_CLICKED', { incidentId: payload.footerAction.incidentId });
			dispatch('CLOSE_MODAL');
		},
		'NOW_MODAL#OPENED_SET': ({
			dispatch,
		}) => {
			dispatch('CLOSE_MODAL');
		},



		// First I tried to use Incident table API without setting sysparm_display_value parameter to true. 
		// API returned id-s instead of values for 'state', 'assigned to' etc. fields.
		// I've figured out that it's possible to get these values with api call like below and then map display value.

		// 'FETCH_INCIDENT_STATES': createHttpEffect('api/now/table/sys_choice?sysparm_query=name=incident&element=incident_state', {
		// 	method: 'GET',
		// 	queryParams: ['sysparm_query'],
		// 	successActionType: 'FETCH_INCIDENT_STATES_SUCCESS'
		// }),

	},
	renderer: { type: snabbdom },
	view,
	styles
});
