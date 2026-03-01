import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Stethoscope, Users } from 'lucide-react';
import { MarketingCard } from '../components/MarketingCard';
import { useSandboxStore } from '../store/sandboxStore';

export const MarketingSandbox: React.FC = () => {
    const bookingStatus = useSandboxStore((state) => state.bookingStatus);

    // Derive badge counts based on state
    const receptionistBadgeCount = bookingStatus === 'pending_approval' ? 1 : 0;
    const doctorBadgeCount = bookingStatus === 'approved' ? 1 : 0;

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 md:p-12 font-sans selection:bg-blue-100 selection:text-blue-900 overflow-hidden">
            {/* Background ambient blurring */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-pulse"></div>
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-pulse delay-75"></div>

            <div className="relative z-10 max-w-[1280px] w-full mx-auto">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 md:mb-24"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold mb-6 ring-1 ring-blue-700/10"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        Real-time Sync Active
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
                        Welcome to the <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                            Clinic Management System
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Experience the seamless flow of data. Select a role below to see how our unified platform connects patients, receptionists, and doctors in real-time.
                    </p>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 w-full">
                    <MarketingCard
                        title="Patient"
                        description="Experience a seamless, intuitive appointment booking process optimized for mobile and desktop."
                        icon={Users}
                        actionText="Book an appointment"
                        navigateTo="/patient"
                        colorScheme="blue"
                        delay={0.1}
                    />
                    <MarketingCard
                        title="Receptionist"
                        description="Manage the clinic's pulse. Review, approve, and direct patient flow from a centralized command center."
                        icon={Calendar}
                        actionText="Manage the queue"
                        badgeCount={receptionistBadgeCount}
                        navigateTo="/receptionist"
                        colorScheme="purple"
                        delay={0.3}
                    />
                    <MarketingCard
                        title="Doctor"
                        description="Focus on care, not administration. Access synchronized schedules and vital patient history instantly."
                        icon={Stethoscope}
                        actionText="View your schedule"
                        badgeCount={doctorBadgeCount}
                        navigateTo="/doctor"
                        colorScheme="emerald"
                        delay={0.5}
                    />
                </div>
            </div>
        </div>
    );
};
