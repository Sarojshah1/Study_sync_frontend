import React from "react";

const TermsAndPolicies = () => {
    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 to-teal-100 flex items-center justify-center">
            <div className="max-w-5xl bg-white p-10 rounded-lg shadow-2xl">
                <h1 className="text-5xl font-bold text-teal-600 mb-6 text-center">
                    Terms and Policies Agreement
                </h1>
                <p className="text-gray-700 text-lg mb-6 leading-relaxed text-center">
                    Please take a moment to carefully review these Terms and Policies before using our application. By accessing or utilizing <span className="font-semibold text-teal-600">StudySync</span>, you acknowledge that you have read, understood, and agree to be bound by these terms. If you do not agree with any part of these terms, we kindly request that you refrain from using our services. Thank you for choosing <span className="font-semibold text-teal-600">StudySync</span>.
                </p>

                <div className="border-t border-gray-300 my-6"></div>

                <div className="space-y-8">
                    <section>
                        <h2 className="text-3xl font-semibold text-gray-800 mb-3">
                            Acceptance of Terms
                        </h2>
                        <p className="text-gray-600 text-base leading-relaxed">
                            By creating an account or using <span className="font-semibold">StudySync</span>, you agree to these Terms and Policies. <span className="font-semibold">StudySync</span> reserves the right to update or modify these terms at any time. Continued use of the app constitutes your acceptance of any such changes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-semibold text-gray-800 mb-3">
                            User Responsibilities
                        </h2>
                        <ul className="list-disc list-inside text-gray-600 text-base space-y-2">
                            <li>You must be at least 13 years old to use <span className="font-semibold">StudySync</span>.</li>
                            <li>You agree to provide accurate and complete information when creating an account.</li>
                            <li>You are responsible for safeguarding your account credentials.</li>
                            <li>You agree not to misuse the app by uploading harmful content or violating intellectual property rights.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-3xl font-semibold text-gray-800 mb-3">
                            Privacy Policy
                        </h2>
                        <ul className="list-disc list-inside text-gray-600 text-base space-y-2">
                            <li>
                                <span className="font-semibold">Data Collection:</span> We collect information like your name, email, and learning preferences to provide personalized services.
                            </li>
                            <li>
                                <span className="font-semibold">Data Use:</span> Your data is used to improve app functionality and offer a better learning experience.
                            </li>
                            <li>
                                <span className="font-semibold">Third-Party Sharing:</span> We do not sell or share your data with third parties, except as required by law.
                            </li>
                            <li>
                                <span className="font-semibold">Security:</span> We employ strict security measures to protect your information.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-3xl font-semibold text-gray-800 mb-3">
                            Payment and Subscriptions
                        </h2>
                        <ul className="list-disc list-inside text-gray-600 text-base space-y-2">
                            <li><span className="font-semibold">StudySync</span> may offer free and premium subscription plans.</li>
                            <li>Payments for premium subscriptions are non-refundable, except as required by law.</li>
                            <li>You may cancel your subscription at any time through the app settings.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-3xl font-semibold text-gray-800 mb-3">
                            Intellectual Property
                        </h2>
                        <p className="text-gray-600 text-base leading-relaxed">
                            All content provided on <span className="font-semibold">StudySync</span>, including text, graphics, and software, is the intellectual property of <span className="font-semibold">StudySync</span>. Any unauthorized use, reproduction, distribution, or modification of this content is strictly prohibited and may result in legal action.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-semibold text-gray-800 mb-3">
                            Contact Us
                        </h2>
                        <ul className="text-gray-600 text-base space-y-2">
                            <li>Email: <a href="mailto:support@studysync.com" className="text-teal-600 underline">support@studysync.com</a></li>
                            <li>Phone: +1 234 567 890</li>
                        </ul>
                    </section>
                </div>

                <div className="mt-10 text-center">
                    <button className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-3 px-8 rounded-lg text-lg font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all">
                        Agree and Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TermsAndPolicies;
