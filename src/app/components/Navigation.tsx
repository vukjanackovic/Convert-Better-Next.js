"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
    { name: "A/B List of tests", href: "/" },
    { name: "Publishing Page", href: "/publish" },
];

export default function Navigation() {
    const pathname = usePathname();

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-5xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <div className="text-lg font-bold text-blue-600">
                        AB Test Dashboard
                    </div>
                    <div className="space-x-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                                    pathname === link.href
                                        ? "bg-blue-500 text-white"
                                        : "text-gray-700 hover:bg-blue-100"
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}
