"use client";

import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0c] text-white">
            {/* Hero */}
            <section className="pt-40 pb-16 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h1
                        className="text-4xl md:text-6xl font-bold font-sora mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Privacy Policy
                    </motion.h1>
                    <motion.p
                        className="text-[#B0B0B0] text-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Last updated: March 10, 2026
                    </motion.p>
                </div>
            </section>

            {/* Content */}
            <section className="pb-24 px-6">
                <motion.div
                    className="max-w-4xl mx-auto prose prose-invert prose-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="space-y-12 text-[#B0B0B0] leading-relaxed">
                        <div>
                            <h2 className="text-2xl font-bold text-white font-sora mb-4">1. Introduction</h2>
                            <p>
                                Welcome to Braniva (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains what information we collect, how we use it, and what rights you have in relation to it when you visit our website or use our services.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-white font-sora mb-4">2. Information We Collect</h2>
                            <p className="mb-4">We collect personal information that you voluntarily provide to us when you:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Fill out a contact form or schedule a consultation</li>
                                <li>Subscribe to our newsletter or marketing communications</li>
                                <li>Engage with us on social media platforms</li>
                                <li>Communicate with us via email, phone, or WhatsApp</li>
                            </ul>
                            <p className="mt-4">This information may include your name, email address, phone number, company name, website URL, and any other details you choose to provide.</p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-white font-sora mb-4">3. How We Use Your Information</h2>
                            <p className="mb-4">We use the information we collect for the following purposes:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>To provide, operate, and maintain our services</li>
                                <li>To respond to your inquiries and schedule consultations</li>
                                <li>To send you marketing and promotional communications (with your consent)</li>
                                <li>To improve our website and services based on usage patterns</li>
                                <li>To comply with legal obligations and protect our rights</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-white font-sora mb-4">4. Cookies and Tracking Technologies</h2>
                            <p>
                                Our website may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. We use these technologies to analyze website traffic, personalize content, and improve your browsing experience. You can instruct your browser to refuse all cookies or indicate when a cookie is being sent.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-white font-sora mb-4">5. Third-Party Services</h2>
                            <p className="mb-4">
                                We may use third-party services that collect, monitor, and analyze data to improve our services. These may include:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Google Analytics for website traffic analysis</li>
                                <li>Cal.com for scheduling consultations</li>
                                <li>Email service providers for marketing communications</li>
                                <li>WhatsApp Business API for customer communication</li>
                            </ul>
                            <p className="mt-4">These third-party services have their own privacy policies governing their use of your information.</p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-white font-sora mb-4">6. Data Security</h2>
                            <p>
                                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-white font-sora mb-4">7. Data Retention</h2>
                            <p>
                                We retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy, unless a longer retention period is required or permitted by law. When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize it.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-white font-sora mb-4">8. Your Rights</h2>
                            <p className="mb-4">Depending on your location, you may have the following rights regarding your personal data:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>The right to access the personal information we hold about you</li>
                                <li>The right to request correction of inaccurate data</li>
                                <li>The right to request deletion of your personal data</li>
                                <li>The right to withdraw consent for marketing communications</li>
                                <li>The right to data portability</li>
                            </ul>
                            <p className="mt-4">To exercise any of these rights, please contact us at <a href="mailto:hello@braniva.com" className="text-[#1ABC9C] hover:underline">hello@braniva.com</a>.</p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-white font-sora mb-4">9. Children&apos;s Privacy</h2>
                            <p>
                                Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected personal data from a child without verification of parental consent, we will take steps to remove that information.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-white font-sora mb-4">10. Changes to This Policy</h2>
                            <p>
                                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date at the top. We encourage you to review this Privacy Policy periodically for any changes.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-white font-sora mb-4">11. Contact Us</h2>
                            <p>
                                If you have any questions about this Privacy Policy, please contact us at:
                            </p>
                            <div className="mt-4 p-6 rounded-xl bg-white/5 border border-white/10">
                                <p className="font-semibold text-white">Braniva</p>
                                <p>Email: <a href="mailto:hello@braniva.com" className="text-[#1ABC9C] hover:underline">hello@braniva.com</a></p>
                                <p>Location: New Delhi, India</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
