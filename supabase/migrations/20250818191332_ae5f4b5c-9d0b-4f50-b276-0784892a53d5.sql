-- Fix security issue: Restrict profile access to owner only
DROP POLICY "Profiles are viewable by everyone" ON public.profiles;

-- Create secure policy that only allows users to view their own profile
CREATE POLICY "Users can view their own profile only" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);