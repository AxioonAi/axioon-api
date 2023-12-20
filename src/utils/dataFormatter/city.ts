import { UserCityInterface } from "@/repositories/PoliticianProfileRepository";

export const CityDataFormatter = ({ city, role }: UserCityInterface) => {
  return {
    id: city.id,
    name: city.name,
    state: city.state,
    electorate: {
      total: city.electorate[0].electorate,
      male: city.electorate[0].male,
      female: city.electorate[0].female,
      with_disability: city.electorate[0].with_disability,
      with_biometry: city.electorate[0].with_biometry,
      schoolLevel: {
        illiterate: city.electorate[0].illiterate,
        complete_primary_education:
          city.electorate[0].complete_primary_education,
        incomplete_primary_education:
          city.electorate[0].incomplete_primary_education,
        complete_high_school: city.electorate[0].complete_high_school,
        incomplete_high_school: city.electorate[0].incomplete_high_school,
        read_and_write: city.electorate[0].reads_and_writes,
        not_informed: city.electorate[0].not_informed,
      },
      ageRange: {
        sixteen_to_twenty:
          city.electorate[0].sixteen_years +
          city.electorate[0].nineteen_years +
          city.electorate[0].eighteen_years +
          city.electorate[0].seventeen_years,
        twenty_one_to_twenty_nine:
          city.electorate[0].twenty_one_to_twenty_four_years +
          city.electorate[0].twenty_five_to_twenty_nine_years,
        thirty_to_thirty_nine:
          city.electorate[0].thirty_to_thirty_four_years +
          city.electorate[0].thirty_five_to_thirty_nine_years,
        forty_to_forty_nine:
          city.electorate[0].forty_to_forty_four_years +
          city.electorate[0].forty_five_to_forty_nine_years,
        fifty_to_fifty_nine:
          city.electorate[0].fifty_to_fifty_four_years +
          city.electorate[0].fifty_five_to_fifty_nine_years,
        sixty_to_sixty_nine:
          city.electorate[0].sixty_to_sixty_four_years +
          city.electorate[0].sixty_five_to_sixty_nine_years,
        seventy_more:
          city.electorate[0].seventy_five_to_seventy_nine_years +
          city.electorate[0].seventy_to_seventy_four_years +
          city.electorate[0].eighty_five_to_eighty_nine_years +
          city.electorate[0].eighty_to_eighty_four_years +
          city.electorate[0].ninety_to_ninety_four_years +
          city.electorate[0].ninety_five_to_ninety_nine_years +
          city.electorate[0].hundred_years_or_more,
      },
    },
    population: {
      total: city.IBGEData[0].total,
      ageRange: {
        zero_to_nine: {
          total:
            city.IBGEData[0].total_zero_to_four +
            city.IBGEData[0].total_five_to_nine,
          male:
            city.IBGEData[0].male_zero_to_four +
            city.IBGEData[0].male_five_to_nine,
          female:
            city.IBGEData[0].female_zero_to_four +
            city.IBGEData[0].female_five_to_nine,
        },
        ten_to_nineteen: {
          total:
            city.IBGEData[0].total_ten_to_fourteen +
            city.IBGEData[0].total_fifteen_to_nineteen,
          male:
            city.IBGEData[0].male_ten_to_fourteen +
            city.IBGEData[0].male_fifteen_to_nineteen,
          female:
            city.IBGEData[0].female_ten_to_fourteen +
            city.IBGEData[0].female_fifteen_to_nineteen,
        },
        twenty_to_twenty_nine: {
          total:
            city.IBGEData[0].total_twenty_to_twenty_four +
            city.IBGEData[0].total_twenty_five_to_twenty_nine,
          male:
            city.IBGEData[0].male_twenty_to_twenty_four +
            city.IBGEData[0].male_twenty_five_to_twenty_nine,
          female:
            city.IBGEData[0].female_twenty_to_twenty_four +
            city.IBGEData[0].female_twenty_five_to_twenty_nine,
        },
        thirty_to_thirty_nine: {
          total:
            city.IBGEData[0].total_thirty_to_thirty_four +
            city.IBGEData[0].total_thirty_five_to_thirty_nine,
          male:
            city.IBGEData[0].male_thirty_to_thirty_four +
            city.IBGEData[0].male_thirty_five_to_thirty_nine,
          female:
            city.IBGEData[0].female_thirty_to_thirty_four +
            city.IBGEData[0].female_thirty_five_to_thirty_nine,
        },
        forty_to_forty_nine: {
          total:
            city.IBGEData[0].total_forty_to_forty_four +
            city.IBGEData[0].total_forty_five_to_forty_nine,
          male:
            city.IBGEData[0].male_forty_to_forty_four +
            city.IBGEData[0].male_forty_five_to_forty_nine,
          female:
            city.IBGEData[0].female_forty_to_forty_four +
            city.IBGEData[0].female_forty_five_to_forty_nine,
        },
        fifty_to_fifty_nine: {
          total:
            city.IBGEData[0].total_fifty_to_fifty_four +
            city.IBGEData[0].total_fifty_five_to_fifty_nine,
          male:
            city.IBGEData[0].male_fifty_to_fifty_four +
            city.IBGEData[0].male_fifty_five_to_fifty_nine,
          female:
            city.IBGEData[0].female_fifty_to_fifty_four +
            city.IBGEData[0].female_fifty_five_to_fifty_nine,
        },
        sixty_to_sixty_nine: {
          total:
            city.IBGEData[0].total_sixty_to_sixty_four +
            city.IBGEData[0].total_sixty_five_to_sixty_nine,
          male:
            city.IBGEData[0].male_sixty_to_sixty_four +
            city.IBGEData[0].male_sixty_five_to_sixty_nine,
          female:
            city.IBGEData[0].female_sixty_to_sixty_four +
            city.IBGEData[0].female_sixty_five_to_sixty_nine,
        },
        seventy_more: {
          total:
            city.IBGEData[0].total_seventy_to_seventy_four +
            city.IBGEData[0].total_seventy_five_to_seventy_nine +
            city.IBGEData[0].total_eighty_five_to_eighty_nine +
            city.IBGEData[0].total_eighty_to_eighty_four +
            city.IBGEData[0].total_ninety_to_ninety_four +
            city.IBGEData[0].total_ninety_five_to_ninety_nine +
            city.IBGEData[0].total_hundred_and_up,
          male:
            city.IBGEData[0].male_seventy_to_seventy_four +
            city.IBGEData[0].male_seventy_five_to_seventy_nine +
            city.IBGEData[0].male_eighty_five_to_eighty_nine +
            city.IBGEData[0].male_eighty_to_eighty_four +
            city.IBGEData[0].male_ninety_to_ninety_four +
            city.IBGEData[0].male_ninety_five_to_ninety_nine +
            city.IBGEData[0].male_hundred_and_up,
          female:
            city.IBGEData[0].female_seventy_to_seventy_four +
            city.IBGEData[0].female_seventy_five_to_seventy_nine +
            city.IBGEData[0].female_eighty_five_to_eighty_nine +
            city.IBGEData[0].female_eighty_to_eighty_four +
            city.IBGEData[0].female_ninety_to_ninety_four +
            city.IBGEData[0].female_ninety_five_to_ninety_nine +
            city.IBGEData[0].female_hundred_and_up,
        },
      },
    },
    pollingPlace: {},
    politician: city.politician.filter((politician) => {
      return politician.role === role;
    }).length,
  };
};
