import serial
import pyrebase
import time
ser = serial.Serial('/dev/tty.usbserial-14420')

firebaseConfig = {
    "apiKey": "AIzaSyBREAESu1Y0oVdHV1xmeIWAEopShIpYPm8",
    "authDomain": "hackwestern7-f86e4.firebaseapp.com",
    "databaseURL": "https://hackwestern7-f86e4.firebaseio.com",
    "projectId": "hackwestern7-f86e4",
    "storageBucket": "hackwestern7-f86e4.appspot.com",
    "messagingSenderId": "311126926287",
    "appId": "1:311126926287:web:6cb402a4f835f8be5b28ba"
  }

try:
    firebase = pyrebase.initialize_app(firebaseConfig)
    storage = firebase.storage()
    database = firebase.database()
except:
    print("Failed to initialize firebase")
    exit(-1)

while(True):
    try:
        ser_bytes = ser.readline()
        decoded_bytes = ser_bytes[0:len(ser_bytes)-2].decode("utf-8")
        # decoded_bytes = "408;1;29.35;23.56;"
        print(decoded_bytes)
    except KeyboardInterrupt:
        print("Keyboard Interrupt")
        break
    except:
        sleep(2)
        print("Couldn't read serial")
        continue
    
    vals = decoded_bytes.split(";")
    if len(vals) < 4:
        print("Wrong number of values")
        continue
    co2 = float(vals[0])
    tvoc = int(vals[1])
    pressure = float(vals[2])
    temp = float(vals[3])
    print("co2 = {}".format("%.2f" % co2))
    print("tvoc = {}".format(tvoc))
    print("pressure = {}".format("%.2f" % pressure))
    print("temp = {}".format("%.2f" % temp))
    data = {
        "c02": str(format("%.2f" % co2)),
        "tvoc": str(tvoc),
        "pressure": str(format("%.2f" % pressure)),
        "temp": str(format("%.2f" % temp))
    }
    database.child("Arduino Data").child(str(int(time.time()))).set(data)
    print("\n~~~~~~~~~\n")