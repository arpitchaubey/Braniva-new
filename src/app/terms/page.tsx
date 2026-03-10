"use client";

import { motion } from "framer-motion";

export default function TermsPage() {
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
                        Terms &amp; Conditions
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
                    className="max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="space-y-12 text-[#B0B0B0] leading-relaxed">
                        <div>
                            <h2 className="text-2xl font-bold text-white font-sora mb-4">1. Agreement to Terms</h2>
                            <p>
                                By accessing or using the Braniva website and services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not access our website or use our services. These terms apply to all visitors, users, and clients of Braniva.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-white font-sora mb-4">2. Services</h2>
                            <p className="mb-4">
                                Braniva provides e-commerce growth and digital marketing services, including but not limited to:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Marketplace setup and onboarding (Amazon, Flipkart, Myntra, Nykaa, Ajio, Tata Cliq, and others)</li>
                                <li>Marketing strategy and performance advertising (Google Ads, Meta Ads, Influencer Marketing)</li>
                                <li>Logistics onboarding and fulfillment integration</li>
                                <li>Product listing optimization and A+ content creation</li>
                                <li>Email marketing automation (Klaviyo, Omnisend, Mailchimp)</li>
                                <li>WhatsApp marketing campaigns and automation</li>
                                <li>Website design and development</li>
                                <li>Brand identity design and guidelines</li>
                            </ul>
                            <p className="mt-4">The specific scope, deliverables, and timeline of services will be mutually agreed upon and documented in a separate service agreement or proposal.</p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-white font-sora mb-4">3. Client Responsibilities</h2>
                            <p className="mb-4">As a client, you agree to:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Provide accurate and complete information required for service delivery</li>
                                <li>Grant timely access to necessary accounts, platforms, and assets</li>
                                <li>Respond to requests for approvals and feedback within reasonable timeframes</li>
                                <li>Ensure all content provided to us does not infringe any third-party rights</li>
                                <li>Make payments according to the agreed-upon schedule</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-white font-sora mb-4">4. Payment Terms</h2>
                            <p className="mb-4">
                                Payment terms will be outlined in the service agreement. General payment conditions include:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>All fees are quoted in Indian Rupees (INR) unless otherwise specified</li>
                                <li>Payment is due as per the schedule mentioned in the service agreement</li>
                                <li>Late payments may attract additional charges as outlined in the agreement</li>
                                <li>All applicable taxes (including GST) will be charged in addition to the quoted fees</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-white font-sora mb-4">5. Intellectual Property</h2>
                            <p className="mb-4">
                                Unless otherwise agreed in writing:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>All intellectual property created by Braniva during service delivery will be transferred to the client upon full payment</li>
                                <li>Braniva retains the right to showcase the work in its portfolio and case studies</li>
                                <li>Any pre-existing intellectual property remains the property of its original owner</li>
                                <li>Third-party tools, templates, and software used in service delivery remain subject to their respective licenses</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-white font-sora mb-4">6. Confidentiality</h2>
                            <p>
                                Both parties agree to maintain confidentiality of proprietary information shared during the course of the engagement. This includes business strategies, customer data, financial information, and any other sensitive materials. Confidentiality obligations survive the termination of the service agreement.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-white font-sora mb-4">7. Limitation of Liability</h2>
                            <p className="mb-4">
                                To the maximum extent permitted by law:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Braniva shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services</li>
                                <li>We do not guarantee specific results, rankings, or revenue outcomes</li>
                                <li>Our total liability shall not exceed the total fees paid by the client for the specific service in question</li>
                                <li>We are not liable for any losses arising from marketplace policy changes, algorithm updates, or third-party platform issues beyond our control</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-white font-sora mb-4">8. Termination</h2>
                            <p className="mb-4">
                                Either party may terminate the service engagement:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>With 30 days written notice for ongoing retainer-based services</li>
                                <li>Immediately if the other party materially breaches any term of the agreement</li>
                                <li>Fees for work completed up to the date of termination remain payable</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-white font-sora mb-4">9. Website Usage</h2>
                            <p className="mb-4">When using our website, you agree not to:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Use the website for any unlawful purpose or in violation of any applicable laws</li>
                                <li>Attempt to gain unauthorized access to any part of the website</li>
                                <li>Copy, reproduce, or distribute any content from the website without permission</li>
                                <li>Introduce viruses, malware, or other harmful materials</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-white font-sora mb-4">10. Third-Party Links</h2>
                            <p>
                                Our website may contain links to third-party websites or services that are not owned or controlled by Braniva. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services. We strongly advise you to read the terms and conditions and privacy policy of any third-party website you visit.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-white font-sora mb-4">11. Governing Law</h2>
                            <p>
                                These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in New Delhi, India.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-white font-sora mb-4">12. Changes to Terms</h2>
                            <p>
                                We reserve the right to modify or replace these Terms and Conditions at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect. By continuing to access or use our services after those revisions become effective, you agree to be bound by the revised terms.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-white font-sora mb-4">13. Contact Us</h2>
                            <p>
                                If you have any questions about these Terms and Conditions, please contact us at:
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
