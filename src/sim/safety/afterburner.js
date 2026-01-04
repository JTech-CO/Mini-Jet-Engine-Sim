import { store } from '../../state/store.js';
import { CFG } from '../../config/simConfig.js';
import { getAbActive } from '../../state/selectors.js';

export function updateAfterburner() {
    store.sys.abActive = getAbActive();
}

