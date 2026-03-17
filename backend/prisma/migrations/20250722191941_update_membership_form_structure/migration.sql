-- CreateTable
CREATE TABLE "InsuranceApplication" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "middleName" TEXT,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "streetAddress" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'USA',
    "occupation" TEXT NOT NULL,
    "employer" TEXT,
    "workAddress" TEXT,
    "workPhone" TEXT,
    "annualIncome" DOUBLE PRECISION,
    "beneficiaryName" TEXT NOT NULL,
    "beneficiaryRelationship" TEXT NOT NULL,
    "beneficiaryPhone" TEXT,
    "beneficiaryEmail" TEXT,
    "beneficiaryAddress" TEXT,
    "currentHealth" TEXT,
    "majorIllnesses" TEXT,
    "currentMedications" TEXT,
    "familyMedicalHistory" TEXT,
    "emergencyContactName" TEXT NOT NULL,
    "emergencyContactPhone" TEXT NOT NULL,
    "emergencyContactRelation" TEXT NOT NULL,
    "dependentName" TEXT,
    "dependentDob" TIMESTAMP(3),
    "dependentRelation" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InsuranceApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MembershipApplication" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "fullName" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "gender" TEXT,
    "phoneNumber" TEXT NOT NULL,
    "emailAddress" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "otherExpertiseHobby" TEXT,
    "streetAddress" TEXT NOT NULL,
    "cityStateZipCode" TEXT NOT NULL,
    "numberOfFamilyMembers" TEXT,
    "spousePartnerName" TEXT,
    "childrenNamesAges" TEXT,
    "wantPaidMembership" TEXT,
    "preferredPaymentMethod" TEXT,
    "culturalEvents" BOOLEAN NOT NULL DEFAULT false,
    "networkingOpportunities" BOOLEAN NOT NULL DEFAULT false,
    "volunteerOpportunities" BOOLEAN NOT NULL DEFAULT false,
    "professionalDevelopment" BOOLEAN NOT NULL DEFAULT false,
    "otherInterests" TEXT,
    "eventPlanning" BOOLEAN NOT NULL DEFAULT false,
    "itTechnology" BOOLEAN NOT NULL DEFAULT false,
    "fundraising" BOOLEAN NOT NULL DEFAULT false,
    "otherSkills" TEXT,
    "howDidYouHear" TEXT,
    "comments" TEXT,
    "consentToStore" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MembershipApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CombinedOrder" (
    "id" SERIAL NOT NULL,
    "userEmail" TEXT NOT NULL,
    "membershipType" TEXT,
    "membershipPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "insuranceType" TEXT,
    "insurancePrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "membershipCompleted" BOOLEAN NOT NULL DEFAULT false,
    "insuranceCompleted" BOOLEAN NOT NULL DEFAULT false,
    "stripeSessionId" TEXT,
    "paymentStatus" TEXT,
    "membershipApplicationId" INTEGER,
    "insuranceApplicationId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CombinedOrder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InsuranceApplication_orderId_key" ON "InsuranceApplication"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "MembershipApplication_orderId_key" ON "MembershipApplication"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "CombinedOrder_membershipApplicationId_key" ON "CombinedOrder"("membershipApplicationId");

-- CreateIndex
CREATE UNIQUE INDEX "CombinedOrder_insuranceApplicationId_key" ON "CombinedOrder"("insuranceApplicationId");

-- AddForeignKey
ALTER TABLE "InsuranceApplication" ADD CONSTRAINT "InsuranceApplication_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "CombinedOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MembershipApplication" ADD CONSTRAINT "MembershipApplication_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "CombinedOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
