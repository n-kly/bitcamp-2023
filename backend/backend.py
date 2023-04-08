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

async def gpt():
    r = openai.Completion.create(
        engine="text-davinci-003",
        prompt= "What are the best crops to grow in College Park, Maryland given that the average precipitation is 50 mm, the average temperature is 75 degrees F, the soil content is 40% silt, and the climate is humid?",
        max_tokens=1000
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

    avg_sun = total_sun / (8 * count)
    avg_precipitation = total_precipitation / count
    avg_temperature = total_temperature / count
    avg_humidity = total_humidity / count
    
    print(name)
    print(avg_sun)
    print(avg_precipitation)
    print(avg_temperature)
    print(avg_humidity)

    result = await gpt()

    print(result)

    return result["choices"][0]["text"]
    
    # return {
    #     "name": name,
    #     "avg_sun": avg_sun,
    #     "avg_precipitation": avg_precipitation,
    #     "avg_temperature": avg_temperature,
    #     "avg_humidity": avg_humidity
    # }

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
