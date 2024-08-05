import { RequestNewWebsiteUseCase } from "@/useCase/website/RequestNewWebsite";

export function makeRequestNewWebsite() {
  return new RequestNewWebsiteUseCase();
}
