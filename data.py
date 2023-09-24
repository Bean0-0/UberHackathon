#this file reads data from the co2 dataset and converts it into a format that can be used in JS
#this file doesn't need to be run if the car-data.js file is already populated
import csv

data = {

}
co2Avg = 0
avgCnt = 0
with open('CO2 Emissions_Canada.csv', 'r') as csv_file:
    csv_reader = csv.reader(csv_file)

    next(csv_reader)

    for line in csv_reader:
        key = line[0] + ":" + line[1] + ":" + line[2]
        co2 = int(line[len(line)-1])
        if key not in data: data[key] = []

        data[key].append(co2)
        co2Avg += co2
        avgCnt += 1

co2Avg /= avgCnt

jsData = "const carData = {\n"

co2Dev = 0
devCnt = 0

for key in data:
    avg = 0
    for i in data[key]: avg+=i
    avg /= len(data[key])
    co2Dev += abs(co2Avg - avg)
    comma = ","
    jsData += "\t'{}':{},\n".format(key.lower(),avg)
    devCnt+=1

co2Dev /= devCnt


jsData += "\t'avg':"+str(co2Avg)+",\n"
jsData += "\t'dev':" + str(co2Dev) + "\n}"
with open("web/car-data.js", "w") as f:
    f.write(jsData)

