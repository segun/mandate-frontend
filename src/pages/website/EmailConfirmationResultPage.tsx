import { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { WebsiteLayout } from "./components";

const GOLD = "#ca8a04";

export function EmailConfirmationResultPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const status = (searchParams.get("status") || "").toLowerCase();
    const rawMessage = searchParams.get("message") || "";

    const isSuccess = status === "success";
    const isError = status === "error";

    const successMessage = rawMessage || "Email confirmed successfully";
    const errorMessage =
        rawMessage || "We could not confirm your email. Please use a valid confirmation link.";

    useEffect(() => {
        if (!isSuccess) {
            return;
        }

        const timer = setTimeout(() => {
            navigate(
                `/login?status=success&message=${encodeURIComponent(successMessage)}`,
                { replace: true },
            );
        }, 5000);

        return () => clearTimeout(timer);
    }, [isSuccess, navigate, successMessage]);

    const resolvedError = !isSuccess && !isError;

    return (
        <WebsiteLayout>
            <section className="py-24 lg:py-32 hero-gradient">
                <div className="section-container">
                    <motion.div
                        className="max-w-3xl mx-auto text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center justify-center mb-6">
                            {isSuccess && <CheckCircle2 className="w-10 h-10" style={{ color: GOLD }} />}
                            {(isError || resolvedError) && (
                                <XCircle className="w-10 h-10" style={{ color: "#fca5a5" }} />
                            )}
                        </div>

                        <h1
                            className="text-3xl sm:text-4xl font-bold mb-4"
                            style={{ fontFamily: "Space Grotesk, system-ui, sans-serif" }}
                        >
                            {isSuccess ? "Email confirmed" : "Email confirmation failed"}
                        </h1>

                        <p className="text-lg" style={{ color: "#ccc" }}>
                            {isSuccess ? successMessage : errorMessage}
                        </p>

                        {isSuccess ? (
                            <div
                                className="mt-8 inline-flex items-center gap-2 text-sm"
                                style={{ color: "#888" }}
                            >
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Redirecting to login...
                            </div>
                        ) : (
                            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    to="/login"
                                    className="px-8 py-3 rounded-lg font-semibold"
                                    style={{ backgroundColor: GOLD, color: "#000000" }}
                                >
                                    Go to Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-8 py-3 rounded-lg font-semibold"
                                    style={{ border: `2px solid ${GOLD}`, color: "#f5f5f5" }}
                                >
                                    Back to Register
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </div>
            </section>
        </WebsiteLayout>
    );
}
