# Farm Buddy
<img width="1440" alt="Homepage" src="https://user-images.githubusercontent.com/52581859/230764578-f03fbbf8-d272-4f72-86b5-f56a70b699d7.png">

## Inspiration
Food shortages will be one of the biggest issues that humanity will face in coming years, so in line with sustainability goals around the world, we decided to try and tackle it by trying to bring urban farming into the limelight. 

Growing your own fruits and vegetables in your own backyard  is a great way to make the world greener, make you and your family/ friends more eco-conscientious, and save money on groceries.

But running your own farm can be challenging, especially when you aren't sure what seeds you should buy. This is how we came up with Farm Buddy, an AI that tries to encourage people to farm recreationally by providing a list of the best crops for any given location.


## What it does
Farm Buddy searches historical weather, seasonal, and soil information and provides accurate location-specific information about what fruits, vegetables, and other crops are best suited for its environment. It also provides a short description of why each plant should be planted in this specific location. 

**Buddy**, our friendly ferret mascot, also appears on the screen and gives a couple of fun facts about urban farming and the crops he decided to pick. 

<div align="center" ><img style="border-radius:50px"  width="300" alt="Buddy" src="https://user-images.githubusercontent.com/52581859/230765735-d2ff6f1a-5856-4b77-96ba-86fb63b08698.png"></div>

## How we built it
Farm Buddy is built on the foundation of OpenAI's *text-DaVinci-003*; when a user gives our Flask backend their location, it calls multiple different APIs to gather all of the location-specific data regarding factors that could affect the growth of the crop, such as the climate and season. All of this information is then sent into *text-DaVinci-003*, which does a lot of the heavy lifting for us and processes the information into a more digestible format to display. 

We decided to use this backend API with a frontend React.js web app since it would offer the most flexibility when it came to programming and when it came to UI/UX design. While our API is making calls to other 3rd party APIs, Buddy is talking to the user on the website.


## Installation
### Clone the repo
```
$ git clone https://github.com/n-kly/bitcamp-2023.git
```

### Download dependencies
```
$ cd backend
$ pip3 install quart quart-cors openai asyncio aiohttp
$
$ cd frontend/bitcamp-farm-buddy
$ npm install 
```

### API Keys
You'll need to get API keys for both OpenAI and Weather API.

### Run application
Terminal 1
```
$ cd backend
$ python3 backend.py
```
This will run on your localhost:4000


Terminal 2
```
$ cd frontend/bitcamp-farm-buddy
$ npm start
```

The website should now be running on your localhost:3000


