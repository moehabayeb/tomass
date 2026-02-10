/**
 * Pricing Page
 * Displays 3-tier subscription plans with upgrade/downgrade options
 * Supports native billing on iOS (StoreKit) and Android (Google Play)
 */

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Check, Crown, Zap, ArrowLeft, Sparkles, Star, Shield, FileText, Bell, Clock, Loader2, RefreshCw, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useSubscription } from '@/hooks/useSubscription';
import { useBilling } from '@/hooks/useBilling';
import { useAuthReady } from '@/hooks/useAuthReady';
import { PRICING_CONFIG, type TierCode } from '@/types/subscription';
import { useToast } from '@/hooks/use-toast';
import { detectPlatform, isMobile } from '@/lib/platform';
import { WaitlistModal } from '@/components/WaitlistModal';

export default function Pricing() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, user } = useAuthReady();
  const { currentTier, isOnTrial, trialDaysRemaining, isLoading, isSubscribed } = useSubscription();
  const {
    isAvailable: billingAvailable,
    isPurchasing,
    isRestoring,
    isLoadingProducts,
    products,
    purchaseTier,
    restorePurchases,
    openSubscriptionManagement,
    getProductForTier,
  } = useBilling();

  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly'>('monthly');
  const [waitlistModalOpen, setWaitlistModalOpen] = useState(false);
  const [selectedTierForWaitlist, setSelectedTierForWaitlist] = useState<TierCode>('ai_only');

  const platform = detectPlatform();
  const isOnMobile = isMobile();
  const isIOS = platform === 'ios';
  const isAndroid = platform === 'android';
  const isNative = isIOS || isAndroid;

  // On native platforms (iOS/Android), check if we can actually purchase
  const canPurchaseNative = isNative && billingAvailable && products.length > 0;

  const handleSelectPlan = async (tierCode: TierCode) => {
    // Free tier - navigate to start using app
    if (tierCode === 'free') {
      if (currentTier === 'free') {
        toast({
          title: 'Already on Free Plan',
          description: 'You are currently using the free plan.',
        });
      } else {
        navigate('/');
      }
      return;
    }

    // Already subscribed to this tier
    if (tierCode === currentTier) {
      toast({
        title: 'Already Subscribed',
        description: `You are already subscribed to the ${PRICING_CONFIG[tierCode].name}.`,
      });
      return;
    }

    // Must be authenticated to purchase
    if (!isAuthenticated) {
      toast({
        title: 'Sign In Required',
        description: 'Please sign in to subscribe.',
      });
      navigate('/auth');
      return;
    }

    // Native (iOS/Android) with billing available - initiate purchase
    if (canPurchaseNative) {
      const result = await purchaseTier(tierCode, billingCycle);
      if (result.success) {
        // Success toast handled by useBilling hook
        navigate('/');
      }
      // Error toast handled by useBilling hook
      return;
    }

    // Web or billing unavailable - open waitlist modal
    setSelectedTierForWaitlist(tierCode);
    setWaitlistModalOpen(true);
  };

  const handleRestorePurchases = async () => {
    await restorePurchases();
  };

  const handleManageSubscription = async () => {
    await openSubscriptionManagement();
  };

  const getTierIcon = (tierCode: TierCode) => {
    switch (tierCode) {
      case 'free':
        return <Sparkles className="w-6 h-6" />;
      case 'ai_only':
        return <Zap className="w-6 h-6" />;
      case 'ai_plus_live':
        return <Crown className="w-6 h-6" />;
    }
  };

  const getTierGradient = (tierCode: TierCode) => {
    switch (tierCode) {
      case 'free':
        return 'from-slate-500 to-slate-700';
      case 'ai_only':
        return 'from-blue-500 to-cyan-500';
      case 'ai_plus_live':
        return 'from-purple-500 via-pink-500 to-orange-500';
    }
  };

  const getButtonText = (tierCode: TierCode, isCurrentTier: boolean) => {
    if (isCurrentTier) {
      return 'Current Plan';
    }

    if (tierCode === 'free') {
      return 'Start Free';
    }

    // Check if purchase is in progress for this tier
    if (isPurchasing) {
      return (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Processing...
        </>
      );
    }

    // Native with billing - show Subscribe button
    if (canPurchaseNative) {
      const product = getProductForTier(tierCode, billingCycle);
      if (product) {
        return `Subscribe - ${product.price}`;
      }
      return 'Subscribe Now';
    }

    // Web or billing unavailable - show waitlist
    return (
      <>
        <Bell className="w-4 h-4 mr-2" />
        Join Waitlist
      </>
    );
  };

  const renderPricingCard = (tierCode: TierCode) => {
    const config = PRICING_CONFIG[tierCode];
    const isCurrentTier = currentTier === tierCode;
    const isPopular = config.isPopular;

    // Get price from Google Play products if available, otherwise use config
    const product = canPurchaseNative ? getProductForTier(tierCode, billingCycle) : null;

    const displayPrice = product
      ? product.price.replace(/[^\d.,]/g, '') // Extract number from formatted price
      : billingCycle === 'monthly' ? config.monthlyPrice : config.quarterlyMonthlyEquivalent;
    const totalPrice = billingCycle === 'monthly' ? config.monthlyPrice : config.quarterlyPrice;
    const savings = billingCycle === 'quarterly' ? config.savings : 0;

    return (
      <Card
        key={tierCode}
        className={`relative overflow-hidden transition-all duration-300 ${
          isPopular ? 'border-2 border-primary shadow-2xl scale-105' : 'border'
        } ${isCurrentTier ? 'ring-2 ring-green-500' : ''}`}
      >
        {isPopular && (
          <div className="absolute top-0 right-0">
            <Badge className="rounded-tl-none rounded-br-none bg-gradient-to-r from-purple-500 to-pink-500">
              <Star className="w-3 h-3 mr-1" />
              Most Popular
            </Badge>
          </div>
        )}

        {isCurrentTier && (
          <div className="absolute top-0 left-0">
            <Badge variant="outline" className="rounded-tr-none rounded-bl-none bg-green-500 text-white border-green-600">
              <Check className="w-3 h-3 mr-1" />
              Current Plan
            </Badge>
          </div>
        )}

        <CardHeader className="text-center pb-4">
          <div className={`mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-r ${getTierGradient(tierCode)} flex items-center justify-center text-white`}>
            {getTierIcon(tierCode)}
          </div>

          <CardTitle className="text-2xl font-bold">{config.name}</CardTitle>

          <div className="mt-4">
            {tierCode === 'free' ? (
              <div>
                <p className="text-4xl font-extrabold">Free</p>
                <p className="text-sm text-muted-foreground mt-1">7-day trial included</p>
              </div>
            ) : (
              <div>
                <div className="flex items-baseline justify-center gap-1">
                  {product ? (
                    <span className="text-4xl font-extrabold">{product.price}</span>
                  ) : (
                    <>
                      <span className="text-4xl font-extrabold">₺{displayPrice}</span>
                      <span className="text-muted-foreground">/month</span>
                    </>
                  )}
                </div>

                {billingCycle === 'quarterly' && !product && (
                  <div className="mt-2">
                    <p className="text-sm text-muted-foreground">
                      Billed ₺{totalPrice} every 3 months
                    </p>
                    <Badge variant="secondary" className="mt-1 bg-green-100 text-green-700">
                      Save ₺{savings}
                    </Badge>
                  </div>
                )}

                {billingCycle === 'quarterly' && product && (
                  <div className="mt-2">
                    <Badge variant="secondary" className="mt-1 bg-green-100 text-green-700">
                      Save 20%
                    </Badge>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent>
          <ul className="space-y-3">
            {config.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>

        <CardFooter>
          <Button
            className="w-full"
            variant={isPopular ? 'default' : 'outline'}
            size="lg"
            disabled={isCurrentTier || isLoading || isPurchasing || isLoadingProducts}
            onClick={() => handleSelectPlan(tierCode)}
          >
            {getButtonText(tierCode, isCurrentTier)}
          </Button>
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-indigo-950 text-white">
      {/* Header */}
      <div className="container mx-auto px-4 pt-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6 text-white hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to App
        </Button>

        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300">
            Choose Your Learning Plan
          </h1>
          <p className="text-xl text-slate-300">
            Start with a 7-day free trial and unlock unlimited AI-powered English practice
          </p>

          {isOnTrial && trialDaysRemaining !== null && (
            <Badge className="mt-4 px-4 py-2 text-base bg-gradient-to-r from-green-400 to-emerald-400 text-white">
              <Sparkles className="w-4 h-4 mr-2" />
              {trialDaysRemaining} days left in your free trial
            </Badge>
          )}
        </div>

        {/* Coming Soon Banner - Only show for web or when billing unavailable */}
        {!canPurchaseNative && (
          <Alert className="max-w-2xl mx-auto mb-8 bg-amber-500/10 border-amber-500/50">
            <Clock className="h-4 w-4 text-amber-400" />
            <AlertTitle className="text-white">
              {isNative ? 'Connecting to Store...' : 'Premium Subscriptions Coming Soon'}
            </AlertTitle>
            <AlertDescription className="text-slate-300">
              {isNative && !billingAvailable
                ? 'Please update the app to enable purchases.'
                : !isOnMobile
                  ? 'Download our mobile app to purchase subscriptions.'
                  : 'Premium plans are currently in development. Join our waitlist to be notified when they launch and receive an exclusive early-bird discount!'
              }
            </AlertDescription>
          </Alert>
        )}

        {/* Subscription Management for existing subscribers */}
        {isNative && isSubscribed && currentTier !== 'free' && (
          <div className="max-w-2xl mx-auto mb-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="outline"
              onClick={handleManageSubscription}
              className="bg-white/10 border-white/20 hover:bg-white/20"
            >
              <Settings className="w-4 h-4 mr-2" />
              Manage Subscription
            </Button>
          </div>
        )}

        {/* Restore Purchases button for native platforms */}
        {isNative && billingAvailable && (
          <div className="max-w-2xl mx-auto mb-8 flex justify-center">
            <Button
              variant="ghost"
              onClick={handleRestorePurchases}
              disabled={isRestoring}
              className="text-slate-300 hover:text-white hover:bg-white/10"
            >
              {isRestoring ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4 mr-2" />
              )}
              Restore Purchases
            </Button>
          </div>
        )}

        {/* Billing Cycle Toggle */}
        <div className="flex justify-center mb-12">
          <Tabs value={billingCycle} onValueChange={(v) => setBillingCycle(v as 'monthly' | 'quarterly')} className="w-auto">
            <TabsList className="bg-white/10 backdrop-blur-sm">
              <TabsTrigger value="monthly" className="data-[state=active]:bg-white data-[state=active]:text-indigo-900">
                Monthly
              </TabsTrigger>
              <TabsTrigger value="quarterly" className="data-[state=active]:bg-white data-[state=active]:text-indigo-900">
                Quarterly
                <Badge className="ml-2 bg-green-500 text-white text-xs">Save 20%</Badge>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="container mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {renderPricingCard('free')}
          {renderPricingCard('ai_only')}
          {renderPricingCard('ai_plus_live')}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>

          <div className="space-y-4">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg text-white">Can I cancel anytime?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300">
                  Yes! You can cancel your subscription at any time. Your access will continue until the end of your current billing period.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg text-white">What payment methods do you accept?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300">
                  Payments are securely processed through {isIOS ? 'Apple App Store' : isAndroid ? 'Google Play Store' : 'your device\'s app store'}.
                  All payment methods supported by your app store account are accepted, including credit/debit cards and store credit.
                  Turkish Lira (₺) pricing is displayed for your convenience.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg text-white">How do live lessons work?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300">
                  With the AI + Live Lessons plan, you get 16 live classes per month (4 per week). Attend 4 weekly classes at scheduled times via Zoom.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg text-white">Can I upgrade or downgrade my plan?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300">
                  Yes! You can upgrade or downgrade at any time. Changes take effect at the start of your next billing cycle.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg text-white flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Legal Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-slate-300">
                    Please review our legal documents before subscribing:
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      to="/privacy"
                      className="flex items-center gap-2 px-4 py-3 bg-blue-500/10 border border-blue-500/30 rounded-lg hover:bg-blue-500/20 transition-colors"
                    >
                      <Shield className="w-5 h-5 text-blue-400" />
                      <span className="text-white font-medium">Privacy Policy</span>
                    </Link>
                    <Link
                      to="/terms"
                      className="flex items-center gap-2 px-4 py-3 bg-purple-500/10 border border-purple-500/30 rounded-lg hover:bg-purple-500/20 transition-colors"
                    >
                      <FileText className="w-5 h-5 text-purple-400" />
                      <span className="text-white font-medium">Terms of Service</span>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Waitlist Modal */}
      <WaitlistModal
        isOpen={waitlistModalOpen}
        onClose={() => setWaitlistModalOpen(false)}
        tierCode={selectedTierForWaitlist}
        userEmail={user?.email}
      />
    </div>
  );
}
