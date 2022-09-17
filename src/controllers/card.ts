import { ICardRequest } from './../interface/ICardRequest';
import { CardService } from './../services/card';


export class CardController {

    constructor() {


    }

    private cardService: CardService = new CardService();

    public async createCardToken(card: ICardRequest) {

        return this.cardService.createCardToken(card);
    }
}