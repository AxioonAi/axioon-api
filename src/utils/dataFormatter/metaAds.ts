export const metaAdsFormatter = (data: any) => {
	const formattedData = [];

	for (const item of data) {
		const deliveryRegion = [];
		const demographicDistribution = [];

		for (const delivery of item.deliveryByRegion) {
			deliveryRegion.push({
				region: delivery.region,
				percentage: delivery.percentage,
			});
		}

		const totalByGender = item.demographicDistribution.reduce((acc, item) => {
			const percentage = parseFloat(item.percentage);
			if (!acc[item.gender]) {
				acc[item.gender] = 0;
			}
			acc[item.gender] += percentage;
			return acc;
		}, {});

		console.log("chegou");

		// Mapeando faixas etárias para os ranges especificados
		const mapAgeToRange = (age) => {
			if (age === "65+") return "60+";
			const ageNumber = parseInt(age.split("-")[0]);
			if (ageNumber < 20) return "0-19";
			if (ageNumber < 30) return "20-29";
			if (ageNumber < 40) return "30-39";
			if (ageNumber < 50) return "40-49";
			if (ageNumber < 60) return "50-59";
			return "60+";
		};

		const initialAgeRangeStructure = {
			"0-19": { male: 0, female: 0 },
			"20-29": { male: 0, female: 0 },
			"30-39": { male: 0, female: 0 },
			"40-49": { male: 0, female: 0 },
			"50-59": { male: 0, female: 0 },
			"60+": { male: 0, female: 0 },
		};

		// Calculando a porcentagem total por faixa etária
		const totalByAgeRange = item.demographicDistribution.reduce((acc, item) => {
			const ageRange = mapAgeToRange(item.age);
			const gender = item.gender;
			const percentage = parseFloat(item.percentage);

			// Verifica se o gênero é masculino ou feminino para acumular a porcentagem
			if (gender === "male" || gender === "female") {
				acc[ageRange][gender] += percentage;
			}

			return acc;
		}, initialAgeRangeStructure);

		const impressions =
			(Number(item.impressions_lower_bound) +
				Number(item.impressions_upper_bound)) /
			2;

		formattedData.push({
			id: item.id,
			bylines: item.bylines,
			currency: item.currency,
			spend:
				(Number(item.spend_lower_bound) + Number(item.spend_upper_bound)) / 2,
			start_date: item.ad_delivery_start_time,
			end_date: item.ad_delivery_stop_time,
			status: item.status,
			impressions,
			deliveryRegion,
			totalByAgeRange: [
				{
					name: "0-19",
					value:
						(totalByAgeRange["0-19"].male + totalByAgeRange["0-19"].female) *
						impressions,
					Homens: totalByAgeRange["0-19"].male * impressions,
					Mulheres: totalByAgeRange["0-19"].female * impressions,
				},
				{
					name: "20-29",
					value:
						(totalByAgeRange["20-29"].male + totalByAgeRange["20-29"].female) *
						impressions,
					Homens: totalByAgeRange["20-29"].male * impressions,
					Mulheres: totalByAgeRange["20-29"].female * impressions,
				},
				{
					name: "30-39",
					value:
						(totalByAgeRange["30-39"].male + totalByAgeRange["30-39"].female) *
						impressions,
					Homens: totalByAgeRange["30-39"].male * impressions,
					Mulheres: totalByAgeRange["30-39"].female * impressions,
				},
				{
					name: "40-49",
					value:
						(totalByAgeRange["40-49"].male + totalByAgeRange["40-49"].female) *
						impressions,
					Homens: totalByAgeRange["40-49"].male * impressions,
					Mulheres: totalByAgeRange["40-49"].female * impressions,
				},
				{
					name: "50-59",
					value:
						(totalByAgeRange["50-59"].male + totalByAgeRange["50-59"].female) *
						impressions,
					Homens: totalByAgeRange["50-59"].male * impressions,
					Mulheres: totalByAgeRange["50-59"].female * impressions,
				},
				{
					name: "60+",
					value:
						(totalByAgeRange["60+"].male + totalByAgeRange["60+"].female) *
						impressions,
					Homens: totalByAgeRange["60+"].male * impressions,
					Mulheres: totalByAgeRange["60+"].female * impressions,
				},
			],
			totalByGender: [
				{
					name: "Homens",
					value: totalByGender["male"] * impressions,
				},
				{
					name: "female",
					value: totalByGender["female"] * impressions,
				},
				{
					name: "unknown",
					value: totalByGender["unknown"] * impressions,
				},
			],
		});
	}

	return formattedData;
};
