import { IoLogoGithub } from "react-icons/io5";
import { IoLogoLinkedin } from "react-icons/io5";
import { IoLogoDiscord } from "react-icons/io5";
import { IoMail } from "react-icons/io5";

export default function Footer() {
    return (
        <footer className="w-full p-4 ">
            {/* Using the nested radius logic: Outer 3xl - p4 = Inner lg */}
            <div className="rounded-3xl border border-separator p-8 md:p-12 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Brand Section */}
                    <div className="flex flex-col gap-4">
                        <h2 className="text-xl font-bold tracking-tight">
                            Frost Edson
                        </h2>
                        <p className="text-sm text-labelSecondary max-w-xs">
                            I create digital experiences that are both functional and visually stunning.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold uppercase tracking-wider">
                            Quick Links
                        </h3>
                        <nav className="flex flex-col gap-1">
                            <a href="#" className="text-sm text-labelSecondary hover:text-systemPink transition-colors">Portfolio</a>
                            <a href="#" className="text-sm text-labelSecondary hover:text-systemPink transition-colors">News</a>
                            <a href="#" className="text-sm text-labelSecondary hover:text-systemPink transition-colors">Services</a>
                            <a href="#" className="text-sm text-labelSecondary hover:text-systemPink transition-colors">Shop</a>
                        </nav>
                    </div>

                    {/* Social/Contact */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold uppercase tracking-wider">
                            Connect
                        </h3>
                        <div className="flex gap-4">
                            <button className="p-2 rounded-lg bg-backgroundLayer1 hover:bg-backgroundLayer2 hover:text-systemPink transition-colors ">
                                <span className="sr-only">GitHub</span>
                                <IoLogoGithub className="w-5 h-5" />

                            </button>

                            <button className="p-2 rounded-lg bg-backgroundLayer1 hover:bg-backgroundLayer2 hover:text-systemPink transition-colors ">
                                <span className="sr-only">LinkedIn</span>
                                <IoLogoLinkedin className="w-5 h-5" />

                            </button>

                             <button className="p-2 rounded-lg bg-backgroundLayer1 hover:bg-backgroundLayer2 hover:text-systemPink transition-colors ">
                                <span className="sr-only">Discord</span>
                                <IoLogoDiscord className="w-5 h-5" />

                            </button>

                            <button className="p-2 rounded-lg bg-backgroundLayer1 hover:bg-backgroundLayer2 hover:text-systemPink transition-colors ">
                                <span className="sr-only">Email</span>
                                <IoMail className="w-5 h-5" />

                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-separator flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-labelQuaternary">
                        © {new Date().getFullYear()} Frost Edson. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-xs text-labelQuaternary">
                        <a href="#" className="hover:underline">Privacy Policy</a>
                        <a href="#" className="hover:underline">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}