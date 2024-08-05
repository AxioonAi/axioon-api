-- CreateTable
CREATE TABLE "ElectoralHistory" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "marital_status" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "school_level" TEXT NOT NULL,
    "ocupation" TEXT NOT NULL,
    "birth_date" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "color_race" TEXT NOT NULL,
    "ballot_name" TEXT NOT NULL,
    "ballot_number" TEXT NOT NULL,
    "election_type" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "has_elected" BOOLEAN NOT NULL,
    "coalition" TEXT NOT NULL,
    "coalition_composition" TEXT NOT NULL,
    "details_url" TEXT NOT NULL,
    "photo_url" TEXT NOT NULL,
    "ballot_local" TEXT NOT NULL,
    "ballot_state" TEXT NOT NULL,
    "political_group" TEXT NOT NULL,
    "political_group_number" TEXT NOT NULL,
    "campagn_total_spend" DOUBLE PRECISION NOT NULL,
    "first_round_total_spend" DOUBLE PRECISION NOT NULL,
    "second_round_total_spend" DOUBLE PRECISION NOT NULL,
    "toal_declared_assets" DOUBLE PRECISION NOT NULL,
    "politician_profile_id" TEXT NOT NULL,
    "ellection_year" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ElectoralHistoryAsset" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "electoral_History_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ElectoralHistoryConsolidatedRevenueValues" (
    "id" TEXT NOT NULL,
    "total_received_resources" DOUBLE PRECISION NOT NULL,
    "total_financial_resources" DOUBLE PRECISION NOT NULL,
    "total_estimated_resources" DOUBLE PRECISION NOT NULL,
    "total_donation_by_people" DOUBLE PRECISION NOT NULL,
    "total_donation_by_companies" DOUBLE PRECISION NOT NULL,
    "total_donation_by_parties" DOUBLE PRECISION NOT NULL,
    "total_donation_by_internet" DOUBLE PRECISION NOT NULL,
    "total_donation_ronis" DOUBLE PRECISION NOT NULL,
    "total_own_resources" DOUBLE PRECISION NOT NULL,
    "total_crowdfunding" DOUBLE PRECISION NOT NULL,
    "electoral_History_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ElectoralHistoryConsolidatedExpensesValues" (
    "id" TEXT NOT NULL,
    "expenses_threshold" DOUBLE PRECISION NOT NULL,
    "total_expenses_contracted" DOUBLE PRECISION NOT NULL,
    "total_expenses_paid" DOUBLE PRECISION NOT NULL,
    "donations_to_other_candidates" DOUBLE PRECISION NOT NULL,
    "party_funds_expenses" DOUBLE PRECISION NOT NULL,
    "special_funds_expenses" DOUBLE PRECISION NOT NULL,
    "other_resources_expenses" DOUBLE PRECISION NOT NULL,
    "financial_expenses" DOUBLE PRECISION NOT NULL,
    "estimated_expenses" DOUBLE PRECISION NOT NULL,
    "electoral_History_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ElectoralHistoryAggregatedExpensesList" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "number_of_times" TEXT NOT NULL,
    "total_value" DOUBLE PRECISION NOT NULL,
    "electoral_History_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ElectoralHistoryProvidersRanking" (
    "id" TEXT NOT NULL,
    "doc_number" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "number_of_donations" TEXT NOT NULL,
    "total_value" DOUBLE PRECISION NOT NULL,
    "electoral_History_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ElectoralHistoryDonorsRanking" (
    "id" TEXT NOT NULL,
    "doc_number" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "number_of_donations" TEXT NOT NULL,
    "total_value" DOUBLE PRECISION NOT NULL,
    "electoral_History_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ElectoralHistoryRepresentatives" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "registration_number" TEXT NOT NULL,
    "begin_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "electoral_History_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ElectoralHistoryDetailedExpensesList" (
    "id" TEXT NOT NULL,
    "provider_name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "resource_type" TEXT NOT NULL,
    "expense_type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "document_number" TEXT NOT NULL,
    "contractor_benefited" TEXT NOT NULL,
    "electoral_History_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ElectoralHistoryDetailedRevenuesList" (
    "id" TEXT NOT NULL,
    "donator_doc_number" TEXT NOT NULL,
    "donator_name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "resource_type" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "document_number" TEXT NOT NULL,
    "electoral_History_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ElectoralHistory_id_key" ON "ElectoralHistory"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ElectoralHistoryAsset_id_key" ON "ElectoralHistoryAsset"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ElectoralHistoryConsolidatedRevenueValues_id_key" ON "ElectoralHistoryConsolidatedRevenueValues"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ElectoralHistoryConsolidatedExpensesValues_id_key" ON "ElectoralHistoryConsolidatedExpensesValues"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ElectoralHistoryAggregatedExpensesList_id_key" ON "ElectoralHistoryAggregatedExpensesList"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ElectoralHistoryProvidersRanking_id_key" ON "ElectoralHistoryProvidersRanking"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ElectoralHistoryDonorsRanking_id_key" ON "ElectoralHistoryDonorsRanking"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ElectoralHistoryRepresentatives_id_key" ON "ElectoralHistoryRepresentatives"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ElectoralHistoryDetailedExpensesList_id_key" ON "ElectoralHistoryDetailedExpensesList"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ElectoralHistoryDetailedRevenuesList_id_key" ON "ElectoralHistoryDetailedRevenuesList"("id");

-- AddForeignKey
ALTER TABLE "ElectoralHistory" ADD CONSTRAINT "ElectoralHistory_politician_profile_id_fkey" FOREIGN KEY ("politician_profile_id") REFERENCES "PoliticianProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ElectoralHistoryAsset" ADD CONSTRAINT "ElectoralHistoryAsset_electoral_History_id_fkey" FOREIGN KEY ("electoral_History_id") REFERENCES "ElectoralHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ElectoralHistoryConsolidatedRevenueValues" ADD CONSTRAINT "ElectoralHistoryConsolidatedRevenueValues_electoral_Histor_fkey" FOREIGN KEY ("electoral_History_id") REFERENCES "ElectoralHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ElectoralHistoryConsolidatedExpensesValues" ADD CONSTRAINT "ElectoralHistoryConsolidatedExpensesValues_electoral_Histo_fkey" FOREIGN KEY ("electoral_History_id") REFERENCES "ElectoralHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ElectoralHistoryAggregatedExpensesList" ADD CONSTRAINT "ElectoralHistoryAggregatedExpensesList_electoral_History_i_fkey" FOREIGN KEY ("electoral_History_id") REFERENCES "ElectoralHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ElectoralHistoryProvidersRanking" ADD CONSTRAINT "ElectoralHistoryProvidersRanking_electoral_History_id_fkey" FOREIGN KEY ("electoral_History_id") REFERENCES "ElectoralHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ElectoralHistoryDonorsRanking" ADD CONSTRAINT "ElectoralHistoryDonorsRanking_electoral_History_id_fkey" FOREIGN KEY ("electoral_History_id") REFERENCES "ElectoralHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ElectoralHistoryRepresentatives" ADD CONSTRAINT "ElectoralHistoryRepresentatives_electoral_History_id_fkey" FOREIGN KEY ("electoral_History_id") REFERENCES "ElectoralHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ElectoralHistoryDetailedExpensesList" ADD CONSTRAINT "ElectoralHistoryDetailedExpensesList_electoral_History_id_fkey" FOREIGN KEY ("electoral_History_id") REFERENCES "ElectoralHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ElectoralHistoryDetailedRevenuesList" ADD CONSTRAINT "ElectoralHistoryDetailedRevenuesList_electoral_History_id_fkey" FOREIGN KEY ("electoral_History_id") REFERENCES "ElectoralHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
