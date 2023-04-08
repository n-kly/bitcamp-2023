from datetime import datetime, timedelta
import os
from quart import Quart, request
from quart_cors import cors
import asyncio, aiohttp
import requests
import json
import openai

app = cors(Quart(__name__), allow_origin="*")

weather_api_key = os.environ["WEATHER_API_KEY"]

@app.before_serving
async def before_serving():
    app.client = aiohttp.ClientSession()

# close http session when done
@app.after_serving
async def after_serving():
    await app.client.close()

async def gpt(location, avg_sun, avg_precipitation, avg_temperature, avg_humidity):
    r = openai.Completion.create(
        engine="text-davinci-003",
         prompt =f"""
What are the best crops to grow in{location}given the following factors: the average precipitation is {avg_precipitation}mm, the average temperature is {avg_temperature}F, the average humidity is {avg_humidity}%, and the average sun coverage is {avg_sun}%.
Provide the response as a JSON object with two fields: "crops" and "buddy". The "crops" field should be an array of 5 objects representing the top crops to plant. Each object should have a field called "name" with the name of the crop, and a field called "description" with a unique description of why to plant the crop. The "buddy" field should have some fun facts about the crop and the location.
""",
        max_tokens=2000
    )
    print(r)
    return r

async def get_weather_data(client, location, lookup_date):
    url = f"http://api.weatherapi.com/v1/future.json?key={weather_api_key}&q={location}&dt={lookup_date}"
    async with client.get(url) as response:
        if response.status == 200:
            return await response.json()

@app.route('/', methods=['GET'])
async def main():
    location = request.args["location"]

    start_date = datetime.strptime(request.args["date"], "%Y-%m-%d")
    
    total_precipitation = 0
    total_temperature = 0
    total_humidity = 0
    total_sun = 0
    name = None


    tasks = []
    for i in range(30):
        lookup_date = (start_date + timedelta(days=i)).strftime("%Y-%m-%d")
        tasks.append(asyncio.ensure_future(get_weather_data(app.client, location, lookup_date)))

    count = 0
    for data in filter(lambda x: x is not None, await asyncio.gather(*tasks)):
        count += 1
        if not name:
            name = data['location']['name'] + ", " + data['location']['region'] + ', ' + data['location']['country']
        for j in range (8):
            total_sun += 100 - data["forecast"]['forecastday'][0]['hour'][j]["cloud"]
        total_precipitation += data['forecast']['forecastday'][0]['day']['totalprecip_mm']
        total_temperature += data['forecast']['forecastday'][0]['day']['avgtemp_f']
        total_humidity += data['forecast']['forecastday'][0]['day']['avghumidity']

    avg_sun = round(total_sun / (8 * count), 2)
    avg_precipitation = round(total_precipitation / count, 2)
    avg_temperature = round(total_temperature / count, 2)
    avg_humidity = round(total_humidity / count, 2)
    
    print(name)
    print(avg_sun)
    print(avg_precipitation)
    print(avg_temperature)
    print(avg_humidity)

    result = await gpt(name, avg_sun, avg_precipitation, avg_temperature, avg_humidity)

    print(result)

    return json.loads(result["choices"][0]["text"])
    
    # return {
    #     "name": name,
    #     "avg_sun": avg_sun,
    #     "avg_precipitation": avg_precipitation,
    #     "avg_temperature": avg_temperature,
    #     "avg_humidity": avg_humidity
    # }

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
