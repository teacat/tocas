package main

type Data struct {
	Meta Meta
}

// Meta
type Meta struct {
	UI           MetaUI              `yaml:"UI"`
	Components   map[string][]string `yaml:"Components"`
	Contributors []MetaContributor   `yaml:"Contributors"`
	Information  MetaInformation     `yaml:"Information"`
}

// MetaInformation
type MetaInformation struct {
	Language string `yaml:"Language"`
	Flag     string `yaml:"Flag"`
	Version  string `yaml:"Version"`
}

// MetaContributor
type MetaContributor struct {
	Name    string `yaml:"Name"`
	Website string `yaml:"Website"`
}

// MetaComponents
type MetaComponents struct {
	Elements    []string `yaml:"Elements"`
	Collections []string `yaml:"Collections"`
	Modules     []string `yaml:"Modules"`
	Layouts     []string `yaml:"Layouts"`
}

// MetaUI
type MetaUI struct {
	Paragraph            map[string]string `yaml:"Paragraph"`
	Navigation           map[string]string `yaml:"Navigation"`
	ComponentsCategories map[string]string `yaml:"ComponentsCategories"`
	Components           map[string]string `yaml:"Components"`
}
