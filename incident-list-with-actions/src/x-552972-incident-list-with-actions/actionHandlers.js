import { actionTypes } from '@servicenow/ui-core';
import { createHttpEffect } from '@servicenow/ui-effect-http';
import {
    FETCH_INCIDENTS,
    FETCH_INCIDENTS_SUCCESS,
    NOW_DROPDOWN_PANEL_ITEM_CLICKED,
    DELETE_INCIDENT_CLICKED,
    DELETE_INCIDENT_SUCCESS,
    DELETE_INCIDENT_FAILED,
    DELETE_INCIDENT,
    OPEN_INCIDENT_MODAL,
    NOW_MODAL_FOOTER_ACTION_CLICKED,
    NOW_MODAL_OPENED_SET,
    CLOSE_MODAL
} from './actions';
const { COMPONENT_BOOTSTRAPPED } = actionTypes;

export default {
    actionHandlers: {
        [COMPONENT_BOOTSTRAPPED]: (coeffects) => {
            const { dispatch } = coeffects;

            dispatch(FETCH_INCIDENTS, {
                sysparm_display_value: true
            });
        },
        [FETCH_INCIDENTS]: createHttpEffect('api/now/table/incident', {
            method: 'GET',
            queryParams: ['sysparm_display_value'],
            successActionType: [FETCH_INCIDENTS_SUCCESS]
        }),
        [FETCH_INCIDENTS_SUCCESS]: (coeffects) => {
            const { action, updateState } = coeffects;
            const { result } = action.payload;

            updateState({ incidents: result });
        },
        [NOW_DROPDOWN_PANEL_ITEM_CLICKED]: ({
            action,
            state,
            updateState,
            dispatch,
        }) => {
            const { payload } = action;

            if (payload.item.id === 'open') {
                dispatch(OPEN_INCIDENT_MODAL, { incidentId: payload.item.incidentId });
                updateState({ currentIncident: state.incidents.filter(incident => incident.sys_id == payload.item.incidentId)[0] });
            } else if (payload.item.id === 'delete') {
                dispatch(DELETE_INCIDENT_CLICKED, { incidentId: payload.item.incidentId });
            }
        },
        [OPEN_INCIDENT_MODAL]: (coeffects) => {
            const { action, updateState } = coeffects;

            updateState({ showModal: true });
        },
        [DELETE_INCIDENT_CLICKED]: ({
            action,
            dispatch,
        }) => {
            dispatch(DELETE_INCIDENT, { sys_id: action.payload.incidentId });
        },
        [DELETE_INCIDENT]: createHttpEffect('api/now/table/incident/:sys_id', {
            method: 'DELETE',
            pathParams: ['sys_id'],
            successActionType: [DELETE_INCIDENT_SUCCESS],
            errorActionType: [DELETE_INCIDENT_FAILED],
        }),
        [DELETE_INCIDENT_SUCCESS]: (coeffects) => {
            const { dispatch } = coeffects;
            dispatch(FETCH_INCIDENTS);
        },
        [DELETE_INCIDENT_FAILED]: (coeffects) => {
            // console.log(); possible logging here
        },
        [CLOSE_MODAL]: ({
            updateState,
        }) => {
            updateState({ showModal: false });
        },
        [NOW_MODAL_FOOTER_ACTION_CLICKED]: ({
            action,
            dispatch,
        }) => {
            const { payload } = action;
            dispatch(DELETE_INCIDENT_CLICKED, { incidentId: payload.footerAction.incidentId });
            dispatch(CLOSE_MODAL);
        },
        [NOW_MODAL_OPENED_SET]: ({
            dispatch,
        }) => {
            dispatch(CLOSE_MODAL);
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
}