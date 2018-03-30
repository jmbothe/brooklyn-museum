# The Walters Art Museum: Ancient Americas Collection Browser

## Client Problem Statement

The curators of The Walters Art Museum's collection of Ancient American art and artifacts have requested a user interface to be built around the museum's [recently released API](http://api.thewalters.org/), which provides access to data on the museum's various collections' objects. The curators requested that interface allow users to browse the collection data across broad categories, as well as perform more fine-grained search queries. They also requested that users be able to mark objects as "favorites" for later viewing.

## Tech Stack

* Java Spring Boot, Netflix Eureka, and Netflix Zuul for microservices architecture.
* Java Persistence API, Flyway, and Postgres for data management.
* Firebase for user sign-up and login authorization.
* React.js for front-end UI/UX.

## Install and Testdrive

This project depends upon [docker](https://www.docker.com/) and [docker-compose](https://docs.docker.com/compose/). Make sure you have all of these dependencies installed before you proceed.

1. [Clone this repo](https://help.github.com/articles/cloning-a-repository/) to your machine.
2. In a terminal window, from the top-level project directory run `docker-compose up`.
3. Once all of the containers are up and running (wait a minute or two, especially if this is the first time you've docker'd up), navigate to [http://localhost:3000](http://localhost:3000) in your browser and enjoy the app!
4. When you are finished testdriving the app, in the terminal `ctrl + C` to stop the docker images, and then run `docker-compose down` to remove the mounted docker images.

## Features

* Secure sign-up and login with Firebase.
* Options for browsing and searching the collection's objects.
* Options to add and remove objects from a persistent list of "user favorites".
* Detailed views on selected objects, along with high-resolution images.

-------

![Dash](./walters.gif)