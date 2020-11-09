import { createCustomElement, actionTypes } from '@servicenow/ui-core';
import { createHttpEffect } from '@servicenow/ui-effect-http';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import '@servicenow/now-template-card';
import styles from './styles.scss';
const { COMPONENT_BOOTSTRAPPED } = actionTypes;

const view = (state, { updateState }) => {
	const { result = [] } = state;
	return (
		<div>
			<h2>Incidents</h2>
			<div className="container">
				{result.map(item => {
					return (
						<div>
							<now-template-card-assist
								tagline={{ "icon": "tree-view-long-outline", "label": "Incident" }}
								actions={[]}
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
		</div>
	);
};

createCustomElement('x-552972-incident-list', {
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

			updateState({ result });
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
