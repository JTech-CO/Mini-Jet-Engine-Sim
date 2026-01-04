import { store } from '../../state/store.js';
import { els } from '../dom.js';
import { setGraphMode } from '../../state/actions.js';
import { canvases } from '../../render/canvas/canvases.js';

export function initGsuGraph() {
    if (!els.btnGraph || !els.textMode || !els.graphMode) return;
    
    els.btnGraph.addEventListener('click', () => {
        const newMode = !store.uiState.graphMode;
        setGraphMode(newMode);
        
        if (newMode) {
            els.textMode.style.display = 'none';
            els.graphMode.style.display = 'block';
            els.btnGraph.classList.add('bg-blue-700', 'border-blue-400', 'text-white');
            canvases.resizeGraph();
        } else {
            els.textMode.style.display = 'flex';
            els.graphMode.style.display = 'none';
            els.btnGraph.classList.remove('bg-blue-700', 'border-blue-400', 'text-white');
        }
    });
}

