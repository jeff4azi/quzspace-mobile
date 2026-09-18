import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserPlan = 'free' | 'premium';

interface PlanContextType {
  userPlan: UserPlan;
  setUserPlan: (plan: UserPlan) => void;
  togglePlan: () => void;
  isFree: boolean;
  isPremium: boolean;
  maxQuizzesLimit: number;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [userPlan, setUserPlan] = useState<UserPlan>('free');

  const togglePlan = () => {
    setUserPlan((prev) => (prev === 'free' ? 'premium' : 'free'));
  };

  const isFree = userPlan === 'free';
  const isPremium = userPlan === 'premium';

  // Max quizzes per study space: 2 for Free plan, 5 for Pro/Premium plan
  const maxQuizzesLimit = isFree ? 2 : 5;

  return (
    <PlanContext.Provider
      value={{
        userPlan,
        setUserPlan,
        togglePlan,
        isFree,
        isPremium,
        maxQuizzesLimit,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error('usePlan must be used within a PlanProvider');
  }
  return context;
}
