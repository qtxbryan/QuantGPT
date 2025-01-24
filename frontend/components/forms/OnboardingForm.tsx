"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { ProgressSteps } from "@/components/ProgressStep";
import { NavigationButtons } from "@/components/onboarding/NavigationButton";
import FormStep from "../onboarding/FormStep";
import { onboardingSchema, OnboardingFormData } from "@/lib/validation";

// Step titles and descriptions
const steps = [
  { title: "Step 1", description: "Personal Information" },
  { title: "Step 2", description: "Financial Information" },
  { title: "Step 3", description: "Risk Willingness" },
  { title: "Step 4", description: "Risk Capacity" },
];

export function OnboardingForm() {
  const [currentStep, setCurrentStep] = useState(0);

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
  } = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      fullName: "",
      dateOfBirth: "",
      email: "",
      contact: "",
      occupation: "",
      gender: "",
      netWorth: "",
      majorExpenses: [],
      annualEarning: "",
      maritalStatus: "",
      dependents: "",
      investmentGoal: "",
      investmentKnowledge: "",
      riskPerception: "",
      decisionStyle: "",
      initialInvestment: "",
      fluctuationTolerance: "",
      monthlyContribution: "",
      incomeDuration: "",
    },
  });

  const handleNext = async () => {
    const isValid = await trigger();
    if (isValid && currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const onSubmit = async (data: OnboardingFormData) => {
    try {
      const response = await fetch("/api/onboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const result = await response.json();
      console.log("Form submitted successfully:", result);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1638] p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        <div className="space-y-8">
          <ProgressSteps steps={steps} currentStep={currentStep} />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <FormStep
                step={currentStep}
                control={control}
                errors={errors}
                setValue={setValue}
              />
            </motion.div>
          </AnimatePresence>

          <NavigationButtons
            onBack={currentStep > 0 ? handleBack : undefined}
            onNext={
              currentStep < steps.length - 1
                ? handleNext
                : handleSubmit(onSubmit)
            }
            isBackDisabled={currentStep === 0}
            isNextDisabled={false}
          />
        </div>
      </div>
    </div>
  );
}
