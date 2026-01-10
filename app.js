/* ADD-ON PARA ETAPA 4 */

/* Módulos */
.module-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
.module-card { cursor: pointer; transition: transform 0.2s; position: relative; overflow: hidden; }
.module-card:hover { transform: translateY(-5px); border-color: var(--primary); }
.module-card.locked { opacity: 0.6; cursor: not-allowed; filter: grayscale(1); }
.module-icon { font-size: 2.5rem; margin-bottom: 1rem; color: var(--secondary); }
.status-tag { padding: 4px 8px; border-radius: 4px; font-size: 0.7rem; text-transform: uppercase; background: rgba(255,255,255,0.1); }
.status-tag.available { background: var(--success); color: #000; }

/* Gráfico Circular */
.circular-chart { display: block; margin: 0 auto; max-width: 100px; max-height: 250px; }
.circle-bg { fill: none; stroke: rgba(255,255,255,0.1); stroke-width: 3.8; }
.circle { fill: none; stroke-width: 2.8; stroke-linecap: round; animation: progress 1s ease-out forwards; stroke: var(--primary); }
.percentage { fill: #fff; font-family: var(--font-main); font-weight: bold; font-size: 0.5em; text-anchor: middle; }
@keyframes progress { 0% { stroke-dasharray: 0 100; } }

/* Diário */
.emotions-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 20px; }
.emotion-btn {
    background: transparent; border: 1px solid var(--glass-border); color: var(--text-secondary);
    padding: 10px; border-radius: 8px; cursor: pointer; transition: all 0.2s;
    border-left: 3px solid var(--e-color);
}
.emotion-btn:hover, .emotion-btn.selected { background: rgba(255,255,255,0.05); color: #fff; transform: scale(1.05); }

/* Missões */
.mission-row {
    display: flex; justify-content: space-between; align-items: center;
    background: rgba(0,0,0,0.2); padding: 15px; border-radius: 12px; margin-bottom: 10px;
    border: 1px solid var(--glass-border);
}
.mission-row.done { border-color: var(--success); opacity: 0.8; }
.btn-check {
    background: transparent; border: 1px solid var(--primary); color: var(--primary);
    padding: 8px 16px; border-radius: 20px; cursor: pointer;
}
.btn-check:hover { background: var(--primary); color: #fff; }
.btn-check:disabled { border-color: var(--success); color: var(--success); cursor: default; }

/* Toast */
.toast { font-size: 0.9rem; font-weight: 500; }
@keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
@keyframes fadeOut { to { opacity: 0; } }
