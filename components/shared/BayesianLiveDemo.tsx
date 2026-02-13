"use client";
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

// ─── Demo Data ───────────────────────────────────────────────
const demoProjects = [
    {
        name: "GlobalMotion Corp",
        deal: "DX Consulting",
        pwin: 83.8,
        momentum: 78.6,
        impedance: 93.2,
        alpha: 44.6,
        beta: 8.6,
        status: "Won!" as const,
        statusColor: "text-orange-500",
        meetings: [
            { seq: 1, date: "Dec 1", pwin: 38.5, label: "Initial Discovery" },
            { seq: 2, date: "Dec 10", pwin: 52.4, label: "Executive Meeting" },
            { seq: 3, date: "Dec 20", pwin: 79.1, label: "Solution Demo ✅" },
            { seq: 4, date: "Jan 15", pwin: 80.3, label: "Proposal Submitted" },
            { seq: 5, date: "Jan 25", pwin: 81.6, label: "Price Negotiation" },
            { seq: 6, date: "Feb 5", pwin: 83.8, label: "Contract Agreed 🎉" },
        ]
    },
    {
        name: "NexaCore Systems",
        deal: "Cloud Migration",
        pwin: 80.4,
        momentum: 85.2,
        impedance: 89.4,
        alpha: 8.8,
        beta: 8.0,
        status: "Hot" as const,
        statusColor: "text-red-500",
        meetings: [
            { seq: 1, date: "Jan 15", pwin: 22.3, label: "Initial Discovery" },
            { seq: 2, date: "Jan 22", pwin: 29.2, label: "Budget Confirmed" },
            { seq: 3, date: "Feb 1", pwin: 47.1, label: "CTO Review ✅" },
            { seq: 4, date: "Feb 5", pwin: 59.7, label: "PoC Kickoff" },
            { seq: 5, date: "Feb 10", pwin: 80.4, label: "PoC Passed ✅" },
        ]
    },
    {
        name: "QuantumBridge",
        deal: "AI Platform PoC",
        pwin: 52.4,
        momentum: 49.9,
        impedance: 62.6,
        alpha: 8.8,
        beta: 8.0,
        status: "Growing" as const,
        statusColor: "text-emerald-500",
        meetings: [
            { seq: 1, date: "Jan 10", pwin: 22.3, label: "AI Platform Intro" },
            { seq: 2, date: "Jan 20", pwin: 29.2, label: "Budget Uncertain" },
            { seq: 3, date: "Jan 28", pwin: 45.5, label: "Tech Concerns ⚠️" },
            { seq: 4, date: "Feb 5", pwin: 45.5, label: "2-Week Silence ⚠️" },
            { seq: 5, date: "Feb 12", pwin: 52.4, label: "Re-engagement" },
        ]
    }
];

// ─── Animated Counter ────────────────────────────────────────
const AnimatedNumber = ({ value, duration = 1.5, suffix = '%', decimals = 1, className = '' }: {
    value: number; duration?: number; suffix?: string; decimals?: number; className?: string;
}) => {
    const [display, setDisplay] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: false, amount: 0.5 });

    useEffect(() => {
        if (!inView) { setDisplay(0); return; }
        const start = 0;
        const end = value;
        const startTime = performance.now();
        const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / (duration * 1000), 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            const current = start + (end - start) * eased;
            setDisplay(current);
            if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }, [inView, value, duration]);

    return <span ref={ref} className={className}>{display.toFixed(decimals)}{suffix}</span>;
};

// ─── SVG Line Chart ──────────────────────────────────────────
const PWinChart = ({ meetings, isVisible, compact }: {
    meetings: typeof demoProjects[0]['meetings'];
    isVisible: boolean;
    compact?: boolean;
}) => {
    const [visiblePoints, setVisiblePoints] = useState(0);
    const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

    useEffect(() => {
        if (!isVisible) { setVisiblePoints(0); return; }
        setVisiblePoints(0);
        const timers: NodeJS.Timeout[] = [];
        meetings.forEach((_, i) => {
            timers.push(setTimeout(() => setVisiblePoints(i + 1), 400 + i * 500));
        });
        return () => timers.forEach(clearTimeout);
    }, [isVisible, meetings]);

    const W = compact ? 320 : 440;
    const H = compact ? 160 : 200;
    const padX = 40;
    const padY = 25;
    const padTop = 20;
    const chartW = W - padX * 2;
    const chartH = H - padY - padTop;

    const minP = 0;
    const maxP = 100;

    const toX = (i: number) => padX + (i / (meetings.length - 1)) * chartW;
    const toY = (p: number) => padTop + chartH - ((p - minP) / (maxP - minP)) * chartH;

    // Build path
    const points = meetings.slice(0, visiblePoints).map((m, i) => ({ x: toX(i), y: toY(m.pwin) }));
    const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

    // Gradient area
    const areaPath = points.length > 0
        ? `${linePath} L ${points[points.length - 1].x} ${H - padY} L ${points[0].x} ${H - padY} Z`
        : '';

    // Y-axis labels
    const yLabels = [0, 25, 50, 75, 100];

    return (
        <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} className="select-none">
            {/* Grid lines */}
            {yLabels.map(v => (
                <g key={v}>
                    <line
                        x1={padX} y1={toY(v)} x2={W - padX} y2={toY(v)}
                        stroke="currentColor" strokeOpacity={0.08} strokeDasharray="3,3"
                    />
                    <text x={padX - 6} y={toY(v) + 3} textAnchor="end"
                        className="fill-gray-400 dark:fill-gray-600" fontSize={9} fontFamily="monospace"
                    >
                        {v}%
                    </text>
                </g>
            ))}

            {/* Gradient area fill */}
            <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f97316" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#f97316" stopOpacity={0.02} />
                </linearGradient>
            </defs>
            {areaPath && (
                <motion.path
                    d={areaPath}
                    fill="url(#areaGrad)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                />
            )}

            {/* Line path with animation */}
            {linePath && (
                <motion.path
                    d={linePath}
                    fill="none"
                    stroke="#f97316"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: visiblePoints * 0.4, ease: "easeOut" }}
                />
            )}

            {/* Data points */}
            {points.map((p, i) => (
                <g key={i}
                    onMouseEnter={() => setHoveredPoint(i)}
                    onMouseLeave={() => setHoveredPoint(null)}
                    className="cursor-pointer"
                >
                    <motion.circle
                        cx={p.x} cy={p.y} r={hoveredPoint === i ? 6 : 4}
                        fill="#f97316"
                        stroke="white"
                        strokeWidth={2}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.4 + i * 0.5, type: "spring", stiffness: 300 }}
                    />
                    {/* Tooltip on hover */}
                    {hoveredPoint === i && (
                        <g>
                            <rect
                                x={p.x - 55} y={p.y - 38} width={110} height={28} rx={6}
                                fill="rgba(0,0,0,0.85)" stroke="#f97316" strokeWidth={0.5}
                            />
                            <text x={p.x} y={p.y - 21} textAnchor="middle"
                                fill="white" fontSize={9} fontWeight="bold" fontFamily="system-ui"
                            >
                                {meetings[i].label}
                            </text>
                        </g>
                    )}
                    {/* Date label */}
                    <text x={p.x} y={H - padY + 14} textAnchor="middle"
                        className="fill-gray-400 dark:fill-gray-600" fontSize={8} fontFamily="monospace"
                    >
                        {meetings[i].date}
                    </text>
                </g>
            ))}

            {/* Latest P(Win) label */}
            {points.length > 0 && (
                <motion.text
                    x={points[points.length - 1].x + 8}
                    y={points[points.length - 1].y - 8}
                    fill="#f97316"
                    fontWeight="bold"
                    fontSize={12}
                    fontFamily="system-ui"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + (points.length - 1) * 0.5 + 0.3 }}
                >
                    {meetings[visiblePoints - 1]?.pwin}%
                </motion.text>
            )}
        </svg>
    );
};

// ─── Semi-circle Gauge ───────────────────────────────────────
const SemiGauge = ({ value, label, color }: { value: number; label: string; color: string; }) => {
    const r = 32;
    const circumference = Math.PI * r;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    return (
        <div className="flex flex-col items-center">
            <svg width={76} height={44} viewBox="0 0 76 44">
                {/* Background track */}
                <path
                    d={`M 6 40 A ${r} ${r} 0 0 1 70 40`}
                    fill="none"
                    stroke="currentColor"
                    strokeOpacity={0.1}
                    strokeWidth={5}
                    strokeLinecap="round"
                />
                {/* Value arc */}
                <motion.path
                    d={`M 6 40 A ${r} ${r} 0 0 1 70 40`}
                    fill="none"
                    stroke={color}
                    strokeWidth={5}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                />
            </svg>
            <div className="text-center -mt-1">
                <span className="text-xs font-bold" style={{ color }}><AnimatedNumber value={value} decimals={1} duration={1.5} /></span>
            </div>
            <span className="text-[10px] text-gray-500 dark:text-gray-500 mt-0.5">{label}</span>
        </div>
    );
};

// ─── Project Selector Dots ───────────────────────────────────
const ProjectDots = ({ count, active, onSelect }: {
    count: number; active: number; onSelect: (i: number) => void;
}) => (
    <div className="flex gap-2 justify-center">
        {Array.from({ length: count }).map((_, i) => (
            <button
                key={i}
                onClick={() => onSelect(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === active
                    ? 'bg-orange-500 w-6'
                    : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400'
                    }`}
            />
        ))}
    </div>
);

// ─── Main Component ──────────────────────────────────────────
interface BayesianLiveDemoProps {
    compact?: boolean;
}

export const BayesianLiveDemo = ({ compact = false }: BayesianLiveDemoProps) => {
    const [activeProject, setActiveProject] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: false, amount: 0.3 });

    const project = demoProjects[activeProject];

    // Auto-cycle projects
    useEffect(() => {
        if (!isInView) return;
        const timer = setInterval(() => {
            setActiveProject(prev => (prev + 1) % demoProjects.length);
        }, 8000);
        return () => clearInterval(timer);
    }, [isInView]);

    const handleSelectProject = useCallback((i: number) => {
        setActiveProject(i);
    }, []);

    if (compact) {
        // ─── Compact Mode (Homepage Section) ─────────────────
        return (
            <div ref={containerRef} className="w-full h-full flex flex-col justify-end">
                {/* Chart + Stats Area */}
                <div className="flex-1 flex items-stretch px-4 pb-2">
                    {/* Chart */}
                    <div className="flex-1 flex items-end">
                        <div className="w-full h-[234px]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeProject}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.4 }}
                                    className="w-full h-full"
                                >
                                    <PWinChart meetings={project.meetings} isVisible={isInView} compact />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Soft Divider */}
                    <div className="w-px mx-3 my-4 bg-gradient-to-b from-transparent via-gray-200 dark:via-gray-700 to-transparent" />

                    {/* Analytics Mini Panel */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeProject}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.4 }}
                            className="w-[130px] shrink-0 flex flex-col items-center justify-between gap-4 py-2"
                        >
                            {/* Status */}
                            <div className="text-center">
                                <div className="text-lg">
                                    {project.status === 'Won!' ? '🏆' : project.status === 'Hot' ? '🔥' : '📈'}
                                </div>
                                <div className={`text-[10px] font-bold ${project.statusColor}`}>{project.status}</div>
                            </div>

                            {/* Momentum */}
                            <div className="text-center">
                                <div className="text-[9px] text-gray-400 dark:text-gray-500 uppercase tracking-wider">Momentum</div>
                                <AnimatedNumber
                                    value={project.momentum}
                                    className="text-sm font-bold text-emerald-600 dark:text-emerald-400 tabular-nums"
                                    duration={1.2}
                                />
                            </div>

                            {/* Alpha / Beta */}
                            <div className="grid grid-cols-2 gap-1.5 w-full">
                                <div className="bg-white dark:bg-gray-900 rounded-md p-1.5 text-center border border-gray-200 dark:border-gray-800">
                                    <div className="text-[8px] text-blue-500 font-medium">α</div>
                                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{project.alpha}</span>
                                </div>
                                <div className="bg-white dark:bg-gray-900 rounded-md p-1.5 text-center border border-gray-200 dark:border-gray-800">
                                    <div className="text-[8px] text-red-500 font-medium">β</div>
                                    <span className="text-xs font-bold text-red-600 dark:text-red-400">{project.beta}</span>
                                </div>
                            </div>

                            {/* Impedance Mini Gauge */}
                            <SemiGauge value={project.impedance} label="Impedance" color="#f97316" />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Bottom Bar */}
                <div className="flex items-center justify-between px-6 py-3 bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-b-[2.5rem]">
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-gray-900 dark:text-white">{project.name}</span>
                        <span className="text-xs text-gray-500">{project.deal}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <div className="text-[10px] text-gray-500 uppercase tracking-wider">P(Win)</div>
                            <AnimatedNumber
                                value={project.pwin}
                                className="text-xl font-black text-orange-600 dark:text-orange-500 tabular-nums"
                                duration={1.2}
                            />
                        </div>
                        <ProjectDots count={demoProjects.length} active={activeProject} onSelect={handleSelectProject} />
                    </div>
                </div>
            </div>
        );
    }

    // ─── Full Mode (Product Page Hero) ─────────────────────
    return (
        <div ref={containerRef} className="w-full h-full rounded-[2rem] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl shadow-gray-200/50 dark:shadow-black/50 overflow-hidden flex flex-col">

            {/* Header Bar */}
            <div className="flex items-center justify-between px-6 py-3 bg-gray-50 dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-xs text-gray-400 font-mono ml-2">EXAWin — Bayesian Analytics</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] text-gray-500 font-mono">LIVE</span>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col lg:flex-row">

                {/* Left: Chart */}
                <div className="flex-1 flex flex-col p-4 lg:p-6">
                    {/* Project Name */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeProject}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                            className="mb-2"
                        >
                            <div className="text-sm font-bold text-gray-900 dark:text-white">{project.name}</div>
                            <div className="text-xs text-gray-500">{project.deal} — {project.meetings.length} meetings</div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Chart Label */}
                    <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">P(Win) Trend</div>

                    {/* SVG Chart */}
                    <div className="flex-1 min-h-[180px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeProject}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="w-full h-full"
                            >
                                <PWinChart meetings={project.meetings} isVisible={isInView} />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Project Dots */}
                    <div className="mt-3">
                        <ProjectDots count={demoProjects.length} active={activeProject} onSelect={handleSelectProject} />
                    </div>
                </div>

                {/* Right: Analytics Panel */}
                <div className="w-full lg:w-[200px] bg-gray-50 dark:bg-gray-950 border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-gray-800 p-4 flex flex-col gap-4">

                    {/* Status Badge */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeProject}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="text-center"
                        >
                            <div className="text-3xl mb-1">
                                {project.status === 'Won!' ? '🏆' : project.status === 'Hot' ? '🔥' : '📈'}
                            </div>
                            <div className={`text-xs font-bold ${project.statusColor}`}>{project.status}</div>
                        </motion.div>
                    </AnimatePresence>

                    {/* P(Win) Big Number */}
                    <div className="text-center">
                        <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">P(Win)</div>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeProject}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                            >
                                <AnimatedNumber
                                    value={project.pwin}
                                    className="text-3xl font-black text-gray-900 dark:text-white tabular-nums"
                                    duration={1.5}
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Momentum */}
                    <div className="text-center">
                        <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Momentum</div>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeProject}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <AnimatedNumber
                                    value={project.momentum}
                                    className="text-lg font-bold text-emerald-600 dark:text-emerald-400 tabular-nums"
                                    duration={1.2}
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Alpha / Beta */}
                    <div className="grid grid-cols-2 gap-2">
                        <div className="bg-white dark:bg-gray-900 rounded-lg p-2 text-center border border-gray-200 dark:border-gray-800">
                            <div className="text-[9px] text-blue-500 font-medium">α (Pos)</div>
                            <AnimatePresence mode="wait">
                                <motion.div key={activeProject}
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                >
                                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{project.alpha}</span>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                        <div className="bg-white dark:bg-gray-900 rounded-lg p-2 text-center border border-gray-200 dark:border-gray-800">
                            <div className="text-[9px] text-red-500 font-medium">β (Neg)</div>
                            <AnimatePresence mode="wait">
                                <motion.div key={activeProject}
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                >
                                    <span className="text-sm font-bold text-red-600 dark:text-red-400">{project.beta}</span>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Impedance Gauge */}
                    <SemiGauge value={project.impedance} label="Impedance" color="#f97316" />
                </div>
            </div>
        </div>
    );
};
