import {
    NOW_INPUT_VALUE_SET,
    RESET_BUTTON_CLICKED,
    SEARCH_BUTTON_CLICKED,
    INITIAL_SEARCH_STATE,
    FETCH_INCIDENTS,
    NOW_DROPDOWN_ITEM_CLICKED,
    SHOW_LOADING,
} from '../constants';

export default {
    actionHandlers: {
        [NOW_INPUT_VALUE_SET]: ({ action, updateState }) => {
            const { payload } = action;
            updateState({
                [payload.name]: payload.value,
            });
        },
        [NOW_DROPDOWN_ITEM_CLICKED]: ({ action, updateState }) => {
            const { payload } = action;
            updateState({
                selectedStateIds: payload.value,
            });
        },
        [SEARCH_BUTTON_CLICKED]: ({ dispatch, action }) => {
            dispatch(SHOW_LOADING);
            const { payload } = action;
            let sysparm_query = '';
            if (payload.number) {
                sysparm_query += `^numberLIKE${payload.number}`
            }
            if (payload.shortDescription) {
                sysparm_query += `^short_descriptionLIKE${payload.shortDescription}`
            }
            if (payload.assignmentGroup) {
                sysparm_query += `^assignment_groupLIKE${payload.assignmentGroup}`
            }
            if (payload.assignedTo) {
                sysparm_query += `^assigned_toLIKE${payload.assignedTo}`
            }
            if (payload.selectedStateIds && payload.selectedStateIds.length > 0) {
                // payload.selectedStateIds.forEach(stateId => {
                //     sysparm_query += `^ORstate=${stateId}`
                // });
                if (payload.selectedStateIds) {
                    for (let i = 0; i <= payload.selectedStateIds.length; i++) {
                        if (i == 0) { //for first state selected using AND operator
                            sysparm_query += `^state=${payload.selectedStateIds[i]}`
                        }
                        else { //for all others using OR operator
                            sysparm_query += `^ORstate=${payload.selectedStateIds[i]}`

                        }
                    }
                }
            }
            let query = {
                sysparm_query,
                sysparm_display_value: true
            };
            dispatch(FETCH_INCIDENTS, query);
        },
        [RESET_BUTTON_CLICKED]: (coeffects) => {
            const { updateState } = coeffects;
            updateState(INITIAL_SEARCH_STATE);
        },
    },
}