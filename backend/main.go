package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"
	"time"
)

type RequestBody struct {
	Name    string `json:"name"`
	GeoJSON struct {
		Type       string `json:"type"`
		Properties struct {
		} `json:"properties"`
		Geometry struct {
			Type        string         `json:"type"`
			Coordinates [][][2]float64 `json:"coordinates"`
		} `json:"geometry"`
	} `json:"geo_json"`
}

// var apiKey = "39a43ecea353c7bd81d1339b0e2b6ba2"
var apiKey = "6aa7e70b342a09aada287ee72faa4517"

func createPolygonID(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		fmt.Fprintln(w, "Invalid method")
		return
	}

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Fprintln(w, "Invalid request")
		return
	}

	var requestInterface interface{}
	json.Unmarshal(body, &requestInterface)
	data := requestInterface.(map[string]interface{})

	var coords [][2]float64

	coordinatesRequest := data["coordinates"].([]interface{})

	for _, item := range coordinatesRequest {
		var coord [2]float64
		coordinateData := item.([]interface{})

		coord[0] = coordinateData[1].(float64)
		coord[1] = coordinateData[0].(float64)

		coords = append(coords, coord)
	}

	var coordsList [][][2]float64
	coordsList = append(coordsList, coords)

	var reqBody = RequestBody{}
	reqBody.Name = "polygon"
	reqBody.GeoJSON.Type = "Feature"
	reqBody.GeoJSON.Geometry.Type = "Polygon"
	reqBody.GeoJSON.Geometry.Coordinates = coordsList

	reqJSON, err := json.Marshal(reqBody)
	if err != nil {
		log.Fatal(err.Error())
	}

	resp, err := http.Post("http://api.agromonitoring.com/agro/1.0/polygons?appid="+apiKey,
		"application/json", bytes.NewBuffer(reqJSON))
	if err != nil {
		log.Fatal(err)
	}

	responseData, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
	}

	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.WriteHeader(http.StatusCreated)
	fmt.Fprintln(w, string(responseData))
}

func getListofPolygons(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		fmt.Fprintln(w, "Invalid method")
		return
	}
	resp, err := http.Get("http://api.agromonitoring.com/agro/1.0/polygons?appid=" + apiKey)
	if err != nil {
		log.Fatal(err)
	}

	responseData, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
	}

	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.WriteHeader(http.StatusOK)
	fmt.Fprintln(w, string(responseData))
}

func removePolygon(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodDelete {
		fmt.Fprintln(w, "Invalid method")
		return
	}

	polygonID := r.URL.Query().Get("polygonID")

	var url string = "http://api.agromonitoring.com/agro/1.0/polygons/" + polygonID + "?appid=" + apiKey
	dat := 0
	jsonReq, err := json.Marshal(dat)
	req, err := http.NewRequest(http.MethodDelete, url, bytes.NewBuffer(jsonReq))
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		log.Fatal(err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != 204 {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintln(w, "Polygon with id:"+polygonID+" was not deleted")
		return
	}

	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.WriteHeader(http.StatusOK)
	fmt.Fprintln(w, "Polygon with id:"+polygonID+" was deleted")
}

func getVegetation(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		fmt.Fprintln(w, "Invalid method")
		return
	}

	polygonID := r.URL.Query().Get("polygonID")
	start := r.URL.Query().Get("start")
	end := r.URL.Query().Get("end")

	resp, err := http.Get("http://api.agromonitoring.com/agro/1.0/ndvi/history?start=" + start + "&end=" + end + "&polyid=" + polygonID + "&appid=" + apiKey)
	if err != nil {
		log.Fatal(err)
	}

	responseData, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
	}
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.WriteHeader(http.StatusOK)
	fmt.Fprintln(w, string(responseData))
}

func getUltraVioletIndex(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		fmt.Fprintln(w, "Invalid method")
		return
	}

	polygonID := r.URL.Query().Get("polygonID")
	resp, err := http.Get("http://api.agromonitoring.com/agro/1.0/uvi?polyid=" + polygonID + "&appid=" + apiKey)
	if err != nil {
		log.Fatal(err)
	}

	responseData, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
	}

	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.WriteHeader(http.StatusOK)
	fmt.Fprintln(w, string(responseData))
}

func getHistoricalWeather(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		fmt.Fprintln(w, "Invalid method")
		return
	}

	lat := r.URL.Query().Get("lat")
	lon := r.URL.Query().Get("lon")
	start := r.URL.Query().Get("start")

	var historicalData [][]interface{}
	timeStart, err := strconv.Atoi(start)
	if err != nil {
		fmt.Println(err)
	}

	t := time.Now().Unix()
	currentTime := int(t)

	for i := timeStart - 430000; i < currentTime; i = i + 43000 {
		dateTime := strconv.Itoa(i)
		resp, err := http.Get("http://api.openweathermap.org/data/2.5/onecall/timemachine?lat=" + lat + "&lon=" + lon + "&dt=" + dateTime + "&APPID=39a43ecea353c7bd81d1339b0e2b6ba2")
		if err != nil {
			log.Fatal(err)
		}

		responseData, err := ioutil.ReadAll(resp.Body)
		if err != nil {
			log.Fatal(err)
		}

		var v interface{}
		json.Unmarshal(responseData, &v)
		data := v.(map[string]interface{})
		// fmt.Print(data)
		// fmt.Println("\n\n~~~~~~\n\n")
		for k, v := range data {
			if k == "hourly" {
				mainInfo := v.([]interface{})
				// fmt.Println(mainInfo)
				// fmt.Println("\n\n~~~~~~\n\n")
				historicalData = append(historicalData, mainInfo)
			}
		}
	}

	historicalDataJSON, err := json.Marshal(historicalData)
	if err != nil {
		log.Fatal(err)
	}
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.WriteHeader(http.StatusOK)
	fmt.Fprintln(w, string(historicalDataJSON))
}

func main() {
	http.HandleFunc("/polygon/create", createPolygonID)
	http.HandleFunc("/polygon/all", getListofPolygons)
	http.HandleFunc("/polygon/remove", removePolygon)
	http.HandleFunc("/vegetation", getVegetation)
	http.HandleFunc("/ultraviolet", getUltraVioletIndex)

	http.HandleFunc("/weather", getHistoricalWeather)

	http.ListenAndServe(":8000", nil)
}
