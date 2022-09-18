import { Card } from "./../interface/ICreditCard";
import { ICardRequest } from "./../interface/ICardRequest";
import { CardService } from "./../services/card";

export class CardController {
  constructor() {}

  private cardService: CardService = new CardService();

  public async createCardToken(card: ICardRequest) {
    return this.cardService.createCardToken(card);
  }

  public async addTokenCard(customerId: string, tokenCard: String) {
    return await this.cardService.addTokenCard(customerId, tokenCard);
  }

  public async retrieveSource(customerId: string, cardToken: string) {
    return await this.cardService.retrieveSource(customerId, cardToken);
  }

  public async updateCard(
    customerId: string,
    cardToken: string,
    details: Card
  ) {
    return await this.cardService.updateCard(customerId, cardToken, details);
  }

  public async deleteCard(customerId: string, cardToken: string) {
    return await this.cardService.deleteCard(customerId, cardToken);
  }

  public async getCards(
    customerId: string,
    limit: number,
    startingAfter: string = "",
    endingBefore: string = ""
  ) {
    return await this.cardService.getCards(
      customerId,
      limit,
      startingAfter,
      endingBefore
    );
  }
}
