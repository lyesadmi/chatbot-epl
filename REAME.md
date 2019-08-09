
#B. Test :
Build a conversational agent (chatbot) with dialogflow.com.
- First, you will have to create your Dialogflow project as well as your Firebase cloud function (using the links provided below). 
- Then, you will be asked to provide a valid billing account so that your chatbot is able to make external API requests.
- You can configure a billing account on Google Cloud Platform console. Select your Dialogflow/Firebase project, open the menu on the left and click on “Facturation” or “Billing”.
- Provide your credit card number (no worries, you won’t be charged!). Now, your Dialogflow project and Firebase cloud function are associated with your billing account.

## Quickstart
You will need to follow these links to create your account on DialogFlow and create your agent.
   - [create account](https://dialogflow.com/docs/getting-started/create-account)
   - [first agent](https://dialogflow.com/docs/getting-started/first-agent)
   
#### Webhook fulfillment
You can use this link to understand how to use a webhook with DialogFlow.
Be careful, you must not use the online editor of DialogFlow!

- This link will give you information on how to [create and deploy Firebase cloud functions](https://dialogflow.com/docs/getting-started/integrate-services-actions-on-google):
- Following this [link](https://firebase.google.com/docs/functions/get-started), 
- you will have an example of a [cloud function implementing a call to a weather API](https://github.com/dialogflow/fulfillment-weather-nodejs/blob/master/functions/index.js):

Choice of the agent task is left free but the agent must make use of at least one webhook that you implement with one external API call (be creative!). 
Agent’s task and performance are accessory.
However, the agent webhook must absolutely fulfill the following requirements:

* javascript must use ES6 syntax and use Promise
* code must be Unit tested with mocha and have at least a 90% code coverage through istanbul
* all javascript must be annotated with flowtype
* code style must fully respect airbnb code style
* use Atom editor
* For test validation, your webhook must be published on Github and you must let us test your chatbot online or in local during a physical interview. 
     - To do this, click on integration tab of DialogFlow, enable web demo and share the link with us!