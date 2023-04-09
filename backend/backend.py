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
    schema = r"""
    {
    "crops": {
        "type": "array",
        "items": 
            "type": "object",
            "items": {
                "name": {
                "type": "string"
                },
                "description": {
                "type": "string"
                }
            }, ...
    },
    "buddy": {
        "type": "string",
        "items": {
            ...
        }
    }
    }
    """
     
    r = openai.Completion.create(
        engine="text-davinci-003",

        prompt =f"""
        What are the best crops to grow in{location}given the following factors: 
        average precipitation - {avg_precipitation}mm,
        average temperature - {avg_temperature}F,
        average humidity - {avg_humidity}%,
        average sun coverage - {avg_sun}%.

        Provide the response as a JSON object that specifically follows the schema detailed below: 

        {schema}

        The "crops" field should be an array of 5 objects representing the top 5 best crops to plant. 
        Each object should have a "name" with the name of the crop, and a "description" with a unique description specific to that crop of why to plant it given the conditions. 

        The "buddy" field should have some relevant fun facts about the crops.
        """,
        max_tokens=2000
    )
    print(r)
    return r



async def get_weather_data(client, location, lookup_date):
    url = f"http://api.weatherapi.com/v1/future.json?key={weather_api_key}&q={location}&dt={lookup_date}"
    print(url)
    async with client.get(url) as response:
        if response.status == 200:
            return await response.json()

@app.route('/', methods=['POST'])
async def main():
    request_json = await request.get_json()
    location = request_json["location"]
    print(location)
    start_date = datetime.strptime(request_json["date"], "%Y-%m-%d")
    
    total_precipitation = 0
    total_temperature = 0
    total_humidity = 0
    total_sun = 0
    location_name = None

    tasks = []
    for i in range(30):
        lookup_date = (start_date + timedelta(days=i)).strftime("%Y-%m-%d")
        tasks.append(asyncio.ensure_future(get_weather_data(app.client, location, lookup_date)))

    count = 0
    for data in filter(lambda x: x is not None, await asyncio.gather(*tasks)):
        count += 1
        if not location_name:
            location_name = data['location']['name'] + ", " + data['location']['region']
        for j in range (8):
            total_sun += 100 - data["forecast"]['forecastday'][0]['hour'][j]["cloud"]
        total_precipitation += data['forecast']['forecastday'][0]['day']['totalprecip_mm']
        total_temperature += data['forecast']['forecastday'][0]['day']['avgtemp_f']
        total_humidity += data['forecast']['forecastday'][0]['day']['avghumidity']

    avg_sun = round(total_sun / (8 * count), 2)
    avg_precipitation = round(total_precipitation / count, 2)
    avg_temperature = round(total_temperature / count, 2)
    avg_humidity = round(total_humidity / count, 2)
    
    print(location_name)
    print(avg_sun)
    print(avg_precipitation)
    print(avg_temperature)
    print(avg_humidity)

    result = await gpt(location_name, avg_sun, avg_precipitation, avg_temperature, avg_humidity)

    print(result)

    result = json.loads(result["choices"][0]["text"])
    result["location"] = location_name

    return result
    
    # return {
    #     "name": name,
    #     "avg_sun": avg_sun,
    #     "avg_precipitation": avg_precipitation,
    #     "avg_temperature": avg_temperature,
    #     "avg_humidity": avg_humidity
    # }

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=4000)
