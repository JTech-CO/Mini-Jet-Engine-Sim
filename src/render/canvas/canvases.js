import { DOM_IDS } from '../../config/domIds.js';
import { UI_CONFIG } from '../../config/uiConfig.js';

export const canvases = {
    flow: null,
    flowCtx: null,
    graph: null,
    graphCtx: null,
    
    init() {
        const flowCanvas = document.getElementById(DOM_IDS.flowCanvas);
        const graphCanvas = document.getElementById(DOM_IDS.graphCanvas);
        
        this.flow = flowCanvas;
        this.flowCtx = flowCanvas.getContext('2d');
        this.graph = graphCanvas;
        this.graphCtx = graphCanvas.getContext('2d');
        
        // Set flow canvas size
        flowCanvas.width = UI_CONFIG.flowCanvas.width;
        flowCanvas.height = UI_CONFIG.flowCanvas.height;
    },
    
    resizeGraph() {
        if (this.graph) {
            const rect = this.graph.getBoundingClientRect();
            this.graph.width = rect.width;
            this.graph.height = rect.height;
        }
    }
};

