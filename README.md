# Ecommerce Project

This repository contains an E-commerce project developed using Node.js.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This E-commerce project is aimed at providing a comprehensive platform for online shopping. It facilitates the browsing and purchasing of various products in different categories.

## Features

- User authentication and authorization
- Product catalog with detailed information
- Front-end UI allowing users to view and search products
- Sorting and filtering of products
- Shopping cart and checkout functionality
- Checkout process for purchasing products
- Order history and tracking
- Admin panel to manage categories, subcategories, Brands, Types
  and products
- Payment integration

## Installation

To run this project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/dhruvil-kathiriya/Ecommerce-Project.git`
2. Navigate to the project directory: `cd Ecommerce-Project`
3. Install dependencies: `npm install`

```javascript
npm init
```

Configure `.env`

Copy the `.env.example` file to `.env` and update the MongoDB URI and other environment variables.

Once the installation is complete, you can start the server using the following command:

```bash
npm start
```

This will start the server, and you can access the application in your web browser by visiting http://localhost:9009.

## Usage

Both the admin backend and user frontend are served from the same codebase and accessible via:

- User-facing storefront: `/`
- Admin area: `/admin`

## Admin Credentials

The admin panel can be accessed at /admin. Default admin login credentials are:

_Email:_ admin@gmail.com

_Password:_ admin123

#### Technologies Used

- Node.js
- Express.js
- MongoDB & Mongoose
- EJS Templating
- HTML/CSS/JavaScript/Bootstrap

#### Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or create a pull request.

