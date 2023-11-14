import { PoliticalGroupRepository } from "@/repositories/PoliticalGroupRepository";

interface FindManyPoliticalGroupUseCaseRequest {}

interface FindManyPoliticalGroupUseCaseResponse {}

export class FindManyPoliticalGroupUseCase {
  constructor(private politicalGroupRepository: PoliticalGroupRepository) {}

  async execute({}: FindManyPoliticalGroupUseCaseRequest): Promise<FindManyPoliticalGroupUseCaseResponse> {
    const politicalGroup = await this.politicalGroupRepository.findMany();

    return {
      politicalGroup,
    };
  }
}
