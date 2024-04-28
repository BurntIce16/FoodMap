"use client"

import React from 'react';
import { useRouter } from 'next/navigation'; // Importing useRouter from next/navigation for server component
import WestRoundedIcon from '@mui/icons-material/WestRounded';

const BackButton: React.FC = () => {
    const router = useRouter(); // Using useRouter hook

    return (
        <button onClick={() => router.back()} className="flex items-center justify-center p-2 rounded-full hover:bg-gray-200">
            <WestRoundedIcon fontSize="large"/>
        </button>
    );
};

export default BackButton;
