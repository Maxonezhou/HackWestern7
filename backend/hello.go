package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
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

var apiKey = "39a43ecea353c7bd81d1339b0e2b6ba2"

func createPolygonID(w http.ResponseWriter, r *http.Request) {
	lats := []float64{43.477071, 43.478643, 43.481767, 43.480420, 43.477071}
	longs := []float64{-80.540015, -80.535305, -80.537590, -80.542160, -80.540015}

	var coords [][2]float64

	// fix this to loop throught he number of coordinates we send in
	for i := 0; i < len(lats); i++ {
		var coord [2]float64
		coord[0] = longs[i]
		coord[1] = lats[i]
		coords = append(coords, coord)
	}

	var coordsList [][][2]float64
	coordsList = append(coordsList, coords)

	var reqBody = RequestBody{}
	reqBody.Name = "Polygon Test"
	reqBody.GeoJSON.Type = "Feature"
	reqBody.GeoJSON.Geometry.Type = "Polygon"
	reqBody.GeoJSON.Geometry.Coordinates = coordsList

	reqJSON, err := json.Marshal(reqBody)
	if err != nil {
		log.Fatal(err.Error())
	}

	// fmt.Println(string(reqJSON))

	resp, err := http.Post("http://api.agromonitoring.com/agro/1.0/polygons?appid="+apiKey,
		"application/json", bytes.NewBuffer(reqJSON))
	if err != nil {
		log.Fatal(err)
	}

	responseData, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
	}
	// fmt.Println(string(responseData))
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(http.StatusCreated)
	fmt.Fprintln(w, string(responseData))

	// // response, err := http.Get("http://pokeapi.co/api/v2/pokedex/kanto/")

	// if err != nil {
	// 	fmt.Print(err.Error())
	// 	os.Exit(1)
	// }

	// responseData, err := ioutil.ReadAll(response.Body)
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// fmt.Println(string(responseData))

	// fmt.Fprintf(w, "Hello, you've requtested: %s\n", r.URL.Path)
}

func getListofPolygons(w http.ResponseWriter, r *http.Request) {
	// fmt.Println("GETTING LISTS OF POLYGONS!")
	resp, err := http.Get("http://api.agromonitoring.com/agro/1.0/polygons?appid=" + apiKey)
	if err != nil {
		log.Fatal(err)
	}

	responseData, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
	}
	// fmt.Println(string(responseData))
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(http.StatusCreated)
	fmt.Fprintln(w, string(responseData))
}

func removePolygon(w http.ResponseWriter, r *http.Request) {
	//http://localhost:8000/polygon/remove?polygonID=5fb9aedb714b528135e1c250
	query := r.URL.Query()
	parameter, present := query["polygonID"]
	if !present {
		log.Fatal("Polygon ID not present")
	}
	polygonID := parameter[0]

	// resp, err := http.Put("http://api.agromonitoring.com/agro/1.0/polygons/" + polygonID + "?appid=" + apiKey)
	// var polygonID string = "5fb9aedb714b528135e1c250"
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
		log.Fatal(err)
	}

	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(http.StatusCreated)
	fmt.Fprintln(w, "Polygon with id:"+polygonID+" was deleted")
}
func main() {
	http.HandleFunc("/polygon/create", createPolygonID)
	http.HandleFunc("/polygon/all", getListofPolygons)
	http.HandleFunc("/polygon/remove", removePolygon)

	http.ListenAndServe(":8000", nil)

}
