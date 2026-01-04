import { store } from '../../state/store.js';
import { els } from '../../ui/dom.js';
import { ST } from '../../config/enums.js';

export function updateWiring() {
    if (!els.wires) return;
    
    els.wires.rx.classList.toggle('active', store.sys.throt !== store.sys.lastThrot);
    els.wires.start.classList.toggle('active', store.sys.state === ST.START || store.sys.rpm > 1000);
    els.wires.pump.classList.toggle('active', store.sys.pump > 0.5);
}

