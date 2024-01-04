<br>

### [Link to Live Site](https://reppofficial.com)

<br>

## Description

This website offers a space for music artists to create a page that looks and functions exactly like their own personal website. Its simplicity makes it perfect for up and coming artists who are simply looking to create their first website as well as larger artists who are looking for more fine-tuned control over their online presence.

![image](https://github.com/joshh5790/Repp/assets/61249382/37e97659-1804-4718-b98d-79dfbb76ad54)


<br>

## Features

* Full Cruds (7): users, follows, pages, products, carts, cart items, videos
* Partial Cruds (4): product images, product stock
* artists can create their own page on the website, which features one long page containing all of the sections that they included in their page
* sections include:
  * main video section
  * merch section
  * videos section
  * about section
* users have separate carts for separate artist profiles, and can view their order history
* limited mobile preview while artist is editing their page

<br>

### Current Projects:

* implement Stripe for payments
* use the google maps API to autofill addresses
* creating Tours section

<br>

### Future Features:

* create an interactions section that allows page visitors to interact with the music artist
* Enable messaging between artists that mutually follow one another
* Enable desktop preview while an artist edits their page
* Create newsletter functionality for each artist page

<div align="center">

## Installation

</div>

1. Clone this repository.

   ```bash
   git clone https://github.com/joshh5790/Repp.git
   ```

2. Install dependencies.

      ```bash
      npm install --prefix react-app && npm run build --prefix react-app && pip install -r requirements.txt && pip install psycopg2
      ```

3. Create a `.env` file based on the example with proper settings for your
   development environment.

4. Setup your PostgreSQL user, password, and database and make sure it matches your `.env` file.

5. Get into your pipenv, migrate your database, seed your database, and run your flask app.

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask db migrate
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App in development, `cd` into the `react-app` directory in a separate terminal, then run `npm start`.


## Technologies

<br>
<p float="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" style="width:75px;" title="JavaScript"/>
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" style="width:75px;" title="Python3"/>
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" style="width:75px;" title="Node.js"/>
  &nbsp;
  <img src="https://res.cloudinary.com/dn8rdavoi/image/upload/v1702109030/icons%20for%20github/express2_orhv2h.jpg" style="width:75px;" title="Express.js"/>
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sequelize/sequelize-original.svg" style="width:75px;" title="Sequelize"/>
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" style="width:75px;" title="PostgreSQL"/>
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg" style="width:75px;" title="Sqlite3"/>
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain-wordmark.svg" style="width:75px;" title="HTML5"/>
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain-wordmark.svg" style="width:75px;" title="CSS3"/>
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" style="width:75px;" title="React"/>
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" style="width:75px;" title="Redux"/>
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" style="width:75px;" title="Figma"/>
  &nbsp;
  <img src="https://res.cloudinary.com/dn8rdavoi/image/upload/v1702105824/icons%20for%20github/render-icon2_g4zrja.png" style="width:75px;" title="Render" />
  &nbsp;
</p>

<br>
