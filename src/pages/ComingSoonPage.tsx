import { useEffect } from "react";
import { Clock, ArrowRight } from "lucide-react";

export function ComingSoonPage() {
    useEffect(() => {
        document.title = "Coming Soon - Control HQ";
    }, []);

    return (
        <div className="h-screen overflow-hidden bg-linear-to-br from-[#0d0d0f] via-[#1a1a1d] to-[#0d0d0f] flex items-center justify-center px-4 py-6 sm:py-8">
            <div className="max-w-2xl w-full">
                {/* Main Content */}
                <div className="text-center space-y-4 sm:space-y-6">
                    {/* Logo/Branding */}
                    <div className="space-y-3 sm:space-y-4">
                        <div className="flex justify-center mb-6 sm:mb-8">
                            <div className="h-16 sm:h-20 rounded-lg flex items-center justify-center">
                                <img src="/images/logo.png" alt="ControlHQ" className="h-full w-auto"/>
                            </div>
                        </div>
                        <div className="flex justify-center mb-4 sm:mb-6">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-linear-to-br from-[#ca8a04] to-[#a16207] rounded-lg flex items-center justify-center shadow-lg">
                                <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                            </div>
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-4">
                            Coming Soon
                        </h1>

                        <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed px-4">
                            We're working hard to bring you an amazing experience. Control HQ is
                            launching soon!
                        </p>
                    </div>

                    {/* CTA Section */}
                    <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 sm:p-6 backdrop-blur-sm space-y-3 sm:space-y-4">
                        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white">Want to try it now?</h2>

                        <p className="text-sm sm:text-base text-gray-300">
                            Get early access to our development environment and start exploring:
                        </p>

                        <a
                            href="https://dev.controlhq.ng"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-[#ca8a04] hover:bg-[#a16207] text-black font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-lg transition-all hover:shadow-lg hover:shadow-[#ca8a04]/50 transform hover:scale-105 text-sm sm:text-base"
                        >
                            Visit Development Version
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </a>

                        <p className="text-xs sm:text-sm text-gray-400 pt-2 sm:pt-4 border-t border-gray-700">
                            Preview all features and provide feedback to help us improve
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-800 text-center text-gray-500 text-xs sm:text-sm">
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
