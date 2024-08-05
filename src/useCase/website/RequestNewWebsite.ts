import { PoliticianProfileRepository } from "@/repositories/PoliticianProfileRepository";
import { WebSiteRepository } from "@/repositories/WebsiteRepository";
import { sendMail } from "@/utils/sendEmail";
import { Website } from "@prisma/client";

interface RequestNewWebsiteUseCaseRequest {
  website_url: string;
}

export class RequestNewWebsiteUseCase {
  constructor() {}

  async execute({ website_url }: RequestNewWebsiteUseCaseRequest) {
    const sendEmail = await sendMail("mouragabriel205@gmail.com", website_url);

    return;
  }
}
