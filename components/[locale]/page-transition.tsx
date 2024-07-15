import { motion } from 'framer-motion';
import { FC, ReactNode } from 'react';

const variants = {
    hidden: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0 },
};

const PageTransition: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <motion.div
            initial="hidden"
            animate="enter"
            variants={variants}
            transition={{ duration: 0.5 }}
            className="h-full"
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;
