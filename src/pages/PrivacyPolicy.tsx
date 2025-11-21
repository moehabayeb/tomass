/**
 * Privacy Policy Page
 * Required for Apple App Store and Google Play Store compliance
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function PrivacyPolicy() {
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
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold">Privacy Policy</h1>
            <p className="text-slate-300">Last updated: January 31, 2025</p>
          </div>
        </div>

        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardContent className="p-8 space-y-8 text-slate-200">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
              <p className="leading-relaxed">
                Welcome to Tomas English ("we," "our," or "the App"). We are committed to protecting your
                privacy and ensuring the security of your personal information. This Privacy Policy explains
                how we collect, use, disclose, and safeguard your information when you use our mobile
                application and services.
              </p>
              <p className="leading-relaxed mt-3">
                By using Tomas English, you agree to the collection and use of information in accordance with
                this policy. If you do not agree with our policies and practices, please do not use our App.
              </p>
              <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <p className="font-semibold text-green-300">
                  We do NOT sell your personal data.
                </p>
                <p className="text-sm text-slate-300 mt-1">
                  Your data is used solely to provide and improve our language learning service.
                  We never share or sell your personal information to third parties for marketing purposes.
                </p>
              </div>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>

              <h3 className="text-xl font-semibold text-white mb-3">2.1 Personal Information</h3>
              <p className="leading-relaxed mb-3">We collect the following personal information when you create an account:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Email address (for account authentication)</li>
                <li>Full name (optional, for personalization)</li>
                <li>Profile picture (optional)</li>
                <li>English proficiency level (from placement test)</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3 mt-6">2.2 Usage Data</h3>
              <p className="leading-relaxed mb-3">We automatically collect information about your interaction with the App:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Lesson progress and completion status</li>
                <li><strong>Speaking practice recordings</strong> - processed in real-time for AI feedback, then immediately discarded. We do NOT store your voice recordings.</li>
                <li>Exercise scores and performance metrics</li>
                <li>App usage patterns and feature interactions</li>
                <li>Device information (device type, OS version, app version)</li>
                <li>Session duration and frequency</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3 mt-6">2.4 Waitlist Information</h3>
              <p className="leading-relaxed mb-3">If you join our waitlist for premium subscriptions:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Email address (to notify you when subscriptions launch)</li>
                <li>Tier preference (which subscription plan you're interested in)</li>
                <li>Signup date</li>
              </ul>
              <p className="leading-relaxed mt-2 text-sm text-slate-300">
                You can unsubscribe from waitlist notifications at any time by contacting us.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3 mt-6">2.3 Subscription Information</h3>
              <p className="leading-relaxed mb-3">For paid subscriptions, we collect:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Subscription tier and billing cycle</li>
                <li>Purchase receipts from Apple App Store or Google Play Store</li>
                <li>Payment transaction IDs (we do NOT store credit card information)</li>
                <li>Subscription status (active, trial, cancelled, expired)</li>
              </ul>
            </section>

            {/* How We Use Your Information */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
              <p className="leading-relaxed mb-3">We use your information for the following purposes:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Provide the Service:</strong> Deliver personalized English learning experiences based on your level</li>
                <li><strong>AI-Powered Features:</strong> Analyze your speaking to provide instant feedback and corrections</li>
                <li><strong>Track Progress:</strong> Monitor your learning journey and show your improvement over time</li>
                <li><strong>Manage Subscriptions:</strong> Process payments and manage your subscription status</li>
                <li><strong>Improve the App:</strong> Analyze usage patterns to enhance features and fix bugs</li>
                <li><strong>Customer Support:</strong> Respond to your questions and provide technical assistance</li>
                <li><strong>Analytics:</strong> Understand user behavior to make data-driven product improvements</li>
                <li><strong>Error Tracking:</strong> Monitor and fix technical issues to ensure app stability</li>
              </ul>
            </section>

            {/* Third-Party Services */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Third-Party Services We Use</h2>

              <h3 className="text-xl font-semibold text-white mb-3">4.1 Supabase (Backend & Database)</h3>
              <p className="leading-relaxed mb-3">
                We use Supabase to securely store your account information, learning progress, and subscription
                data. Supabase is GDPR-compliant and uses industry-standard encryption.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Website: <a href="https://supabase.com" className="text-blue-400 hover:underline">supabase.com</a></li>
                <li>Privacy Policy: <a href="https://supabase.com/privacy" className="text-blue-400 hover:underline">supabase.com/privacy</a></li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3 mt-6">4.2 Sentry (Error Tracking)</h3>
              <p className="leading-relaxed mb-3">
                We use Sentry to monitor app crashes and errors. This helps us identify and fix bugs quickly to
                improve your experience. Sentry may collect device information and error logs.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Website: <a href="https://sentry.io" className="text-blue-400 hover:underline">sentry.io</a></li>
                <li>Privacy Policy: <a href="https://sentry.io/privacy" className="text-blue-400 hover:underline">sentry.io/privacy</a></li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3 mt-6">4.3 Amplitude (Analytics)</h3>
              <p className="leading-relaxed mb-3">
                We use Amplitude to understand how users interact with the App. This data helps us improve
                features and user experience. Amplitude collects usage events but does not access personal data
                like email or name.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Website: <a href="https://amplitude.com" className="text-blue-400 hover:underline">amplitude.com</a></li>
                <li>Privacy Policy: <a href="https://amplitude.com/privacy" className="text-blue-400 hover:underline">amplitude.com/privacy</a></li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3 mt-6">4.4 Apple App Store & Google Play Store</h3>
              <p className="leading-relaxed mb-3">
                If you subscribe to a paid plan, your payment is processed by Apple (for iOS) or Google (for
                Android). We do not have access to your credit card information. Please refer to their privacy
                policies:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Apple Privacy Policy: <a href="https://www.apple.com/legal/privacy" className="text-blue-400 hover:underline">apple.com/legal/privacy</a></li>
                <li>Google Privacy Policy: <a href="https://policies.google.com/privacy" className="text-blue-400 hover:underline">policies.google.com/privacy</a></li>
              </ul>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Data Security</h2>
              <p className="leading-relaxed mb-3">
                We take data security seriously and implement industry-standard measures to protect your
                information:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Encryption:</strong> All data transmitted between your device and our servers is encrypted using HTTPS/TLS</li>
                <li><strong>Secure Storage:</strong> Your data is stored in secure, encrypted databases</li>
                <li><strong>Access Control:</strong> Only authorized personnel have access to user data</li>
                <li><strong>Regular Audits:</strong> We conduct regular security audits and vulnerability assessments</li>
                <li><strong>No Password Storage:</strong> We use secure authentication tokens; your password is never stored in plain text</li>
              </ul>
              <p className="leading-relaxed mt-3">
                However, no method of transmission over the Internet or electronic storage is 100% secure. While
                we strive to protect your information, we cannot guarantee absolute security.
              </p>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Your Privacy Rights</h2>
              <p className="leading-relaxed mb-3">
                Under GDPR (European Union) and KVKK (Turkey), you have the following rights:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Right to Access:</strong> Request a copy of all personal data we hold about you</li>
                <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete information</li>
                <li><strong>Right to Erasure ("Right to be Forgotten"):</strong> Request complete deletion of your account and all associated data within 30 days</li>
                <li><strong>Right to Data Portability:</strong> Receive your data in a machine-readable format (JSON)</li>
                <li><strong>Right to Object:</strong> Opt-out of certain data processing activities</li>
                <li><strong>Right to Withdraw Consent:</strong> Withdraw consent for data processing at any time</li>
                <li><strong>Right to Restriction:</strong> Request temporary restriction of data processing</li>
              </ul>
              <p className="leading-relaxed mt-3">
                To exercise any of these rights, please contact us at{' '}
                <a href="mailto:privacy@tomashoca.com" className="text-blue-400 hover:underline">
                  privacy@tomashoca.com
                </a>
                . We will respond to your request within 30 days.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3 mt-6">6.1 How to Delete Your Account</h3>
              <p className="leading-relaxed mb-3">You can delete your account and all associated data by:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Going to Profile → Settings → Delete Account in the app</li>
                <li>Sending an email to <a href="mailto:privacy@tomashoca.com" className="text-blue-400 hover:underline">privacy@tomashoca.com</a> with subject "Account Deletion Request"</li>
              </ul>
              <p className="leading-relaxed mt-2 text-sm text-slate-300">
                Upon deletion, all your personal data will be permanently removed within 30 days,
                except for legally required records (see Section 7).
              </p>
            </section>

            {/* Data Retention */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Data Retention</h2>
              <p className="leading-relaxed">
                We retain your personal information only for as long as necessary to provide you with our
                services and as required by law. If you delete your account, we will permanently delete your
                personal data within 30 days, except for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                <li>Transaction records (retained for 7 years for tax and legal compliance)</li>
                <li>Aggregated, anonymized usage data (used for analytics, cannot identify you)</li>
              </ul>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Children's Privacy</h2>
              <p className="leading-relaxed">
                Tomas English is intended for users aged 13 and older. We do not knowingly collect personal
                information from children under 13. If you are a parent or guardian and believe your child has
                provided us with personal information, please contact us immediately at{' '}
                <a href="mailto:privacy@tomashoca.com" className="text-blue-400 hover:underline">
                  privacy@tomashoca.com
                </a>
                , and we will delete such information.
              </p>
            </section>

            {/* Changes to Privacy Policy */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Changes to This Privacy Policy</h2>
              <p className="leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our practices or legal
                requirements. We will notify you of any material changes by:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                <li>Posting the updated policy in the App</li>
                <li>Sending you an email notification (if you have an account)</li>
                <li>Displaying a prominent notice in the App</li>
              </ul>
              <p className="leading-relaxed mt-3">
                Your continued use of the App after such changes constitutes your acceptance of the updated
                Privacy Policy.
              </p>
            </section>

            {/* Contact Us */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">10. Contact Us</h2>
              <p className="leading-relaxed mb-3">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data
                practices, please contact us:
              </p>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <p className="font-semibold text-white mb-2">Tomas English</p>
                <p>Email: <a href="mailto:privacy@tomashoca.com" className="text-blue-400 hover:underline">privacy@tomashoca.com</a></p>
                <p>Support: <a href="mailto:support@tomashoca.com" className="text-blue-400 hover:underline">support@tomashoca.com</a></p>
                <p>Website: <a href="https://tomashoca.com" className="text-blue-400 hover:underline">tomashoca.com</a></p>
              </div>
            </section>

            {/* Compliance */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">11. Legal Compliance</h2>
              <p className="leading-relaxed">
                This Privacy Policy complies with:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                <li><strong>GDPR:</strong> General Data Protection Regulation (European Union)</li>
                <li><strong>KVKK:</strong> Kişisel Verilerin Korunması Kanunu (Turkey)</li>
                <li><strong>Apple App Store Guidelines:</strong> Section 5.1.1 (Data Collection and Storage)</li>
                <li><strong>Google Play Store Guidelines:</strong> User Data Policy</li>
              </ul>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
