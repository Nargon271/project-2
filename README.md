![logo_ironhack_blue 7](https://user-images.githubusercontent.com/23629340/40541063-a07a0a8a-601a-11e8-91b5-2f13e4e6b441.png)

# Project 2

App to connect local farmers to buyers directly

## Introduction
App is a free web application which is targeted for agriculture practitioners, which provides a platform which connects and brings together the farming community and helps them in selling, buying and exchanging agriculture commodities and services locally without middlemen through an Add/listing which they can post right from the webpage.
This app connects farmers directly to the local consumer market. This will give independent farmers and cooperatives ability to sell their farm produce easily and as well enable buyers to contact farmers directly.
Farmers can post their products and attract more buyers which will save precious time and money.They can get better profits than normal. As these portals reduce middleman buyers and sellers can privately chat to negotiate prices safely.

You can register as a Farmer or as a Buyer.

## If you are a farmer:
 1. Create your account: Fill the sign-up form with your personal details and upload a picture of you. Introduce yourself to potential customers.

 2. Register your farm: upload a photo, add a short description and all the details of your farm. Don't forget to fill your farm's coordinates if you want to be displayed in our map and be easily found by customers.

 3. List your products: upload a photo, enter the details of the product, click Submit and instantly your Ad will be displayed.

 4. Start to sell: discuss with customers interested in your products about the sale details and close the deal.


## If you are a buyer:

 1. Create your account: Fill the sign-up form with your personal details and upload a picture of you.

 2. Reach out your favourite farms: add to your personal page your favourite farms and contact them about the products you wish to buy.



## Here's the route we will be using:

|   Route   | HTTP Verb |   Description   |
|-----------|-----------|-----------------|
| `/` |    GET    | show index with Google Map |
| `/api/farms` |    GET   | json farm list |
| `/farms` |    GET   | show farms list |
| `/farms/:farm_id`|    GET   | show farm details|
| `/products` |    GET   | show products list |
| `/products/:product_id`|    GET   | show product details|
| `/auth/log-in` |    GET   | show log in form|
| `/auth/log-in` |    POST   | manage log in form |
| `/auth/sign-up` |    GET   | show sign up form|
| `/auth/sign-up` |    POST   | manage sign up form |
|  Role : BUYER                                |
| `/profile` |    GET    | show user profile data |
| `/profile/edit-user` |    GET    | show edit user form|
| `/profile/edit-user` |    POST    | manage edit user form|
|  Role : FARMER                                  |
| `/profile` |    GET    | show user profile data |
| `/profile/edit-user` |    GET    | show edit user form|
| `/profile/edit-user` |    POST    | manage edit user form|
| `/profile/create-farm?id=XXX` |    GET    | show create farm form |
| `/profile/create-farm?id=XXX` |    POST   | manage create farm form|
| `/profile/myfarm/:id` |    GET    | show farm data |
| `/profile/myfarm/:id/create-product` |    GET    | show create new product form|
| `/profile/myfarm/:id/create-product` |    POST   | manage create new product form|
| `/profile/myfarm/:id/edit-product?id=XXX` |    GET    | show edit product form|
| `/profile/myfarm/:id/edit-product?id=XXX` |    POST   | manage edit product form|
| `/profile/myfarm/:id/delete-product?id=XXX` |    GET    | delete product|



## That's it!

Enjoy your local products and stay healthy! :heart:
