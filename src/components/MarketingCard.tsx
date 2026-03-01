import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MarketingCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    actionText: string;
    badgeCount?: number;
    navigateTo: string;
    colorScheme: 'blue' | 'purple' | 'emerald';
    delay?: number;
}

const colorMap = {
    blue: 'from-blue-500/10 to-blue-600/5 border-blue-200 hover:border-blue-400 text-blue-600',
    purple: 'from-purple-500/10 to-purple-600/5 border-purple-200 hover:border-purple-400 text-purple-600',
    emerald: 'from-emerald-500/10 to-emerald-600/5 border-emerald-200 hover:border-emerald-400 text-emerald-600',
};

const badgeColorMap = {
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    emerald: 'bg-emerald-500',
};

export const MarketingCard: React.FC<MarketingCardProps> = ({
    title,
    description,
    icon: Icon,
    actionText,
    badgeCount = 0,
    navigateTo,
    colorScheme,
    delay = 0,
}) => {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}
            whileHover={{ scale: 1.02 }}
            className={`relative flex flex-col justify-between p-8 rounded-3xl border bg-gradient-to-br backdrop-blur-md shadow-sm hover:shadow-xl transition-shadow cursor-pointer min-h-[320px] ${colorMap[colorScheme]}`}
            onClick={() => navigate(navigateTo)}
        >
            {/* Notification Badge */}
            {badgeCount > 0 && (
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                    className={`absolute -top-3 -right-3 flex items-center justify-center w-8 h-8 rounded-full text-white font-bold text-sm shadow-lg ring-4 ring-white ${badgeColorMap[colorScheme]}`}
                >
                    {badgeCount}
                </motion.div>
            )}

            {/* Header */}
            <div>
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3 tracking-tight">{title}</h3>
                <p className="text-slate-600 leading-relaxed text-[15px]">{description}</p>
            </div>

            {/* Action Area */}
            <div className="mt-8 flex items-center justify-between group">
                <span className="font-semibold text-sm">{actionText}</span>
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:bg-slate-800 group-hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </div>
            </div>
        </motion.div>
    );
};
