![logo_ironhack_blue 7](https://user-images.githubusercontent.com/23629340/40541063-a07a0a8a-601a-11e8-91b5-2f13e4e6b441.png)

# Project 2

App to connect farmers to buyers directly

## Introduction
App is a free web application which is targeted for agriculture practitioners, which provides a platform where app connects and brings together the farming community and helps them in selling, buying and exchanging agriculture commodities and services locally without middlemen through an Add/listing which they can post right from their mobile.
This app connects farmers directly to the local consumer market. This will give independent farmers and cooperatives ability to sell their farm produce easily and as well enable buyers to contact farmers directly.
Farmers can post their products and attract more buyers which will save precious time and money. They can get better profits than normal. As these portals reduce middleman buyers and sellers can privately chat to negotiate prices safely.


## 1. MARKET PLACE
People can connect with each other to buy or sell in over 12 categories and 110 sub-categories.

## 2. E-MAIL OR CALL
Seller or buyer can share details by e-mail and then discuss the deal on phone contact. Buyers can ask and post questions related to their farming practices.


## 3. POST AD/LISTING IN ONE MINUTE
It let end user to post anything related to Agriculture in one minute. Take a snap or upload a photo, just enter the details of the product, click Submit and instantly end user’s Ad will be displayed.



Here's the route we will be using:

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
| `/profile/edit-buyer` |    GET    | show edit buyer form|
| `/profile/edit-buyer` |    POST    | manage edit buyer form|
|  Role : FARMER                                  |
| `/profile` |    GET    | show user profile data |
| `/profile/create-farm?id=XXX` |    GET    | show create farm form |
| `/profile/create-farm?id=XXX` |    POST   | manage create farm form|
| `/profile/myfarm/:id` |    GET    | show farm data |
| `/profile/myfarm/:id/create-product` |    GET    | show create new product form|
| `/profile/myfarm/:id/create-product` |    POST   | manage create new product form|
| `/profile/myfarm/:id/edit-product?id=XXX` |    GET    | show edit product form|
| `/profile/myfarm/:id/edit-product?id=XXX` |    POST   | manage edit product form|
| `/profile/myfarm/:id/delete-product?id=XXX` |    GET    | delete product|



## That's it!

Enjoy it! :heart:
