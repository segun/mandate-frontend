import { useEffect } from "react";
import { Clock, ArrowRight } from "lucide-react";

export function ComingSoonPage() {
    useEffect(() => {
        document.title = "Coming Soon - Control HQ";
    }, []);

    return (
        <div className="min-h-screen bg-linear-to-br from-[#0d0d0f] via-[#1a1a1d] to-[#0d0d0f] flex items-center justify-center px-4 py-20">
            <div className="max-w-2xl w-full">
                {/* Main Content */}
                <div className="text-center space-y-8">
                    {/* Logo/Branding */}
                    <div className="space-y-4">
                        <div className="flex justify-center mb-32 ">
                            <div className="w-lg h-32 rounded-lg flex items-center justify-center shadow-lg">
                                <img src="/images/logo.png" alt="ControlHQ"/>
                            </div>
                        </div>
                        <div className="flex justify-center mb-8">
                            <div className="w-16 h-16 bg-linear-to-br from-[#ca8a04] to-[#a16207] rounded-lg flex items-center justify-center shadow-lg">
                                <Clock className="w-8 h-8 text-white" />
                            </div>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                            Coming Soon
                        </h1>

                        <p className="text-xl text-gray-300 leading-relaxed">
                            We're working hard to bring you an amazing experience. Control HQ is
                            launching soon!
                        </p>
                    </div>

                    {/* CTA Section */}
                    <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-8 backdrop-blur-sm space-y-6">
                        <h2 className="text-2xl font-semibold text-white">Want to try it now?</h2>

                        <p className="text-gray-300">
                            Get early access to our development environment and start exploring:
                        </p>

                        <a
                            href="https://dev.controlhq.ng"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-[#ca8a04] hover:bg-[#a16207] text-black font-semibold py-3 px-8 rounded-lg transition-all hover:shadow-lg hover:shadow-[#ca8a04]/50 transform hover:scale-105"
                        >
                            Visit Development Version
                            <ArrowRight className="w-5 h-5" />
                        </a>

                        <p className="text-sm text-gray-400 pt-4 border-t border-gray-700">
                            Preview all features and provide feedback to help us improve
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
                    <p>© 2026 Control HQ. All rights reserved.</p>
                </div>
            </div>

            {/* Background Elements */}
            <div className="fixed inset-0 -z-10 opacity-30">
                <div className="absolute top-0 left-1/2 w-96 h-96 bg-[#ca8a04] rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#a16207] rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
            </div>
        </div>
    );
}
