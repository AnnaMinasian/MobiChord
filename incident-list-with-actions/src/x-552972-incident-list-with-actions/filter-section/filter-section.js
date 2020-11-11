import { createCustomElement } from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';
import { view } from './view';
import actionHandlers from './actionHandlers';

createCustomElement('filter-section', {
  renderer: { type: snabbdom },
  view,
  styles,
  ...actionHandlers,
});
