import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';

const view = (state, {updateState}) => {
	return (
		<div>My name is Anna! It's my first component.</div>
	);
};

createCustomElement('x-552972-my-component', {
	renderer: {type: snabbdom},
	view,
	styles
});