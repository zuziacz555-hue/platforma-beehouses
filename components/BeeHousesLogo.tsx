import React from 'react';

export default function BeeHousesLogo({ className = "h-12 w-auto" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 400 300"
            className={className}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* House Outline */}
            <path
                d="M200 40L60 140V260H340V140L200 40Z"
                stroke="#334155"
                strokeWidth="12"
                strokeLinejoin="round"
                fill="white"
            />

            {/* Cluster of Hexagons */}
            {/* Top Hexagon (Honey) */}
            <path
                d="M200 120L226 135V165L200 180L174 165V135L200 120Z"
                fill="#fbbf24"
            />
            <path
                d="M202 138L210 142V150M190 142L198 138V130M190 158L198 162V170"
                stroke="white"
                strokeWidth="1"
                opacity="0.5"
            />

            {/* Left Hexagon (Leaf) */}
            <path
                d="M165 185L191 200V230L165 245L139 230V200L165 185Z"
                fill="#10b981"
            />
            <path
                d="M155 210C155 210 165 205 175 215C185 225 175 235 175 235M165 215V235"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.6"
            />

            {/* Right Hexagon (Heart/Bee) */}
            <path
                d="M235 185L261 200V230L235 245L209 230V200L235 185Z"
                fill="#059669"
            />
            <path
                d="M235 210C235 210 245 200 250 210C255 220 235 235 235 235C235 235 215 220 220 210C225 200 235 210 235 210Z"
                fill="white"
                opacity="0.8"
            />

            {/* Flying Bee */}
            <g transform="translate(280, 80) rotate(-10)">
                {/* Wings */}
                <ellipse cx="-5" cy="-5" rx="12" ry="7" fill="#e2e8f0" opacity="0.8" />
                <ellipse cx="5" cy="-5" rx="12" ry="7" fill="#e2e8f0" opacity="0.8" />
                {/* Body */}
                <ellipse cx="0" cy="0" rx="15" ry="10" fill="#fbbf24" />
                <rect x="-8" y="-9" width="4" height="18" fill="#334155" />
                <rect x="0" y="-10" width="4" height="20" fill="#334155" />
                <rect x="8" y="-7" width="3" height="14" fill="#334155" />
                {/* Eyes */}
                <circle cx="12" cy="-2" r="1.5" fill="#334155" />
            </g>
        </svg>
    );
}
