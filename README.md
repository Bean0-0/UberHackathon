# Caravan: Share the Journey
___
## Overview
**Caravan** is a groundbreaking transportation application that allows users to access ride-sharing services seamlessly while ensuring accessibility, promoting environmental sustainability, and preventing discrimination. Just like a real caravan where people travel together, Caravan brings passengers and drivers together to create a sense of inclusion in the ride-sharing world.

## Set up and Troubleshooting
Caravan is a Node web application, so to run it on your local machine, make sure you have [downloaded node.js](https://nodejs.org/).
Here are the steps for set up, assuming you have installed Node

1. **Install the dependencies** by running `npm install` in the root directory.
2. **Run the web server** by running `node app.js` in the root directory.
3. **Enjoy the ride 😎**

Caravan also utilizes Mapbox's API for the mapping feature. However, **we do not include our API key** in this repository. If you wish to get your own free API key or are having trouble with our mapping implementation, visit [Mapbox's webiste](https://www.mapbox.com/) and explore their [API Documentation](https://docs.mapbox.com/api/overview/).
 - **Note:** If you are a judge reading this, the API key can be found in **GitHub Repository** section of our PDF submission.

## Key Features
### 1. Accessibility Accommodations
- During the initial setup, users can specify their accessibility accommodations, ensuring that the app caters to their specific needs.

### 2. Seamless Ride Booking
- Users can effortlessly request rides by entering their starting and ending destinations, just like any other ride-sharing app.

### 3. Driver and Vehicle Information
- Users can view essential information about the matched vehicle, including the car model, environmental score, and accessibility features.
- This allows for informed user decisions that promote environmental sustainability to reduce the impact of carbon emissions while also promoting inclusivity through accessibility features.

### 4. Environmental Impact
Utilizing open data collected by the Canadian Government from 2013-2020 on over 7300 car models, Caravan automatically scores cars based on their CO2 emissions relative to other cars. A car can score either **Severe, Poor, Average, Good, or Excellent.**

Having a scoring system informs users on the ecological footprint of their rides and discourages them from choosing rides with high CO2 emissions. By discouraging **riders** from picking cars with poor environmental impacts, we indirectly discourage **drivers** from using cars with poor environmental impacts!

### 5. Privacy and Anti-Discrimination
- To prevent discrimination, Caravan prioritizes privacy by not displaying the driver's face or personal information until the user selects a ride they are satisfied with.
- Caravan's commitment to driver privacy provides protection against discriminatory consumer practices and promotes inclusivity in the ride-sharing community.

### 6. Complete Ride Details
- Once a ride is chosen, Caravan provides the user with comprehensive ride details, including the driver's face, driver information, car details, license plate number, and estimated arrival time.

## How It Works
1. **User Profile Setup**: Upon the first use, users specify their accessibility accommodations, ensuring a personalized experience. 
2. **Booking a Ride**: Users enter their starting and ending destinations, triggering the app to search for the nearest available drivers.   
3. **Matching Process**: To emulate an real-world implementation of the web app, Caravan automatically generates random drivers with random cars, while still fitting within the user's accessibility preferences. In a real-world implementation, the random generation of drivers would be replaced with a search through database of nearby drivers.   
4. **Viewing Vehicle Details**: Users can review important vehicle information, such as car model, environmental score, and accessibility features, without accessing the driver's personal details.   
5. **Selecting a Ride**: Once satisfied with a ride option, users can select it to reveal the driver's face, personal information, car details, license plate number, and estimated arrival time.

## Competition Submission
Caravan is our entry for the **2023 Virtual Global Hackathon**, demonstrating our commitment to making transportation accessible and equitable for all. We believe that our innovative approach to matching passengers with suitable drivers will revolutionize the industry.
Ultimately, we aim to foster a ride-sharing world in UberLand that tackles the problems of the environmental impact of the ride-sharing industry along with accessibility and inclusivity.   

## Sources
- All svg images are open source and free to use from [Iconoir.com](https://iconoir.com/)
- The driver profile image is an alteration of this free to use image(Unsplash License) from [Unsplash.com](https://unsplash.com/photos/ARBQCe2GrjQ)
- The car model image is our own original digital asset, based loosely on a Toyota Camry and Tesla Model Y
- The CO2 dataset is licensed under the [Open Data Commons DBC1 License](https://opendatacommons.org/licenses/dbcl/1-0/) and can be found [here](https://www.kaggle.com/datasets/debajyotipodder/co2-emission-by-vehicles)
