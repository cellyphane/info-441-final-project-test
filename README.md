# Group 1's Project Proposal
By: Yenmy Vo, Celestine Le, Lindsy Marroquin, and Bella Gatzemeier

# Project Description 

## Who is our target audience?
Our application is designed for inexperienced consumers of beauty products (i.e. skincare, haircare, and makeup) who want to learn more about products before purchasing them. It specifically aims to support those who are new to skincare, haircare, and/or makeup but struggle to find products that meet their needs—whether they are seeking a cleanser for oily skin or shampoo with all-natural ingredients. With our application, users can become informed consumers and keep track of products they want to add to their routines.

Our application also encourages a user-driven database of products and reviews so that new and experienced users alike can upload products not yet in our database, as well as rate and add tags to products. Users are encouraged to review products and comment/upvote reviews, fostering community amongst beauty product consumers while relying on user experiences to verify products. 

## Why does our audience want to use our application?
Our audience is inexperienced with beauty products and needs a convenient resource for learning about beauty products before they incorporate them into their regular routines. Beauty products can often have ranging results depending on a person’s physiology, so consumers want to hear directly from people like them who have navigated the same products while having oily skin, 4c hair, or specific allergies. Our centralized beauty product wikipedia helps consumers minimize how much time and money they spend on products before finding the ones that meet their needs. Moreover, our application will help foster a community that informs and empowers one another, connecting users to people who share the same struggle in finding products that suit their skin type, hair type, or a variety of other needs. Rather than face these challenges alone, beauty product consumers will have a place to learn from and alongside others.

## Why We Want to Build This Application
As a team of developers with a variety of skincare and haircare needs, we understand that not everyone will have the same experience with a beauty product. Thus, we are motivated to highlight and normalize this range of experiences and support beauty product consumers in finding products that make them feel confident and included.

We also believe that fostering community is important to ensure that users can become well-informed consumers and support them throughout their individual journeys, whether that be establishing a daily skincare routine or shifting to vegan/cruelty-free products. Since our website is user-driven, we want to cultivate collaborative engagement amongst our user base and encourage agency with the products they consume.

We all have struggled with beauty products that fit our hair or skin. Overall, our project aims to help those who struggle to find their beauty product fit through a community-based forum. In this crowd-sourced website, we hope to facilitate discussions and reviews for those undergoing similar beauty product struggles.

# Technical Description

## Architectural Diagrams
insert diagram

## Data Flow
insert diagram
![info441-dataFlow](info441-dataFlow.jpg)

## Summary Tables for User Stories
|   Priority    |      User     |  Description  |  Technical Implementation  |
| ------------- | ------------- | ------------- | -------------------------- |
|      P0       |   As a user   | I want to be able to create an account/profile and log in/out of it | When logging in, use Azure Authentication to verify users, and add them into our database.
|      P0       |   As a user   | I want to be able to upload a product that is not already on the website | When uploading a product, add the product to MongoDB with attributes such as name, category, description, and hyperlink to an image of the product.
|      P0       |   As a user   | I want to be able to view beauty products | When loading the homepage, retrieve a JSON of product previews that include name, category, image, and description for each product.
|      P1       |   As a user   | I want to be able to search beauty products | When searching for products, retrieve all product names that contain the user input.
|      P1       |   As a user   | I want to be able to view reviews on products | When loading a specific product page, retrieve the product’s name, category, image, description, and reviews.
|      P1       |   As a user   | I want to be able to leave reviews on products | When leaving a review on a product, add the review to the reviews database on Mongo DB with attributes such as ID of the user, product ID, review text, and an integer between 1-5 representing the product rating.
|      P1       |   As a user   | I want to be able to sort and filter products according to {skin type, cost, rating, include/exclude products} | Filter and order results according to the applied tags from the products database.
|      P2       |   As a user   | I want to be able to comment on reviews | When commenting on a review, retrieve the specific review from the database and add the comment to the associated review in the database.
|      P2       |   As a user   | I want to create new product collections/routines | When creating a new collection/routine, add collection to MongoDB using a unique ID connected to current user.
|      P2       |   As a user   | I want to add an existing product to my collection/routine | When adding products to a collection/routine, add selected product to MongoDB and add its unique ID to the corresponding collection.
|      P2       |   As a user   | I want to be able to view my profile | Retrieve all collections in the database related to the specific user and display the collections.

## API Endpoints
GET /user/login - Allows users to log into their account.

GET /products - Allows users to view previews of existing products

POST /products - Allows users to upload a product 

GET /products/:id - Allows users to view all information about a specific product, including name, category, description, and image.

GET /products/:id/reviews - Allows users to view reviews on a specific product.

POST /products/:id/reviews - Allows users to upload one review to a specific product.

GET /user/profile - Allows users to view their account name, uploaded products, and review history.

GET /user/profile/collections - Allows users to view their collections

POST /user/profile/collections - Allows users to create a new collection

POST /users/profile/collections/:id/products - Allows users to add certain products to a specific collection

GET /user/profile/collections/:id - Allows users to view products within their collection

DELETE /user/profile/collections - Allows users to delete a collection

DELETE /users/profile/collections/:id/product/:id - Allows users to remove a product from a specific collection

## Database Schemas
Users
- <ins>User ID (String)</ins>
- Product Collections (Array of Product IDs)

Products
- <ins>Product ID (Number)</ins>
- Name of product (String)
- Reviews (Array of Review IDs)
- Image (String representing a hyperlink)
- Skin type tag (Array of strings)

Reviews
- <ins>Review ID (Number)</ins>
- Review Text (String)
- Product ID (Number)
- User ID (String)
- Rating (Number)
- Comments (Array of Comment Objects)

