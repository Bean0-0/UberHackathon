import ssl
import eel
import certifi
import geopy.geocoders
from geopy.geocoders import Nominatim

ctx = ssl.create_default_context(cafile=certifi.where())
geopy.geocoders.options.default_ssl_context = ctx

geolocator  = Nominatim(user_agent="shilohbennolan",scheme='http')#user agent is just a unique id that geocoder uses to track our usage
'''
location = geolocator.geocode("19106 waverdale court")
print(location.address)'''


@eel.expose
def sendLocation(inp, typ):
    loc = geolocator.geocode(inp)
    if loc == None:
        eel.recieveLocation(["Can't find"])

    else:
        eel.recieveLocation([loc.address,[loc.longitude,loc.latitude],typ])
    
    

eel.init("web")
eel.start("index.html")

