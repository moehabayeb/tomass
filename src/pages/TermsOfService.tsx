/**
 * Terms of Service Page
 * Required for Apple App Store and Google Play Store compliance
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function TermsOfService() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-indigo-950 text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 text-white hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold">Terms of Service</h1>
            <p className="text-slate-300">Last updated: January 31, 2025</p>
          </div>
        </div>

        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardContent className="p-8 space-y-8 text-slate-200">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
              <p className="leading-relaxed">
                Welcome to Tomas English ("the App," "we," "our," or "us"). These Terms of Service ("Terms")
                govern your access to and use of our mobile application, website, and services. By creating an
                account or using our App, you agree to be bound by these Terms.
              </p>
              <p className="leading-relaxed mt-3">
                If you do not agree to these Terms, you must not access or use the App. We reserve the right to
                update these Terms at any time, and your continued use of the App constitutes acceptance of any
                changes.
              </p>
            </section>

            {/* Account Registration */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Account Registration</h2>

              <h3 className="text-xl font-semibold text-white mb-3">2.1 Eligibility</h3>
              <p className="leading-relaxed mb-3">
                You must be at least 13 years old to create an account. If you are under 18, you represent that
                you have your parent's or legal guardian's permission to use the App.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3">2.2 Account Security</h3>
              <p className="leading-relaxed mb-3">
                You are responsible for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized use</li>
                <li>Ensuring your account information is accurate and up-to-date</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3 mt-6">2.3 Account Termination</h3>
              <p className="leading-relaxed">
                We reserve the right to suspend or terminate your account if you violate these Terms or engage
                in fraudulent, abusive, or illegal activities.
              </p>
            </section>

            {/* Subscription Plans */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Subscription Plans & Pricing</h2>

              <h3 className="text-xl font-semibold text-white mb-3">3.1 Free Plan</h3>
              <p className="leading-relaxed mb-3">
                The Free Plan includes:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Limited AI practice (10 interactions per day)</li>
                <li>7-day trial to explore premium features</li>
                <li>Basic exercises and lessons</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3 mt-6">3.2 AI-Only Plan</h3>
              <p className="leading-relaxed mb-3">
                Pricing: ₺250/month or ₺600/quarter (save 20%)
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Unlimited AI practice</li>
                <li>All exercises and lessons</li>
                <li>Progress tracking</li>
                <li>No live lessons</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3 mt-6">3.3 AI + Live Lessons Plan</h3>
              <p className="leading-relaxed mb-3">
                Pricing: ₺4,750/month or ₺11,400/quarter (save 20%)
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Unlimited AI practice</li>
                <li>All exercises and lessons</li>
                <li>16 live online classes per month (4 per week)</li>
                <li>Priority support</li>
                <li>Progress tracking</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3 mt-6">3.4 Price Changes</h3>
              <p className="leading-relaxed">
                We reserve the right to modify our pricing at any time. Existing subscribers will be notified
                at least 30 days in advance of any price changes. Changes will take effect at the start of your
                next billing cycle.
              </p>
            </section>

            {/* Payment & Billing */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Payment & Billing</h2>

              <h3 className="text-xl font-semibold text-white mb-3">4.1 Payment Processing</h3>
              <p className="leading-relaxed mb-3">
                All payments are processed by:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>iOS:</strong> Apple App Store (In-App Purchases)</li>
                <li><strong>Android:</strong> Google Play Store (Google Play Billing)</li>
              </ul>
              <p className="leading-relaxed mt-3">
                We do not store your credit card information. All payment data is securely handled by Apple or
                Google.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3 mt-6">4.2 Automatic Renewal</h3>
              <p className="leading-relaxed">
                Subscriptions automatically renew at the end of each billing period unless you cancel at least
                24 hours before the renewal date. You will be charged through your Apple ID or Google Play
                account.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3 mt-6">4.3 Billing Disputes</h3>
              <p className="leading-relaxed">
                If you believe you have been incorrectly charged, please contact us at{' '}
                <a href="mailto:billing@tomashoca.com" className="text-blue-400 hover:underline">
                  billing@tomashoca.com
                </a>{' '}
                within 30 days of the charge. We will investigate and resolve the issue promptly.
              </p>
            </section>

            {/* Cancellation & Refunds */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Cancellation & Refunds</h2>

              <h3 className="text-xl font-semibold text-white mb-3">5.1 How to Cancel</h3>
              <p className="leading-relaxed mb-3">
                To cancel your subscription:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>iOS:</strong> Settings → [Your Name] → Subscriptions → Tomas English → Cancel Subscription</li>
                <li><strong>Android:</strong> Google Play Store → Menu → Subscriptions → Tomas English → Cancel Subscription</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3 mt-6">5.2 Refund Policy</h3>
              <p className="leading-relaxed mb-3">
                Refunds are handled by Apple and Google according to their policies:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Apple:</strong> Request a refund at{' '}
                  <a href="https://reportaproblem.apple.com" className="text-blue-400 hover:underline">
                    reportaproblem.apple.com
                  </a>
                </li>
                <li>
                  <strong>Google:</strong> Request a refund through{' '}
                  <a href="https://support.google.com/googleplay" className="text-blue-400 hover:underline">
                    Google Play Support
                  </a>
                </li>
              </ul>
              <p className="leading-relaxed mt-3">
                Generally, refunds are only available within 48 hours of purchase. After that, cancellations
                take effect at the end of the current billing period, and you retain access until then.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3 mt-6">5.3 Exceptions</h3>
              <p className="leading-relaxed">
                We may offer refunds at our discretion in cases of:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Technical issues that prevented you from using the App</li>
                <li>Billing errors or duplicate charges</li>
                <li>Extraordinary circumstances</li>
              </ul>
            </section>

            {/* Live Lessons Policy */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Live Lessons Policy (AI + Live Plan Only)</h2>

              <h3 className="text-xl font-semibold text-white mb-3">6.1 Booking</h3>
              <p className="leading-relaxed">
                Live lesson subscribers receive 16 live classes per month (4 per week). Classes must be booked
                in advance through the App. Booking availability depends on instructor schedules.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3 mt-6">6.2 Attendance</h3>
              <p className="leading-relaxed">
                If you miss a scheduled live lesson without cancelling at least 24 hours in advance, the
                session counts as used, and no credit will be refunded.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3 mt-6">6.3 Cancellation</h3>
              <p className="leading-relaxed">
                You may cancel or reschedule a live lesson up to 24 hours before the scheduled time. Late
                cancellations (less than 24 hours) will not be refunded.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3 mt-6">6.4 Unused Credits</h3>
              <p className="leading-relaxed">
                Live lesson credits do not roll over to the next month. If you do not use all 16 classes in a
                month, the remaining credits expire at the end of the billing period.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3 mt-6">6.5 Conduct</h3>
              <p className="leading-relaxed">
                You agree to behave respectfully toward instructors and other students. Harassment, abusive
                language, or disruptive behavior may result in immediate account termination without refund.
              </p>
            </section>

            {/* User Conduct */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. User Conduct & Prohibited Activities</h2>
              <p className="leading-relaxed mb-3">
                You agree NOT to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Share your account credentials with others</li>
                <li>Use the App for any illegal or unauthorized purpose</li>
                <li>Attempt to hack, reverse-engineer, or exploit the App</li>
                <li>Upload viruses, malware, or malicious code</li>
                <li>Harass, abuse, or threaten other users or instructors</li>
                <li>Copy, reproduce, or distribute our content without permission</li>
                <li>Use bots or automated tools to interact with the App</li>
                <li>Bypass any content protection or access controls</li>
              </ul>
              <p className="leading-relaxed mt-3">
                Violation of these rules may result in immediate account suspension or termination.
              </p>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Intellectual Property Rights</h2>

              <h3 className="text-xl font-semibold text-white mb-3">8.1 Our Content</h3>
              <p className="leading-relaxed">
                All content in the App, including text, graphics, logos, audio, video, exercises, lessons, and
                software, is the property of Tomas English or its licensors and is protected by copyright,
                trademark, and other intellectual property laws.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3 mt-6">8.2 Limited License</h3>
              <p className="leading-relaxed">
                We grant you a limited, non-exclusive, non-transferable license to access and use the App for
                personal, non-commercial purposes. You may not copy, modify, distribute, sell, or lease any
                part of our content.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3 mt-6">8.3 User-Generated Content</h3>
              <p className="leading-relaxed">
                By submitting content (e.g., speaking recordings, profile information), you grant us a
                worldwide, royalty-free license to use, store, and process your content solely for the purpose
                of providing the service.
              </p>
            </section>

            {/* Disclaimer & Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Disclaimers & Limitation of Liability</h2>

              <h3 className="text-xl font-semibold text-white mb-3">9.1 "As Is" Service</h3>
              <p className="leading-relaxed">
                The App is provided "as is" and "as available" without warranties of any kind, express or
                implied. We do not guarantee that the App will be error-free, uninterrupted, or secure.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3 mt-6">9.2 Educational Purposes</h3>
              <p className="leading-relaxed">
                Tomas English is an educational tool. We do not guarantee specific learning outcomes, exam
                scores, or proficiency improvements. Results depend on your effort and practice.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3 mt-6">9.3 Limitation of Liability</h3>
              <p className="leading-relaxed">
                To the maximum extent permitted by law, Tomas English and its affiliates shall not be liable
                for any indirect, incidental, special, consequential, or punitive damages, including loss of
                profits, data, or goodwill, arising from your use of the App.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3 mt-6">9.4 Maximum Liability</h3>
              <p className="leading-relaxed">
                Our total liability to you for any claims arising from your use of the App shall not exceed the
                amount you paid us in the past 12 months.
              </p>
            </section>

            {/* Indemnification */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">10. Indemnification</h2>
              <p className="leading-relaxed">
                You agree to indemnify, defend, and hold harmless Tomas English, its officers, employees, and
                affiliates from any claims, damages, losses, liabilities, and expenses (including legal fees)
                arising from:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                <li>Your violation of these Terms</li>
                <li>Your use or misuse of the App</li>
                <li>Your violation of any third-party rights</li>
                <li>Your violation of any applicable law or regulation</li>
              </ul>
            </section>

            {/* Dispute Resolution */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">11. Dispute Resolution</h2>

              <h3 className="text-xl font-semibold text-white mb-3">11.1 Governing Law</h3>
              <p className="leading-relaxed">
                These Terms are governed by the laws of Turkey. Any disputes shall be resolved in accordance
                with Turkish law.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3 mt-6">11.2 Arbitration</h3>
              <p className="leading-relaxed">
                Before filing a lawsuit, you agree to attempt to resolve any disputes through informal
                negotiation by contacting us at{' '}
                <a href="mailto:legal@tomashoca.com" className="text-blue-400 hover:underline">
                  legal@tomashoca.com
                </a>
                . We will work in good faith to resolve the issue within 30 days.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3 mt-6">11.3 Jurisdiction</h3>
              <p className="leading-relaxed">
                If informal resolution fails, any legal action must be brought in the courts of Istanbul,
                Turkey.
              </p>
            </section>

            {/* Changes to Terms */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">12. Changes to These Terms</h2>
              <p className="leading-relaxed">
                We may update these Terms from time to time. We will notify you of material changes by:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                <li>Posting the updated Terms in the App</li>
                <li>Sending you an email notification</li>
                <li>Displaying a prominent notice in the App</li>
              </ul>
              <p className="leading-relaxed mt-3">
                Your continued use of the App after changes take effect constitutes your acceptance of the
                revised Terms.
              </p>
            </section>

            {/* Severability */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">13. Severability</h2>
              <p className="leading-relaxed">
                If any provision of these Terms is found to be unenforceable or invalid by a court, that
                provision shall be modified to the minimum extent necessary to make it enforceable. The
                remaining provisions shall remain in full force and effect.
              </p>
            </section>

            {/* Entire Agreement */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">14. Entire Agreement</h2>
              <p className="leading-relaxed">
                These Terms, together with our Privacy Policy, constitute the entire agreement between you and
                Tomas English regarding your use of the App, and supersede any prior agreements.
              </p>
            </section>

            {/* Contact Us */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">15. Contact Us</h2>
              <p className="leading-relaxed mb-3">
                If you have any questions or concerns about these Terms, please contact us:
              </p>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <p className="font-semibold text-white mb-2">Tomas English</p>
                <p>Email: <a href="mailto:legal@tomashoca.com" className="text-blue-400 hover:underline">legal@tomashoca.com</a></p>
                <p>Support: <a href="mailto:support@tomashoca.com" className="text-blue-400 hover:underline">support@tomashoca.com</a></p>
                <p>Website: <a href="https://tomashoca.com" className="text-blue-400 hover:underline">tomashoca.com</a></p>
              </div>
            </section>

            {/* Acknowledgment */}
            <section className="bg-white/10 rounded-lg p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-4">Acknowledgment</h2>
              <p className="leading-relaxed">
                BY USING TOMAS ENGLISH, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY
                THESE TERMS OF SERVICE.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
