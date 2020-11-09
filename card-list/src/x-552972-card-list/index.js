import { createCustomElement } from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import '@servicenow/now-template-card';
import styles from './styles.scss';

const view = (state, { updateState }) => {
	return (
		<div>
			<now-template-card-assist
				tagline={{ "icon": "tree-view-long-outline", "label": "Process" }}
				actions={[{ "id": "share", "label": "Copy URL" }, { "id": "close", "label": "Mark Complete" }]}
				heading={{ "label": "Submit attachment to malware sandbox and review the results" }}
				content={[{ "label": "State", "value": { "type": "string", "value": "Closed" } }, { "label": "Assigned", "value": { "type": "string", "value": "Carla S" } }, { "label": "Priority", "value": { "type": "string", "value": "Low" } }, { "label": "SLA", "value": { "type": "string", "value": "No SLA Set" } }]}
				contentItemMinWidth="300" footerContent={{ "label": "Updated", "value": "2019-01-15 08:41:09" }}
				configAria={{}}>
			</now-template-card-assist>
			<now-template-card-assist
				tagline={{ "icon": "tree-view-long-outline", "label": "Process" }}
				actions={[{ "id": "share", "label": "Copy URL" }, { "id": "close", "label": "Mark Complete" }]}
				heading={{ "label": "Submit attachment to malware sandbox and review the results" }}
				content={[{ "label": "State", "value": { "type": "string", "value": "Closed" } }, { "label": "Assigned", "value": { "type": "string", "value": "Carla S" } }, { "label": "Priority", "value": { "type": "string", "value": "Low" } }, { "label": "SLA", "value": { "type": "string", "value": "No SLA Set" } }]}
				contentItemMinWidth="300" footerContent={{ "label": "Updated", "value": "2019-01-15 08:41:09" }}
				configAria={{}}>
			</now-template-card-assist>
			<now-template-card-assist
				tagline={{ "icon": "tree-view-long-outline", "label": "Process" }}
				actions={[{ "id": "share", "label": "Copy URL" }, { "id": "close", "label": "Mark Complete" }]}
				heading={{ "label": "Submit attachment to malware sandbox and review the results" }}
				content={[{ "label": "State", "value": { "type": "string", "value": "Closed" } }, { "label": "Assigned", "value": { "type": "string", "value": "Carla S" } }, { "label": "Priority", "value": { "type": "string", "value": "Low" } }, { "label": "SLA", "value": { "type": "string", "value": "No SLA Set" } }]}
				contentItemMinWidth="300" footerContent={{ "label": "Updated", "value": "2019-01-15 08:41:09" }}
				configAria={{}}>
			</now-template-card-assist>
		</div>
	);
};

createCustomElement('x-552972-card-list', {
	renderer: { type: snabbdom },
	view,
	styles
});
