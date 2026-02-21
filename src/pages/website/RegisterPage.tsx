import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Loader2, MailCheck, ShieldCheck } from "lucide-react";
import axios from "axios";
import { WebsiteLayout } from "./components";
import { paymentsService } from "../../services/payments.service.ts";
import { tenantsService } from "../../services/tenants.service.ts";
import type { RegisterTenantRequest } from "../../services/tenants.service.ts";
import { toast } from "../../stores/toast.store";
import { Turnstile } from "@marsidev/react-turnstile";

const GOLD = "#ca8a04";
const PASSWORD_PATTERN = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
const PASSWORD_PATTERN_MESSAGE =
    "Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number or special character";

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
};

const registrationBenefits = [
    "Immediate access after payment confirmation",
    "Institutional-grade security architecture",
    "Dedicated implementation support",
    "Configurable organization structure",
    "Training and onboarding for your team",
    "Priority technical support",
];

type OrganizationEnum = RegisterTenantRequest["organizationType"];

const organizationOptions: { value: string; label: string; enum: OrganizationEnum }[] = [
    { value: "political-campaign", label: "Political Campaign", enum: "POLITICAL_CAMPAIGN" },
    { value: "political-party", label: "Political Party", enum: "POLITICAL_PARTY" },
    { value: "ngo-civil-society", label: "NGO / Civil Society", enum: "NGO_CIVIL_SOCIETY" },
    {
        value: "government-institution",
        label: "Government Institution",
        enum: "GOVERNMENT_INSTITUTION",
    },
    { value: "technology-partner", label: "Technology Partner", enum: "TECHNOLOGY_PARTNER" },
    { value: "other", label: "Other", enum: "OTHER" },
];

type RegisterFormState = {
    organizationName: string;
    organizationType: string;
    useCases: string;
    contactName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    subscriptionMode: "AUTO" | "MANUAL" | "";
};

export function RegisterPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<RegisterFormState>({
        organizationName: "",
        organizationType: "",
        useCases: "",
        contactName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        subscriptionMode: "",
    });
    const [planCurrency, setPlanCurrency] = useState("NGN");
    const [subscriptionPlan, setSubscriptionPlan] = useState<{
        name: string;
        amount: number;
        interval: string;
    } | null>(null);
    const [loadingPlans, setLoadingPlans] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [checkingPaymentConfig, setCheckingPaymentConfig] = useState(false);
    const [registrationSubmitted, setRegistrationSubmitted] = useState(false);
    const [paymentRequired, setPaymentRequired] = useState<boolean | null>(null);
    const [registrationWarning, setRegistrationWarning] = useState<string | null>(null);
    const [confirmationEmail, setConfirmationEmail] = useState<string>("");
    const [resendingConfirmation, setResendingConfirmation] = useState(false);

    const [token, setToken] = useState<string | null>(null);

    const siteKey = import.meta.env.VITE_CLOUDFLARE_TURNSTILE_SITE_KEY || "";
    useEffect(() => {
        let mounted = true;
        const loadPlans = async () => {
            try {
                const response = await paymentsService.getPlans();
                if (!mounted) {
                    return;
                }
                setPlanCurrency(response.currency || "NGN");
                setSubscriptionPlan(response.subscription || null);
            } catch {
                if (mounted) {
                    toast.error("Unable to load pricing plans. Please try again shortly.");
                }
            } finally {
                if (mounted) {
                    setLoadingPlans(false);
                }
            }
        };
        loadPlans();
        return () => {
            mounted = false;
        };
    }, []);

    const formatAmount = (amount: number) => {
        try {
            return new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: planCurrency || "NGN",
                maximumFractionDigits: 0,
            }).format(amount);
        } catch {
            return `${planCurrency} ${amount.toFixed(0)}`;
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
        const { name, value } = e.target;
        if (name === "phone") {
            const digits = value.replace(/\D/g, "").slice(0, 11);
            setFormData((prev) => ({
                ...prev,
                phone: digits,
            }));
            return;
        }

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidPhone = (phone: string) => /^0\d{10}$/.test(phone);
    const isValidPassword = (password: string) => PASSWORD_PATTERN.test(password);

    const handleResendConfirmationEmail = async () => {
        const email = confirmationEmail || formData.email;
        if (!email || !isValidEmail(email)) {
            toast.error("A valid email address is required to resend confirmation.");
            return;
        }

        setResendingConfirmation(true);
        try {
            const response = await tenantsService.resendRegistrationConfirmationEmail({ email });

            if (response.warning) {
                setRegistrationWarning(response.warning);
                toast.warning(response.warning);
                return;
            }

            setRegistrationWarning(null);
            toast.success("Confirmation email resend request processed. Check your inbox shortly.");
        } catch (error: unknown) {
            const fallbackMessage =
                "Unable to resend confirmation email right now. Please try again shortly.";

            if (axios.isAxiosError(error)) {
                const responseData = error.response?.data;
                const apiMessage =
                    typeof responseData?.message === "string"
                        ? responseData.message
                        : typeof responseData?.error === "string"
                          ? responseData.error
                          : undefined;

                toast.error(apiMessage || error.message || fallbackMessage);
                return;
            }

            toast.error(fallbackMessage);
        } finally {
            setResendingConfirmation(false);
        }
    };

    const submitRegistration = async (requiresPayment: boolean) => {
        if (!token) {
            toast.error("Please complete the Captcha challenge.");
            return;
        }

        if (requiresPayment && !formData.subscriptionMode) {
            toast.error("Please select a payment mode to continue.");
            return;
        }

        if (!isValidEmail(formData.email)) {
            toast.error("Please enter a valid email address.");
            return;
        }

        if (formData.phone && !isValidPhone(formData.phone)) {
            toast.error("Phone number must be 11 digits and start with 0.");
            return;
        }

        if (!isValidPassword(formData.password)) {
            toast.error(PASSWORD_PATTERN_MESSAGE);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        const organization = organizationOptions.find(
            (option) => option.value === formData.organizationType,
        );
        if (!organization) {
            toast.error("Please choose a valid organization type.");
            return;
        }

        setSubmitting(true);
        setRegistrationWarning(null);
        try {
            const response = await tenantsService.registerTenant({
                organizationName: formData.organizationName,
                organizationType: organization.enum,
                useCases: formData.useCases || undefined,
                contactName: formData.contactName,
                email: formData.email,
                phone: formData.phone || undefined,
                password: formData.password,
                subscriptionMode: requiresPayment
                    ? formData.subscriptionMode || undefined
                    : undefined,
                token: token || undefined,
            });

            setConfirmationEmail(response.adminUser?.email || formData.email);

            if (response.payment === null) {
                setRegistrationSubmitted(true);

                if (response.warning) {
                    setRegistrationWarning(response.warning);
                    toast.warning(response.warning);
                } else {
                    toast.success(
                        "Registration successful. Check your email for a confirmation link before login.",
                    );
                }
                return;
            }

            if (response.payment.authorizationUrl) {
                window.location.href = response.payment.authorizationUrl;
                return;
            }

            toast.error("Unable to start payment. Please try again or contact support.");
        } catch (error: unknown) {
            const fallbackMessage = "Registration failed. Please review your details and try again.";

            if (axios.isAxiosError(error)) {
                const responseData = error.response?.data;
                const apiMessage =
                    typeof responseData?.message === "string"
                        ? responseData.message
                        : typeof responseData?.error === "string"
                          ? responseData.error
                          : undefined;

                toast.error(apiMessage || error.message || fallbackMessage);
                return;
            }

            toast.error(fallbackMessage);
        } finally {
            setSubmitting(false);
        }
    };

    const handleNext = async () => {
        if (step === 1) {
            if (!formData.organizationName || !formData.organizationType) {
                toast.error("Please provide your organization name and type to continue.");
                return;
            }
            setStep(2);
            return;
        }

        if (step === 2) {
            if (!formData.contactName || !formData.email || !formData.password) {
                toast.error("Please provide admin contact details to continue.");
                return;
            }
            if (!isValidEmail(formData.email)) {
                toast.error("Please enter a valid email address.");
                return;
            }
            if (formData.phone && !isValidPhone(formData.phone)) {
                toast.error("Phone number must be 11 digits and start with 0.");
                return;
            }
            if (!isValidPassword(formData.password)) {
                toast.error(PASSWORD_PATTERN_MESSAGE);
                return;
            }
            if (!formData.confirmPassword) {
                toast.error("Please confirm your password.");
                return;
            }
            if (formData.password !== formData.confirmPassword) {
                toast.error("Passwords do not match.");
                return;
            }

            if (!token) {
                toast.error("Please complete the Captcha challenge.");
                return;
            }

            setCheckingPaymentConfig(true);
            try {
                const config = await tenantsService.getRegistrationPaymentConfig();
                const requiresPayment = config.paymentRequired;
                setPaymentRequired(requiresPayment);

                if (requiresPayment) {
                    setStep(3);
                    return;
                }

                await submitRegistration(false);
            } catch (error: unknown) {
                const fallbackMessage =
                    "Unable to determine payment requirements. Please try again shortly.";

                if (axios.isAxiosError(error)) {
                    const responseData = error.response?.data;
                    const apiMessage =
                        typeof responseData?.message === "string"
                            ? responseData.message
                            : typeof responseData?.error === "string"
                              ? responseData.error
                              : undefined;

                    toast.error(apiMessage || error.message || fallbackMessage);
                    return;
                }

                toast.error(fallbackMessage);
            } finally {
                setCheckingPaymentConfig(false);
            }
            return;
        }
    };

    const handleBack = () => {
        setStep((prev) => Math.max(prev - 1, 1));
    };

    const handleSubmit = async () => {
        await submitRegistration(paymentRequired ?? true);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <WebsiteLayout>
            <section className="py-24 lg:py-32 hero-gradient">
                <div className="section-container">
                    <motion.div
                        className="max-w-4xl"
                        initial="initial"
                        animate="animate"
                        variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
                    >
                        <motion.div variants={fadeIn} className="flex items-center gap-2 mb-6">
                            <span className="h-px w-12" style={{ backgroundColor: GOLD }} />
                            <span
                                className="text-sm font-medium tracking-widest uppercase"
                                style={{ color: GOLD }}
                            >
                                Register
                            </span>
                        </motion.div>

                        <motion.h1
                            variants={fadeIn}
                            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
                            style={{ fontFamily: "Space Grotesk, system-ui, sans-serif" }}
                        >
                            Register Your <span className="text-gradient-gold">Institution</span>
                        </motion.h1>

                        <motion.p
                            variants={fadeIn}
                            className="text-lg sm:text-xl leading-relaxed"
                            style={{ color: "#ccc" }}
                        >
                            Launch your CONTROLHQ tenant in minutes. Complete registration and, if
                            required, continue to secure payment to activate your subscription.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            <section className="py-24 lg:py-32">
                <div className="section-container">
                    <div className="grid lg:grid-cols-3 gap-12">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2
                                className="text-2xl font-bold mb-8"
                                style={{ fontFamily: "Space Grotesk, system-ui, sans-serif" }}
                            >
                                What You Get
                            </h2>
                            <ul className="space-y-4">
                                {registrationBenefits.map((benefit, index) => (
                                    <motion.li
                                        key={benefit}
                                        className="flex items-start gap-3"
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.05 }}
                                    >
                                        <Check
                                            className="w-5 h-5 shrink-0 mt-0.5"
                                            style={{ color: GOLD }}
                                        />
                                        <span style={{ color: "#ccc" }}>{benefit}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div
                            className="lg:col-span-2 p-12 rounded-lg"
                            style={{ backgroundColor: "#141417", border: "1px solid #2a2a2e" }}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h2
                                    className="text-2xl font-bold"
                                    style={{ fontFamily: "Space Grotesk, system-ui, sans-serif" }}
                                >
                                    Registration Wizard
                                </h2>
                                <div
                                    className="flex items-center gap-2 text-sm"
                                    style={{ color: "#888" }}
                                >
                                    {[1, 2, 3].map((number) => (
                                        <div
                                            key={number}
                                            className="w-8 h-8 rounded-full flex items-center justify-center"
                                            style={{
                                                backgroundColor:
                                                    number <= step
                                                        ? "rgba(202, 138, 4, 0.2)"
                                                        : "#0f0f12",
                                                color: number <= step ? GOLD : "#666",
                                                border: `1px solid ${number <= step ? GOLD : "#2a2a2e"}`,
                                            }}
                                        >
                                            {number}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {registrationSubmitted ? (
                                <div
                                    className="rounded-lg p-8 text-center"
                                    style={{
                                        backgroundColor: "#0f0f12",
                                        border: `1px solid ${GOLD}`,
                                    }}
                                >
                                    <MailCheck
                                        className="w-10 h-10 mx-auto mb-4"
                                        style={{ color: GOLD }}
                                    />
                                    <h3
                                        className="text-2xl font-bold mb-3"
                                        style={{
                                            color: "#f5f5f5",
                                            fontFamily: "Space Grotesk, system-ui, sans-serif",
                                        }}
                                    >
                                        Registration successful
                                    </h3>
                                    <p className="text-base mb-6" style={{ color: "#ccc" }}>
                                        We’ve sent a confirmation link to{" "}
                                        <strong>{confirmationEmail || formData.email}</strong>.
                                        Open your inbox and click the link to activate your account
                                        before signing in.
                                    </p>
                                    <p className="text-sm mb-8" style={{ color: "#888" }}>
                                        If you don’t see the email, check your spam or promotions folder.
                                    </p>
                                    {registrationWarning && (
                                        <div
                                            className="mb-8 p-4 rounded-lg text-left"
                                            style={{
                                                backgroundColor: "rgba(202, 138, 4, 0.12)",
                                                border: `1px solid ${GOLD}`,
                                            }}
                                        >
                                            <p className="text-sm font-semibold mb-2" style={{ color: GOLD }}>
                                                Email delivery warning
                                            </p>
                                            <p className="text-sm" style={{ color: "#ddd" }}>
                                                {registrationWarning}
                                            </p>
                                            <button
                                                type="button"
                                                onClick={handleResendConfirmationEmail}
                                                disabled={resendingConfirmation}
                                                className="mt-4 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2"
                                                style={{
                                                    border: `1px solid ${GOLD}`,
                                                    color: "#f5f5f5",
                                                    opacity: resendingConfirmation ? 0.7 : 1,
                                                }}
                                            >
                                                {resendingConfirmation
                                                    ? "Resending..."
                                                    : "Resend confirmation email"}
                                                {resendingConfirmation && (
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                )}
                                            </button>
                                        </div>
                                    )}
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <Link
                                            to="/"
                                            className="px-6 py-3 rounded-lg font-semibold"
                                            style={{
                                                backgroundColor: GOLD,
                                                color: "#000000",
                                            }}
                                        >
                                            Back to Home
                                        </Link>
                                        <Link
                                            to="/login"
                                            className="px-6 py-3 rounded-lg font-semibold"
                                            style={{
                                                border: `1px solid ${GOLD}`,
                                                color: "#f5f5f5",
                                            }}
                                        >
                                            Go to Login
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleFormSubmit} className="space-y-6">
                                    {step === 1 && (
                                    <div className="space-y-6">
                                        <div>
                                            <label
                                                className="block text-sm font-medium mb-2"
                                                style={{ color: "#ccc" }}
                                            >
                                                Organization Name
                                            </label>
                                            <input
                                                type="text"
                                                name="organizationName"
                                                value={formData.organizationName}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 rounded-lg text-base"
                                                style={{
                                                    backgroundColor: "#0f0f12",
                                                    border: "1px solid #2a2a2e",
                                                    color: "#f5f5f5",
                                                }}
                                                placeholder="Your organization"
                                            />
                                        </div>

                                        <div>
                                            <label
                                                className="block text-sm font-medium mb-2"
                                                style={{ color: "#ccc" }}
                                            >
                                                Organization Type
                                            </label>
                                            <select
                                                name="organizationType"
                                                value={formData.organizationType}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 rounded-lg text-base"
                                                style={{
                                                    backgroundColor: "#0f0f12",
                                                    border: "1px solid #2a2a2e",
                                                    color: "#f5f5f5",
                                                }}
                                            >
                                                <option value="">Select type...</option>
                                                {organizationOptions.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label
                                                className="block text-sm font-medium mb-2"
                                                style={{ color: "#ccc" }}
                                            >
                                                Specific Needs / Use Cases
                                            </label>
                                            <textarea
                                                name="useCases"
                                                value={formData.useCases}
                                                onChange={handleChange}
                                                rows={4}
                                                className="w-full px-4 py-3 rounded-lg text-base resize-none"
                                                style={{
                                                    backgroundColor: "#0f0f12",
                                                    border: "1px solid #2a2a2e",
                                                    color: "#f5f5f5",
                                                }}
                                                placeholder="Tell us about your operational goals..."
                                            />
                                        </div>
                                    </div>
                                )}

                                    {step === 2 && (
                                    <div className="space-y-6">
                                        <div>
                                            <label
                                                className="block text-sm font-medium mb-2"
                                                style={{ color: "#ccc" }}
                                            >
                                                Contact Name
                                            </label>
                                            <input
                                                type="text"
                                                name="contactName"
                                                value={formData.contactName}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 rounded-lg text-base"
                                                style={{
                                                    backgroundColor: "#0f0f12",
                                                    border: "1px solid #2a2a2e",
                                                    color: "#f5f5f5",
                                                }}
                                                placeholder="SUPER_ADMIN contact name"
                                            />
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label
                                                    className="block text-sm font-medium mb-2"
                                                    style={{ color: "#ccc" }}
                                                >
                                                    Email Address
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-3 rounded-lg text-base"
                                                    style={{
                                                        backgroundColor: "#0f0f12",
                                                        border: "1px solid #2a2a2e",
                                                        color: "#f5f5f5",
                                                    }}
                                                    placeholder="admin@organization.org"
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    className="block text-sm font-medium mb-2"
                                                    style={{ color: "#ccc" }}
                                                >
                                                    Phone Number
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    inputMode="numeric"
                                                    pattern="^0\d{10}$"
                                                    maxLength={11}
                                                    className="w-full px-4 py-3 rounded-lg text-base"
                                                    style={{
                                                        backgroundColor: "#0f0f12",
                                                        border: "1px solid #2a2a2e",
                                                        color: "#f5f5f5",
                                                    }}
                                                    placeholder="08032517996"
                                                />
                                                <p
                                                    className="text-xs mt-2"
                                                    style={{ color: "#666" }}
                                                >
                                                    Use 11 digits starting with 0 (example:
                                                    08032517996).
                                                </p>
                                            </div>
                                        </div>

                                        <div>
                                            <label
                                                className="block text-sm font-medium mb-2"
                                                style={{ color: "#ccc" }}
                                            >
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 rounded-lg text-base"
                                                style={{
                                                    backgroundColor: "#0f0f12",
                                                    border: "1px solid #2a2a2e",
                                                    color: "#f5f5f5",
                                                }}
                                                placeholder="Minimum 8 characters"
                                            />
                                            <p className="text-xs mt-2" style={{ color: "#666" }}>
                                                {PASSWORD_PATTERN_MESSAGE}
                                            </p>
                                        </div>

                                        <div>
                                            <label
                                                className="block text-sm font-medium mb-2"
                                                style={{ color: "#ccc" }}
                                            >
                                                Confirm Password
                                            </label>
                                            <input
                                                type="password"
                                                name="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 rounded-lg text-base"
                                                style={{
                                                    backgroundColor: "#0f0f12",
                                                    border: "1px solid #2a2a2e",
                                                    color: "#f5f5f5",
                                                }}
                                                placeholder="Re-enter your password"
                                            />
                                        </div>
                                    </div>
                                )}

                                    {step === 3 && (
                                    <div className="space-y-6">
                                        <div>
                                            <div className="flex items-center justify-between mb-4">
                                                <h3
                                                    className="text-lg font-semibold"
                                                    style={{ color: "#f5f5f5" }}
                                                >
                                                    Your subscription plan
                                                </h3>
                                                {loadingPlans && (
                                                    <div
                                                        className="flex items-center gap-2 text-sm"
                                                        style={{ color: "#888" }}
                                                    >
                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                        Loading plan
                                                    </div>
                                                )}
                                            </div>
                                            <div
                                                className="p-6 rounded-lg"
                                                style={{
                                                    backgroundColor: "rgba(202, 138, 4, 0.15)",
                                                    border: `1px solid ${GOLD}`,
                                                }}
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <p
                                                            className="text-base font-medium"
                                                            style={{ color: "#888" }}
                                                        >
                                                            {subscriptionPlan?.name ||
                                                                "Control HQ Subscription"}
                                                        </p>
                                                        <p
                                                            className="text-2xl font-bold mt-1"
                                                            style={{ color: "#f5f5f5" }}
                                                        >
                                                            {subscriptionPlan
                                                                ? formatAmount(
                                                                      subscriptionPlan.amount,
                                                                  )
                                                                : "Loading..."}
                                                        </p>
                                                        <p
                                                            className="text-sm mt-1"
                                                            style={{ color: "#888" }}
                                                        >
                                                            Billed{" "}
                                                            {subscriptionPlan?.interval ||
                                                                "annually"}
                                                        </p>
                                                    </div>
                                                    <Check
                                                        className="w-6 h-6"
                                                        style={{ color: GOLD }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h3
                                                className="text-lg font-semibold mb-4"
                                                style={{ color: "#f5f5f5" }}
                                            >
                                                Payment mode
                                            </h3>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                {[
                                                    {
                                                        value: "AUTO",
                                                        label: "Auto Renew",
                                                        desc: "Recurring billing via Paystack.",
                                                    },
                                                    {
                                                        value: "MANUAL",
                                                        label: "Manual Renew",
                                                        desc: "Pay each cycle when due.",
                                                    },
                                                ].map((mode) => (
                                                    <button
                                                        key={mode.value}
                                                        type="button"
                                                        onClick={() =>
                                                            setFormData((prev) => ({
                                                                ...prev,
                                                                subscriptionMode: mode.value as
                                                                    | "AUTO"
                                                                    | "MANUAL",
                                                            }))
                                                        }
                                                        className="text-left p-4 rounded-lg transition-all duration-200"
                                                        style={{
                                                            backgroundColor:
                                                                formData.subscriptionMode ===
                                                                mode.value
                                                                    ? "rgba(202, 138, 4, 0.15)"
                                                                    : "#0f0f12",
                                                            border: `1px solid ${formData.subscriptionMode === mode.value ? GOLD : "#2a2a2e"}`,
                                                        }}
                                                    >
                                                        <p
                                                            className="text-base font-semibold"
                                                            style={{ color: "#f5f5f5" }}
                                                        >
                                                            {mode.label}
                                                        </p>
                                                        <p
                                                            className="text-sm"
                                                            style={{ color: "#888" }}
                                                        >
                                                            {mode.desc}
                                                        </p>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div
                                            className="p-4 rounded-lg"
                                            style={{
                                                backgroundColor: "#0f0f12",
                                                border: "1px solid #2a2a2e",
                                            }}
                                        >
                                            <div className="flex items-start gap-3">
                                                <ShieldCheck
                                                    className="w-5 h-5"
                                                    style={{ color: GOLD }}
                                                />
                                                <div>
                                                    <p
                                                        className="text-sm font-semibold"
                                                        style={{ color: "#f5f5f5" }}
                                                    >
                                                        Secure payment handled by Paystack
                                                    </p>
                                                    <p
                                                        className="text-xs"
                                                        style={{ color: "#888" }}
                                                    >
                                                        If payment is required, you will be redirected
                                                        to complete it via Paystack and then return to
                                                        finish setup.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                )}

                                    {step >= 2 && (
                                        <div className="p-4 w-full">
                                            <Turnstile
                                                siteKey={siteKey}
                                                options={{ size: "flexible" }}
                                                className="w-full"
                                                onSuccess={(token) => setToken(token)}
                                                onExpire={() => setToken(null)}
                                                onError={() => setToken(null)}
                                            />
                                            <p className="mt-2 text-xs" style={{ color: "#888" }}>
                                                Complete captcha to continue registration.
                                            </p>
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between pt-4">
                                        <button
                                            type="button"
                                            onClick={handleBack}
                                            disabled={submitting || checkingPaymentConfig}
                                            className="px-6 py-3 rounded-lg text-sm font-semibold"
                                            style={{
                                                backgroundColor: "#0f0f12",
                                                color: "#ccc",
                                                border: "1px solid #2a2a2e",
                                                visibility: step === 1 ? "hidden" : "visible",
                                                opacity: submitting || checkingPaymentConfig ? 0.7 : 1,
                                            }}
                                        >
                                            Back
                                        </button>

                                        {step < 3 ? (
                                            <button
                                                type="button"
                                                onClick={handleNext}
                                                disabled={submitting || checkingPaymentConfig}
                                                className="px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
                                                style={{
                                                    backgroundColor: GOLD,
                                                    color: "#000000",
                                                    opacity: submitting || checkingPaymentConfig ? 0.7 : 1,
                                                }}
                                            >
                                                {checkingPaymentConfig ? "Checking..." : "Continue"}
                                                {checkingPaymentConfig ? (
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                ) : (
                                                    <ArrowRight className="w-4 h-4" />
                                                )}
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={handleSubmit}
                                                disabled={submitting || checkingPaymentConfig || !token}
                                                className="px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
                                                style={{
                                                    backgroundColor: GOLD,
                                                    color: "#000000",
                                                    opacity:
                                                        submitting || checkingPaymentConfig || !token
                                                            ? 0.7
                                                            : 1,
                                                }}
                                            >
                                                {submitting
                                                    ? "Submitting..."
                                                    : "Complete Registration"}
                                                <ArrowRight className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                </form>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="py-24 lg:py-32" style={{ backgroundColor: "#1a1a1f" }}>
                <div className="section-container">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2
                            className="text-3xl lg:text-4xl font-bold mb-4"
                            style={{ fontFamily: "Space Grotesk, system-ui, sans-serif" }}
                        >
                            What Happens Next
                        </h2>
                        <p className="max-w-2xl mx-auto" style={{ color: "#888" }}>
                            {registrationSubmitted
                                ? "Use the confirmation link in your inbox to activate your account and continue."
                                : "If payment applies, complete checkout to activate this organization. We will then guide your onboarding process."}
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
                        {(registrationSubmitted
                            ? [
                                  {
                                      step: "1",
                                      title: "Check Your Inbox",
                                      description: "Open the confirmation email we just sent.",
                                  },
                                  {
                                      step: "2",
                                      title: "Confirm Email",
                                      description: "Click the email confirmation link.",
                                  },
                                  {
                                      step: "3",
                                      title: "Sign In",
                                      description:
                                          "You will be redirected to login after successful confirmation.",
                                  },
                              ]
                            : [
                                  {
                                      step: "1",
                                      title: "Pay Securely",
                                      description: "If prompted, finish your subscription checkout on Paystack.",
                                  },
                                  {
                                      step: "2",
                                      title: "Verification",
                                      description: "We verify payment and activate this organization.",
                                  },
                                  {
                                      step: "3",
                                      title: "Onboarding",
                                      description:
                                          "Your team receives login access and implementation support.",
                                  },
                              ]
                        ).map((item, index) => (
                            <motion.div
                                key={item.step}
                                className="text-center p-6 rounded-lg"
                                style={{
                                    backgroundColor: "#0f0f12",
                                    border: `1px solid ${GOLD}20`,
                                }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold"
                                    style={{
                                        backgroundColor: "rgba(202, 138, 4, 0.2)",
                                        color: GOLD,
                                    }}
                                >
                                    {item.step}
                                </div>
                                <h3
                                    className="font-semibold mb-2"
                                    style={{ fontFamily: "Space Grotesk, system-ui, sans-serif" }}
                                >
                                    {item.title}
                                </h3>
                                <p className="text-sm" style={{ color: "#888" }}>
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </WebsiteLayout>
    );
}
