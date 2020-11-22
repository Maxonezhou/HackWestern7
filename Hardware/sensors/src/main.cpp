#include <Arduino.h>
#include <Adafruit_CCS811.h>
#include <Adafruit_MPL3115A2.h>
#include <SoftwareSerial.h>
#include <SPI.h>
#include <Wire.h>

// CSS811
#define CSS811_ADDR 0x5B
Adafruit_CCS811 ccs;
int CO2 = 0;
int TVOC = 0;

// MPL3115A2
Adafruit_MPL3115A2 baro = Adafruit_MPL3115A2();
float MLP3115A2_pressure = 0;
float MLP3115A2_altitude = 0;
float MLP3115A2_temp = 0;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  Wire.begin();

  // CCS811
  if(ccs.begin(CSS811_ADDR))
  {
    Serial.print("[INFO] CCS811 (ccs) sensor found. I2C address: 0x" ); Serial.println(CSS811_ADDR, HEX);
  }

  if(!ccs.begin(CSS811_ADDR)){
    Serial.println("Failed to start CCS811 (ccs) sensor! Please check your wiring.");
    while(1);
  }

  // MLP3115A2 
  baro.begin();
  if (baro.begin())
  {
    Serial.println("[INFO] MLP3115A2 sensor found");
  }
}

bool readCCS811(int &CO2, int &TVOC)
{
  if (ccs.available())
  {
    ccs.readData();
    CO2 = ccs.geteCO2();
    //char CO2Message[] = "[INFO] CO2 (in ppm): ";
    TVOC = ccs.getTVOC();
    //char TVOCMessage[] = "[INFO] TVOC (in ppm): ";
    // Serial.print("[INFO] CO2: ");
    // Serial.print(CO2); Serial.print(" ppm");
    // Serial.println();
    // Serial.print("[INFO] TVOC: ");
    // Serial.print(TVOC); Serial.print(" ppm");
    // Serial.println();

    return true;
  }
  else if (ccs.checkError())
  {
    Serial.print("[ERROR] Cannot print values");
    Serial.println();
    return false;
  }
  return true;
}

void readMLP3115A2(float &MLP3115A2_pressure, float &MLP3115A2_altitude, float &MLP3115A2_temp)
{
  if (baro.begin())
  {
    MLP3115A2_pressure = baro.getPressure(); // pressure in pascals
    //char pressureMessage[] = "[INFO] Barometric pressure (in Inches of Mercury): ";
    //Serial.print("[INFO] Barometric pressure: "); Serial.print(MLP3115A2_pressure/3377); Serial.println(" Inches Hg");

    MLP3115A2_temp = baro.getTemperature(); // temperature in degrees celcius
    //char tempMessage[] = "[INFO] Barometric pressure (in degrees celcius: ";
    //Serial.print("[INFO] Temperature: "); Serial.print(MLP3115A2_temp); Serial.println(" *C");
  }
}

void loop() {
  // put your main code here, to run repeatedly:
  readCCS811(CO2, TVOC);
  readMLP3115A2(MLP3115A2_pressure, MLP3115A2_altitude, MLP3115A2_temp);
  float MLP3115A2_pressure_int = MLP3115A2_pressure/3377.0;
  //printf("%d;%d;%d;%f;%f", CO2, TVOC, MLP3115A2_pressure_int, MLP3115A2_altitude, MLP3115A2_temp);
  Serial.print(CO2); Serial.print(";"); 
  Serial.print(TVOC); Serial.print(";");
  Serial.print(MLP3115A2_pressure_int); Serial.print(";");
  //Serial.print(MLP3115A2_altitude); Serial.print(";");
  Serial.print(MLP3115A2_temp); Serial.print(";");
  Serial.println();
  delay(1000);
}