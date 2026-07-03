# Foodbanked App

This is the foodbanked application a user interacts with. This contains the frontend + the node backend server that will act as the handler for the backend later. 

## How to get started on this project

1. If you don't have Docker Desktop, install it and then come back here
2. Run ```docker compose up --build``` first time or when installing a new npm package
3. Small change can be booted using ```docker compose up``` - this probably won't be necessary since we have live reloading
4. To stop just press Ctrl + C

## Folder Structure

This is how we will structure our project 

1. Raw files you want to send unchanged put in the public folder
2. The public folder contains what users will see. .tsx is a react typescript file. For a specific component we will use the componentName as the folder name with the corresponding css and other declarations for that specific component in that folder.
3. All of the routing is done 

