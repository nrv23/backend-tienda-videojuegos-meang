
class StripeAPI {

    private stripe = require("stripe")(process.env!.STRIPE_API_KEY,{
        apiVersion: process.env.STRIPE_API_VERSION
    });

    async execute(object: string, action: string, ...args:Array<string | object| undefined>) {
        return await this.stripe[object][action](...args)
    }
}

export default StripeAPI;