import { store } from '../../state/store.js';
import { CFG } from '../../config/simConfig.js';
import { canvases } from './canvases.js';
import { UI_CONFIG } from '../../config/uiConfig.js';

export function drawGraph() {
    if (!store.uiState.graphMode) return;
    
    const gCtx = canvases.graphCtx;
    const gCvs = canvases.graph;
    if (!gCtx || !gCvs) return;
    
    store.graphData.push({
        rpm: store.sys.rpm / CFG.max,
        egt: store.sys.egt / 800,
        pump: store.sys.pump / 8.0
    });
    
    if (store.graphData.length > gCvs.width) {
        store.graphData.shift();
    }
    
    gCtx.fillStyle = "#000";
    gCtx.fillRect(0, 0, gCvs.width, gCvs.height);
    
    gCtx.strokeStyle = "#333";
    gCtx.lineWidth = 1;
    gCtx.font = "10px sans-serif";
    gCtx.fillStyle = "#888";
    gCtx.textBaseline = "middle";
    
    const drawH = gCvs.height - 20;
    const topPad = UI_CONFIG.graph.topPad;
    
    [0, 0.25, 0.5, 0.75, 1].forEach(p => {
        const y = topPad + drawH - (p * drawH);
        gCtx.beginPath();
        gCtx.moveTo(25, y);
        gCtx.lineTo(gCvs.width, y);
        gCtx.stroke();
        gCtx.fillText((p * 100).toFixed(0) + "%", 2, y + 1);
    });
    
    for (let x = 0; x < gCvs.width; x += UI_CONFIG.graph.gridSpacing) {
        gCtx.beginPath();
        gCtx.moveTo(x, topPad);
        gCtx.lineTo(x, gCvs.height - 5);
        gCtx.stroke();
    }
    
    const drawLine = (key, color) => {
        gCtx.strokeStyle = color;
        gCtx.lineWidth = 1.5;
        gCtx.beginPath();
        
        for (let i = 0; i < store.graphData.length; i++) {
            let val = store.graphData[i][key];
            if (val > 1) val = 1;
            if (val < 0) val = 0;
            
            const x = i + 25;
            const y = topPad + drawH - (val * drawH);
            
            if (i === 0) {
                gCtx.moveTo(x, y);
            } else {
                gCtx.lineTo(x, y);
            }
        }
        gCtx.stroke();
    };
    
    drawLine('rpm', '#4ade80');
    drawLine('egt', '#f87171');
    drawLine('pump', '#facc15');
    
    gCtx.font = "bold 11px sans-serif";
    gCtx.textBaseline = "top";
    gCtx.fillStyle = "#4ade80";
    gCtx.fillText("RPM", 40, 5);
    gCtx.fillStyle = "#f87171";
    gCtx.fillText("EGT", 90, 5);
    gCtx.fillStyle = "#facc15";
    gCtx.fillText("PUMP", 140, 5);
}

