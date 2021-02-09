package main

import (
	"io/ioutil"

	"gopkg.in/yaml.v2"
)

func main() {
	b, err := ioutil.ReadFile("./src/categories.yml")
	if err != nil {
		panic(err)
	}
	var categories map[string]interface{}
	err = yaml.Unmarshal(b, &categories)
	if err != nil {
		panic(err)
	}

	b, err = ioutil.ReadFile("./src/icons.yml")
	if err != nil {
		panic(err)
	}
	var icons map[string]interface{}
	err = yaml.Unmarshal(b, &icons)
	if err != nil {
		panic(err)
	}

	final := make(map[string][]string)
	final["brands"] = []string{}

	for k, v := range categories {
		final[k] = []string{}
		for _, j := range v.(map[interface{}]interface{})["icons"].([]interface{}) {
			final[k] = append(final[k], j.(string))
		}
	}
	for k, v := range icons {
		if v.(map[interface{}]interface{})["styles"].([]interface{})[0].(string) != "brands" {
			continue
		}

		final["brands"] = append(final["brands"], k)
	}

	b, err = yaml.Marshal(final)
	if err != nil {
		panic(err)
	}

	err = ioutil.WriteFile("dist.yml", b, 0777)
	if err != nil {
		panic(err)
	}
}
