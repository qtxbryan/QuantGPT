"use client";

import { Controller } from "react-hook-form";
import { FormField } from "./FormField";
import { MultiSelect } from "./MultiSelect";
import { ChoiceField } from "./ChoiceField";

import React from "react";
import { FormStepProps } from "./FormStep.types";
import {
  DECISION_STYLE,
  FLUCTUATION_TOLERANCE,
  INCOME_DURATION,
  INITIAL_INVESTMENT,
  INVESTMENT_GOALS,
  INVESTMENT_KNOWLEDGE,
  MAJOR_EXPENSES_OPTIONS,
  MARITAL_STATUS_OPTIONS,
  MONTHLY_CONTRI,
  RISK_PERCEPTION,
} from "@/constants";

const FormStep = ({ step, control, errors, setValue }: FormStepProps) => {
  switch (step) {
    case 0:
      return (
        <>
          {/* Personal Infomration */}
          <Controller
            name="fullName"
            control={control}
            render={({ field }) => (
              <FormField
                label="What is your full name?"
                placeholder="Full Name"
                value={field.value}
                onChange={field.onChange}
                error={errors.fullName?.message}
                required
              />
            )}
          />

          <Controller
            name="dateOfBirth"
            control={control}
            render={({ field }) => (
              <FormField
                label="What's your date of birth?"
                type="date"
                value={field.value}
                onChange={field.onChange}
                error={errors.dateOfBirth?.message}
                required
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <FormField
                label="What's your email address?"
                type="email"
                placeholder="Email"
                value={field.value}
                onChange={field.onChange}
                error={errors.email?.message}
                required
              />
            )}
          />

          <Controller
            name="contact"
            control={control}
            render={({ field }) => (
              <FormField
                label="What's your contact number?"
                type="tel"
                placeholder="Contact Number"
                value={field.value}
                onChange={field.onChange}
                error={errors.contact?.message}
                required
              />
            )}
          />

          <Controller
            name="occupation"
            control={control}
            render={({ field }) => (
              <FormField
                label="What's your occupation?"
                placeholder="Occupation"
                value={field.value}
                onChange={field.onChange}
                error={errors.occupation?.message}
                required
              />
            )}
          />

          <div className="space-y-2 mb-6">
            <label className="text-lg font-medium text-white">
              What is your gender?
            </label>
            <div className="grid grid-cols-2 gap-4">
              {["Male", "Female"].map((gender) => (
                <button
                  key={gender}
                  type="button"
                  onClick={() => setValue("gender", gender)}
                  className={`p-3 rounded-xl border ${
                    control._formValues.gender === gender
                      ? "bg-[#394d9b] border-[#7dd1e7] text-white"
                      : "bg-[#1a2040] border-[#394d9b] text-[#7dd1e7]"
                  } transition-colors`}
                >
                  {gender}
                </button>
              ))}
            </div>
            {errors.gender?.message && (
              <p className="text-red-400 text-sm">{errors.gender.message}</p>
            )}
          </div>
        </>
      );

    case 1:
      return (
        <>
          {/* Step 2: Financial Information */}
          <Controller
            name="netWorth"
            control={control}
            render={({ field }) => (
              <FormField
                label="What's your total net worth?"
                type="number"
                placeholder="Net Worth"
                value={field.value}
                onChange={field.onChange}
                error={errors.netWorth?.message}
                required
              />
            )}
          />
          <Controller
            name="majorExpenses"
            control={control}
            render={({ field }) => (
              <MultiSelect
                label="What are your major expenses?"
                options={MAJOR_EXPENSES_OPTIONS}
                value={field.value}
                onChange={field.onChange}
                placeholder="Select major expenses"
                error={errors.majorExpenses?.message}
              />
            )}
          />
          <Controller
            name="annualEarning"
            control={control}
            render={({ field }) => (
              <FormField
                label="What's your annual earning capacity?"
                type="number"
                placeholder="Annual Earning"
                value={field.value}
                onChange={field.onChange}
                error={errors.annualEarning?.message}
                required
              />
            )}
          />
          <Controller
            name="maritalStatus"
            control={control}
            render={({ field }) => (
              <ChoiceField
                label="What's your marital status?"
                choices={MARITAL_STATUS_OPTIONS}
                value={field.value}
                onChange={field.onChange}
                error={errors.maritalStatus?.message}
              />
            )}
          />
          <Controller
            name="dependents"
            control={control}
            render={({ field }) => (
              <FormField
                label="Number of dependents"
                type="number"
                placeholder="Number of dependents"
                value={field.value}
                onChange={field.onChange}
                error={errors.dependents?.message}
                required
              />
            )}
          />
        </>
      );
    case 2:
      return (
        <>
          {/* Step 3: Risk Willingness */}
          <Controller
            name="investmentGoal"
            control={control}
            render={({ field }) => (
              <ChoiceField
                label="What is your goal for this account?"
                choices={INVESTMENT_GOALS}
                value={field.value}
                onChange={field.onChange}
                error={errors.investmentGoal?.message}
              />
            )}
          />
          <Controller
            name="investmentKnowledge"
            control={control}
            render={({ field }) => (
              <ChoiceField
                label="What is your understanding of stocks, bonds, and ETFs?"
                choices={INVESTMENT_KNOWLEDGE}
                value={field.value}
                onChange={field.onChange}
                error={errors.investmentKnowledge?.message}
              />
            )}
          />
          <Controller
            name="riskPerception"
            control={control}
            render={({ field }) => (
              <ChoiceField
                label="When you hear 'risk' related to your finances, what comes to mind?"
                choices={RISK_PERCEPTION}
                value={field.value}
                onChange={field.onChange}
                error={errors.riskPerception?.message}
              />
            )}
          />
          <Controller
            name="decisionStyle"
            control={control}
            render={({ field }) => (
              <ChoiceField
                label="How would you describe your approach to making financial decisions?"
                choices={DECISION_STYLE}
                value={field.value}
                onChange={field.onChange}
                error={errors.decisionStyle?.message}
              />
            )}
          />
        </>
      );

    case 3:
      return (
        <>
          {/* Step 4: Risk Capacity */}
          <Controller
            name="initialInvestment"
            control={control}
            render={({ field }) => (
              <ChoiceField
                label="How much do you want to invest to get started?"
                choices={INITIAL_INVESTMENT}
                value={field.value}
                onChange={field.onChange}
                error={errors.initialInvestment?.message}
              />
            )}
          />
          <Controller
            name="fluctuationTolerance"
            control={control}
            render={({ field }) => (
              <ChoiceField
                label="How much investment value fluctuation would you be comfortable with?"
                choices={FLUCTUATION_TOLERANCE}
                value={field.value}
                onChange={field.onChange}
                error={errors.fluctuationTolerance?.message}
              />
            )}
          />
          <Controller
            name="monthlyContribution"
            control={control}
            render={({ field }) => (
              <ChoiceField
                label="How much do you want to contribute each month?"
                choices={MONTHLY_CONTRI}
                value={field.value}
                onChange={field.onChange}
                error={errors.monthlyContribution?.message}
              />
            )}
          />
          <Controller
            name="incomeDuration"
            control={control}
            render={({ field }) => (
              <ChoiceField
                label="How long do you need the income to last?"
                choices={INCOME_DURATION}
                value={field.value}
                onChange={field.onChange}
                error={errors.incomeDuration?.message}
              />
            )}
          />
        </>
      );

    default:
      return null;
  }
};

export default FormStep;
