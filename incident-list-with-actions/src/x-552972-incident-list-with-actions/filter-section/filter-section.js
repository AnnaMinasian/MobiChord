import { createCustomElement } from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';
import { view } from './view';

createCustomElement('filter-section', {
  renderer: { type: snabbdom },
  view,
  styles,
});
