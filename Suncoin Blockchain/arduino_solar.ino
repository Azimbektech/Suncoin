#include <WiFi.h>
#include <HTTPClient.h>

// WiFi credentials
const char* ssid = "your_SSID";
const char* password = "your_PASSWORD";

// Server URL
const char* serverName = "http://yourserver.com/api/data";

// Pin definitions
const int voltagePin = A0; // Analog pin for voltage
const int currentPin = A1; // Analog pin for current

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }

  Serial.println("Connected to WiFi");
}

void loop() {
  // Read voltage and current
  float voltage = analogRead(voltagePin) * (5.0 / 1023.0);
  float current = analogRead(currentPin) * (5.0 / 1023.0);

  // Calculate power in kW
  float power = voltage * current / 1000.0;

  if (WiFi.status() == WL_CONNECTED) {
    WiFiClient client;
    HTTPClient http;

    http.begin(client, serverName);
    http.addHeader("Content-Type", "application/json");

    String postData = "{\"voltage\":" + String(voltage) + ",\"current\":" + String(current) + ",\"power\":" + String(power) + "}";

    int httpResponseCode = http.POST(postData);

    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println(httpResponseCode);
      Serial.println(response);
    } else {
      Serial.print("Error on sending POST: ");
      Serial.println(httpResponseCode);
    }

    http.end();
  }

  delay(60000); // Send data every minute
}
