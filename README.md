# HackWestern7

## Inspiration
Agriculture is the backbone of our society. Not only providing a supply of food, agriculture is responsible for the production of raw materials such as textiles, sugar, coffee, cocoa, and oils. For many, agriculture is not only an occupation but it is a way of life. This is especially true for those farmers in developing regions around the world. Without having access to smart agriculture technology and mass amounts of weather data, these farmers face challenges such as diminishing crop yields due to inconsistent weather patterns. 

Due to climate change in recent years, large-scale developed farms have experienced a declination of nearly 17% in crop yield despite having massive amounts of resources and support to back up their losses. For those in developing countries, these responses cannot be replicated, and farmers are left with insufficient harvests after a season of growing. The widespread impact of agriculture on communities in developing countries lead to the creation of Peak PerFARMance - a data-driven tool designed to provide farmers with the information necessary to make informed decisions about crop production.

## What it does
Peak PerFARMance is a holistic platform providing real-time hardware data and historical weather indexes to allow small-scale farmers to grow crops efficiently and tackle the challenges introduced by climate change. Our platform features a unique map that allows users to draw a polygon of any shape on the map in order to retrieve in-depth data about the geographical area such as normalized difference vegetation index, UV index, temperature, humidity, pressure, cloud coverage, and wind conditions. Not only retrieving real-time data, but our platform also provides historical data and compares it with current conditions to allow farmers to get a holistic understanding of weather trends allowing them to make more informed decisions about the crops they grow. In addition, our platform combines data retrieved from real-time hardware beacons composed of environmental sensors to provide further information about the conditions on the farm. 

## How we built it
The backend of the project was built in Go. We created APIs for creating polygons, retrieving polygons, and retrieving specific data for the polygon. We integrated the backend with external APIs such as Agro APIs and Open Weather APIs. This allowed us to retrieve data for specific date ranges. The frontend would make API requests to the backend in order to display the data in the frontend dashboards.

The frontend of the project was built using ReactJS. This is the user entry of the project and it is where the user will draw the polygon to retrieve the data. The hardware sensor data is retrieved by the frontend from Google Firebase where it is then processed and displayed. We integrated the frontend with several styling APIs such as ApexChartJS and Bootstrap in order to create the UI for the website.

The hardware for the project was built on top of the Arduino platform and the data was communicated over serial to a host computer where we read the data using a Python script and uploaded it to a Google Real-time Firebase. 

## Challenges we ran into
A challenge we faced when building the backend was working with Go. None of our team members had any prior knowledge working with Go in creating web applications. We wanted to learn a new language during this hackathon, which was challenging but rewarding. An issue we ran into was converting the data between json and structs in Go. Furthermore, the APIs had limited number of past dates that we could get data for.

## Accomplishments that we're proud of
For the backend, an accomplishment we’re proud of was how we were able to learn using a new language for creating multiple APIs and also successfully integrating it to the rest of the project. While there were multiple hours spent debugging, we’re proud of how our team members collaborated in troubleshooting bugs and issues together. 

## What we learned
Having had no experience with Go prior to this weekend,  we were able to learn the language and how to leverage it in creating web applications.

## What's next for Peak PerFARMance
With Peak PerFARMance, we were able to combine a ton of data from numerous sources into a simple-to-use dashboard. In the future, we would like to use machine learning to extract even more insight out of this wealth of data and provide tailored suggestions to farmers.

For this project, we wanted to incorporate LoRaWAN (long range low-power wide-area network) technology to connect many of the IoT sensors over vast distances --- a feat which would be impossible and/or expensive with traditional Wi-Fi and cellular technologies. Unfortunately, the hardware components for this did not arrive in time for this hackathon. We are really excited for it to arrive --- we believe that Peak PerFARMance is the perfect project to show off this technology.
