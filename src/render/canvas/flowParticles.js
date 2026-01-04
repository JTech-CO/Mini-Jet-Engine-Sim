import { store } from '../../state/store.js';
import { CFG } from '../../config/simConfig.js';
import { random } from '../../utils/rand.js';
import { getAbActive } from '../../state/selectors.js';
import { canvases } from './canvases.js';

export function spawnFlowParticle() {
    if (store.sys.rpm < 1000) return;
    
    let speed = 5 + (store.sys.rpm / 2500);
    
    // Base Color
    let color = store.sys.egt > 400 
        ? `rgba(255, ${Math.random() * 150}, 0, 0.6)` 
        : 'rgba(200,200,200,0.3)';
    
    // Afterburner Effect
    if (getAbActive()) {
        speed *= 2.5;
        const abColors = [
            'rgba(100, 200, 255, 0.9)',
            'rgba(180, 50, 255, 0.8)',
            'rgba(255, 255, 255, 1.0)'
        ];
        color = abColors[Math.floor(Math.random() * abColors.length)];
    }
    
    // 고속에서 입자가 끊겨 보이는 것을 방지하기 위해 생성 위치(x)를 현재 속도(speed) 범위 내에서 무작위로 분산
    let spreadX = Math.random() * speed;
    
    store.particles.push({
        x: 450 + spreadX,
        y: 270 + (random(-0.5, 0.5)) * 35,
        vx: speed + random(0, 2),
        vy: (random(-0.5, 0.5)) * 1.0,
        life: 1,
        color: color,
        size: 1.75
    });
}

export function updateParticles() {
    const ctx = canvases.flowCtx;
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvases.flow.width, canvases.flow.height);
    
    // RPM 당 입자 수 증가
    let spawnCount = Math.floor(store.sys.rpm / 1000);
    if (spawnCount < 1 && store.sys.rpm > 1000) spawnCount = 1;
    if (spawnCount > 40) spawnCount = 40;
    
    for (let k = 0; k < spawnCount; k++) {
        spawnFlowParticle();
    }
    
    for (let i = store.particles.length - 1; i >= 0; i--) {
        const p = store.particles[i];
        
        // 이동 경로를 따라 그려 모션 블러 효과
        const oldX = p.x;
        const oldY = p.y;
        
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.015;
        
        if (p.life <= 0) {
            store.particles.splice(i, 1);
        } else {
            ctx.beginPath();
            
            // 입자가 빠르게 움직일 때는 점 대신 선(Streak) 형태로 그려 연속성 부여
            if (p.vx > 10) {
                ctx.moveTo(oldX, oldY);
                ctx.lineTo(p.x, p.y);
                ctx.lineWidth = p.size * 1.75;
                ctx.lineCap = 'round';
                ctx.strokeStyle = p.color.replace(/[\d.]+\)$/, p.life + ')');
                ctx.stroke();
            } else {
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color.replace(/[\d.]+\)$/, p.life + ')');
                ctx.fill();
            }
            
            // 글로우 효과 유지
            ctx.globalCompositeOperation = 'lighter';
            
            // 고속 시 추가 광원 효과
            if (getAbActive()) {
                ctx.shadowBlur = 10;
                ctx.shadowColor = p.color;
            }
            
            ctx.globalCompositeOperation = 'source-over';
            ctx.shadowBlur = 0; // 리셋
        }
    }
}

