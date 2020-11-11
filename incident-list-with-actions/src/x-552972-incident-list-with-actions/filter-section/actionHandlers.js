import {
    NOW_INPUT_VALUE_SET,
    RESET_BUTTON_CLICKED,
    SEARCH_BUTTON_CLICKED,
    INITIAL_SEARCH_STATE,
    FETCH_INCIDENTS,
    NOW_DROPDOWN_ITEM_CLICKED,
    SHOW_LOADING
} from '../constants';

export default {
    actionHandlers: {
        [NOW_INPUT_VALUE_SET]: ({ action, updateState }) => {
            const { payload } = action;
            updateState({
                [payload.name]: payload.value,
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
        [NOW_DROPDOWN_ITEM_CLICKED]: () => {
        },
    },
}