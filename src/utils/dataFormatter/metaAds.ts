import {
  MetaAdvertisingLib,
  MetaAdvertisingLibDeliveryByRegion,
  MetaAdvertisingLibDemographicDistribution,
} from "@prisma/client";

interface metaAds extends MetaAdvertisingLib {
  deliveryByRegion: MetaAdvertisingLibDeliveryByRegion[];
  demographicDistribution: MetaAdvertisingLibDemographicDistribution[];
}

interface MetaAdsFormatterResult {
  public_by_gender: { [key: string]: number };
  total_spend: number;
  total_impressions: number;
  total_ads: number;
  public_by_age_and_gender: {
    [key: string]: { [key: string]: number };
  };
  ads: {
    id: string;
    average_impressions: number;
    average_spend: number;
    start_date: Date;
    end_date: Date | null;
    status: string;
  }[];
}

export const metaAdsFormatter = (data: metaAds[]) => {
  const formattedData: MetaAdsFormatterResult = {
    public_by_gender: {},
    public_by_age_and_gender: {},
    ads: [],
    total_spend: 0,
    total_impressions: 0,
    total_ads: data.length,
  };

  for (const advertising of data) {
    const impressions =
      (Number(advertising.impressions_lower_bound) +
        Number(advertising.impressions_upper_bound)) /
      2;

    advertising.demographicDistribution.forEach((item) => {
      const percentage = parseFloat(item.percentage);
      if (!formattedData.public_by_gender[item.gender]) {
        formattedData.public_by_gender[item.gender] = 0;
      }
      formattedData.public_by_gender[item.gender] += percentage * impressions;
    });

    // Mapeando faixas etárias para os ranges especificados
    const mapAgeToRange = (age: string) => {
      if (age === "65+") return "60+";
      const ageNumber = parseInt(age.split("-")[0]);
      if (ageNumber < 20) return "0-19";
      if (ageNumber < 30) return "20-29";
      if (ageNumber < 40) return "30-39";
      if (ageNumber < 50) return "40-49";
      if (ageNumber < 60) return "50-59";
      return "60+";
    };

    // Calculando a porcentagem total por faixa etária
    advertising.demographicDistribution.forEach((item) => {
      const ageRange = mapAgeToRange(item.age);
      const gender = item.gender;
      const percentage = parseFloat(item.percentage);
      // Verifica se o gênero é masculino ou feminino para acumular a porcentagem
      if (gender === "male" || gender === "female" || gender === "unknown") {
        if (!formattedData.public_by_age_and_gender[ageRange]) {
          formattedData.public_by_age_and_gender[ageRange] = {};
        }

        if (!formattedData.public_by_age_and_gender[ageRange][gender]) {
          formattedData.public_by_age_and_gender[ageRange][gender] = 0;
        }

        formattedData.public_by_age_and_gender[ageRange][gender] +=
          percentage * impressions;
      }
    });

    const spend =
      (Number(advertising.spend_lower_bound) +
        Number(advertising.spend_upper_bound)) /
      2;

    formattedData.total_impressions += impressions;
    formattedData.total_spend += spend;
    formattedData.ads.push({
      id: advertising.id,
      average_impressions: impressions,
      average_spend: spend,
      start_date: advertising.ad_delivery_start_time,
      end_date: advertising.ad_delivery_start_time,
      status: advertising.status,
    });
  }

  return formattedData;
};
