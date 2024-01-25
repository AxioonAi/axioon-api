import { UserCityInterface } from "@/@types/politicianProfileRepository";

export const CityDataFormatter = ({ city, role }: UserCityInterface) => {
	return {
		id: city.id,
		name: city.name,
		state: city.state,
		electorate: {
			total: city.electorate[0].electorate,
			gender: [
				{
					name: "Masculino",
					value: city.electorate[0].male,
				},
				{
					name: "Feminino",
					value: city.electorate[0].female,
				},
				{
					name: "Indefinido",
					value: city.electorate[0].not_informed,
				},
			],
			with_disability: city.electorate[0].with_disability,
			with_biometry: city.electorate[0].with_biometry,

			schoolLevel: [
				{
					name: "Ensino Fundamental Completo",
					value: city.electorate[0].complete_primary_education,
				},
				{
					name: "Ensino Fundamental Incompleto",
					value: city.electorate[0].incomplete_primary_education,
				},
				{
					name: "Ensino Médio Completo",
					value: city.electorate[0].complete_high_school,
				},
				{
					name: "Ensino Médio Incompleto",
					value: city.electorate[0].incomplete_high_school,
				},
				{
					name: "Sabe ler e escrever",
					value: city.electorate[0].reads_and_writes,
				},
				{
					name: "Não informado",
					value: city.electorate[0].not_informed,
				},
				{
					name: "Analfabeto",
					value: city.electorate[0].illiterate,
				},
			],
			ageRange: [
				{
					name: "16 - 20",
					value:
						city.electorate[0].sixteen_years +
						city.electorate[0].nineteen_years +
						city.electorate[0].eighteen_years +
						city.electorate[0].seventeen_years,
				},
				{
					name: "21 - 29",
					value:
						city.electorate[0].twenty_one_to_twenty_four_years +
						city.electorate[0].twenty_five_to_twenty_nine_years,
				},
				{
					name: "30 - 39",
					value:
						city.electorate[0].thirty_to_thirty_four_years +
						city.electorate[0].thirty_five_to_thirty_nine_years,
				},
				{
					name: "40 - 49",
					value:
						city.electorate[0].forty_to_forty_four_years +
						city.electorate[0].forty_five_to_forty_nine_years,
				},
				{
					name: "50 - 59",
					value:
						city.electorate[0].fifty_to_fifty_four_years +
						city.electorate[0].fifty_five_to_fifty_nine_years,
				},
				{
					name: "60 - 69",
					value:
						city.electorate[0].sixty_to_sixty_four_years +
						city.electorate[0].sixty_five_to_sixty_nine_years,
				},
				{
					name: "70+",
					value:
						city.electorate[0].seventy_five_to_seventy_nine_years +
						city.electorate[0].seventy_to_seventy_four_years +
						city.electorate[0].eighty_five_to_eighty_nine_years +
						city.electorate[0].eighty_to_eighty_four_years +
						city.electorate[0].ninety_to_ninety_four_years +
						city.electorate[0].ninety_five_to_ninety_nine_years +
						city.electorate[0].hundred_years_or_more,
				},
			],
		},
		population: {
			total: city.IBGEData[0].total,
			male: city.IBGEData[0].male_total,
			female: city.IBGEData[0].female_total,
			ageRange: [
				{
					name: "0 - 9",
					total:
						city.IBGEData[0].total_zero_to_four +
						city.IBGEData[0].total_five_to_nine,
					Homens:
						city.IBGEData[0].male_zero_to_four +
						city.IBGEData[0].male_five_to_nine,
					Mulheres:
						city.IBGEData[0].female_zero_to_four +
						city.IBGEData[0].female_five_to_nine,
				},
				{
					name: "10 - 19",
					total:
						city.IBGEData[0].total_ten_to_fourteen +
						city.IBGEData[0].total_fifteen_to_nineteen,
					Homens:
						city.IBGEData[0].male_ten_to_fourteen +
						city.IBGEData[0].male_fifteen_to_nineteen,
					Mulheres:
						city.IBGEData[0].female_ten_to_fourteen +
						city.IBGEData[0].female_fifteen_to_nineteen,
				},
				{
					name: "20 - 29",
					total:
						city.IBGEData[0].total_twenty_to_twenty_four +
						city.IBGEData[0].total_twenty_five_to_twenty_nine,
					Homens:
						city.IBGEData[0].male_twenty_to_twenty_four +
						city.IBGEData[0].male_twenty_five_to_twenty_nine,
					Mulheres:
						city.IBGEData[0].female_twenty_to_twenty_four +
						city.IBGEData[0].female_twenty_five_to_twenty_nine,
				},
				{
					name: "30 - 39",
					total:
						city.IBGEData[0].total_thirty_to_thirty_four +
						city.IBGEData[0].total_thirty_five_to_thirty_nine,
					Homens:
						city.IBGEData[0].male_thirty_to_thirty_four +
						city.IBGEData[0].male_thirty_five_to_thirty_nine,
					Mulheres:
						city.IBGEData[0].female_thirty_to_thirty_four +
						city.IBGEData[0].female_thirty_five_to_thirty_nine,
				},
				{
					name: "40 - 49",
					total:
						city.IBGEData[0].total_forty_to_forty_four +
						city.IBGEData[0].total_forty_five_to_forty_nine,
					Homens:
						city.IBGEData[0].male_forty_to_forty_four +
						city.IBGEData[0].male_forty_five_to_forty_nine,
					Mulheres:
						city.IBGEData[0].female_forty_to_forty_four +
						city.IBGEData[0].female_forty_five_to_forty_nine,
				},
				{
					name: "50 - 59",
					total:
						city.IBGEData[0].total_fifty_to_fifty_four +
						city.IBGEData[0].total_fifty_five_to_fifty_nine,
					Homens:
						city.IBGEData[0].male_fifty_to_fifty_four +
						city.IBGEData[0].male_fifty_five_to_fifty_nine,
					Mulheres:
						city.IBGEData[0].female_fifty_to_fifty_four +
						city.IBGEData[0].female_fifty_five_to_fifty_nine,
				},
				{
					name: "60 - 69",
					total:
						city.IBGEData[0].total_sixty_to_sixty_four +
						city.IBGEData[0].total_sixty_five_to_sixty_nine,
					Homens:
						city.IBGEData[0].male_sixty_to_sixty_four +
						city.IBGEData[0].male_sixty_five_to_sixty_nine,
					Mulheres:
						city.IBGEData[0].female_sixty_to_sixty_four +
						city.IBGEData[0].female_sixty_five_to_sixty_nine,
				},
				{
					name: "70+",
					total:
						city.IBGEData[0].total_seventy_to_seventy_four +
						city.IBGEData[0].total_seventy_five_to_seventy_nine +
						city.IBGEData[0].total_eighty_five_to_eighty_nine +
						city.IBGEData[0].total_eighty_to_eighty_four +
						city.IBGEData[0].total_ninety_to_ninety_four +
						city.IBGEData[0].total_ninety_five_to_ninety_nine +
						city.IBGEData[0].total_hundred_and_up,
					Homens:
						city.IBGEData[0].male_seventy_to_seventy_four +
						city.IBGEData[0].male_seventy_five_to_seventy_nine +
						city.IBGEData[0].male_eighty_five_to_eighty_nine +
						city.IBGEData[0].male_eighty_to_eighty_four +
						city.IBGEData[0].male_ninety_to_ninety_four +
						city.IBGEData[0].male_ninety_five_to_ninety_nine +
						city.IBGEData[0].male_hundred_and_up,
					Mulheres:
						city.IBGEData[0].female_seventy_to_seventy_four +
						city.IBGEData[0].female_seventy_five_to_seventy_nine +
						city.IBGEData[0].female_eighty_five_to_eighty_nine +
						city.IBGEData[0].female_eighty_to_eighty_four +
						city.IBGEData[0].female_ninety_to_ninety_four +
						city.IBGEData[0].female_ninety_five_to_ninety_nine +
						city.IBGEData[0].female_hundred_and_up,
				},
			],
		},
		politician: city.politician.filter((politician) => {
			return politician.role === role;
		}).length,
	};
};
