/*
  Warnings:

  - You are about to drop the column `annualIncome` on the `InsuranceApplication` table. All the data in the column will be lost.
  - You are about to drop the column `beneficiaryAddress` on the `InsuranceApplication` table. All the data in the column will be lost.
  - You are about to drop the column `beneficiaryEmail` on the `InsuranceApplication` table. All the data in the column will be lost.
  - You are about to drop the column `beneficiaryName` on the `InsuranceApplication` table. All the data in the column will be lost.
  - You are about to drop the column `beneficiaryPhone` on the `InsuranceApplication` table. All the data in the column will be lost.
  - You are about to drop the column `beneficiaryRelationship` on the `InsuranceApplication` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `InsuranceApplication` table. All the data in the column will be lost.
  - You are about to drop the column `currentHealth` on the `InsuranceApplication` table. All the data in the column will be lost.
  - You are about to drop the column `currentMedications` on the `InsuranceApplication` table. All the data in the column will be lost.
  - You are about to drop the column `dependentDob` on the `InsuranceApplication` table. All the data in the column will be lost.
  - You are about to drop the column `dependentName` on the `InsuranceApplication` table. All the data in the column will be lost.
  - You are about to drop the column `dependentRelation` on the `InsuranceApplication` table. All the data in the column will be lost.
  - You are about to drop the column `emergencyContactName` on the `InsuranceApplication` table. All the data in the column will be lost.
  - You are about to drop the column `emergencyContactPhone` on the `InsuranceApplication` table. All the data in the column will be lost.
  - You are about to drop the column `emergencyContactRelation` on the `InsuranceApplication` table. All the data in the column will be lost.
  - You are about to drop the column `employer` on the `InsuranceApplication` table. All the data in the column will be lost.
  - You are about to drop the column `familyMedicalHistory` on the `InsuranceApplication` table. All the data in the column will be lost.
  - You are about to drop the column `majorIllnesses` on the `InsuranceApplication` table. All the data in the column will be lost.
  - You are about to drop the column `middleName` on the `InsuranceApplication` table. All the data in the column will be lost.
  - You are about to drop the column `occupation` on the `InsuranceApplication` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `InsuranceApplication` table. All the data in the column will be lost.
  - You are about to drop the column `workAddress` on the `InsuranceApplication` table. All the data in the column will be lost.
  - You are about to drop the column `workPhone` on the `InsuranceApplication` table. All the data in the column will be lost.
  - Added the required column `coverageAmount` to the `InsuranceApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `InsuranceApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `primaryPhone` to the `InsuranceApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `signatureDate` to the `InsuranceApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `socialSecurity` to the `InsuranceApplication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InsuranceApplication" DROP COLUMN "annualIncome",
DROP COLUMN "beneficiaryAddress",
DROP COLUMN "beneficiaryEmail",
DROP COLUMN "beneficiaryName",
DROP COLUMN "beneficiaryPhone",
DROP COLUMN "beneficiaryRelationship",
DROP COLUMN "country",
DROP COLUMN "currentHealth",
DROP COLUMN "currentMedications",
DROP COLUMN "dependentDob",
DROP COLUMN "dependentName",
DROP COLUMN "dependentRelation",
DROP COLUMN "emergencyContactName",
DROP COLUMN "emergencyContactPhone",
DROP COLUMN "emergencyContactRelation",
DROP COLUMN "employer",
DROP COLUMN "familyMedicalHistory",
DROP COLUMN "majorIllnesses",
DROP COLUMN "middleName",
DROP COLUMN "occupation",
DROP COLUMN "phone",
DROP COLUMN "workAddress",
DROP COLUMN "workPhone",
ADD COLUMN     "aptUnit" TEXT,
ADD COLUMN     "contingent2BeneficiaryAddress" TEXT,
ADD COLUMN     "contingent2BeneficiaryDOB" TIMESTAMP(3),
ADD COLUMN     "contingent2BeneficiaryName" TEXT,
ADD COLUMN     "contingent2BeneficiaryPercentage" TEXT,
ADD COLUMN     "contingent2BeneficiaryPhone" TEXT,
ADD COLUMN     "contingent2BeneficiaryRelationship" TEXT,
ADD COLUMN     "contingent2BeneficiarySSN" TEXT,
ADD COLUMN     "contingentBeneficiaryAddress" TEXT,
ADD COLUMN     "contingentBeneficiaryDOB" TIMESTAMP(3),
ADD COLUMN     "contingentBeneficiaryName" TEXT,
ADD COLUMN     "contingentBeneficiaryPercentage" TEXT,
ADD COLUMN     "contingentBeneficiaryPhone" TEXT,
ADD COLUMN     "contingentBeneficiaryRelationship" TEXT,
ADD COLUMN     "contingentBeneficiarySSN" TEXT,
ADD COLUMN     "coverageAmount" TEXT NOT NULL,
ADD COLUMN     "dependents" JSONB,
ADD COLUMN     "enrollChildrenCoverage" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "hasExistingPolicy" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "middleInitial" TEXT,
ADD COLUMN     "primaryBeneficiaryAddress" TEXT,
ADD COLUMN     "primaryBeneficiaryDOB" TIMESTAMP(3),
ADD COLUMN     "primaryBeneficiaryName" TEXT,
ADD COLUMN     "primaryBeneficiaryPercentage" TEXT,
ADD COLUMN     "primaryBeneficiaryPhone" TEXT,
ADD COLUMN     "primaryBeneficiaryRelationship" TEXT,
ADD COLUMN     "primaryBeneficiarySSN" TEXT,
ADD COLUMN     "primaryPhone" TEXT NOT NULL,
ADD COLUMN     "secondaryPhone" TEXT,
ADD COLUMN     "signatureDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "socialSecurity" TEXT NOT NULL;
