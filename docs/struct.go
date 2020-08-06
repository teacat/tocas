package main

type Data struct {
	Meta Meta
}

// Meta
type Meta struct {
	UI         MetaUI              `yaml:"ui"`
	Components map[string][]string `yaml:"components"`
}

// MetaComponents
type MetaComponents struct {
	Elements    []string `yaml:"elements"`
	Collections []string `yaml:"collections"`
	Modules     []string `yaml:"modules"`
	Layouts     []string `yaml:"layouts"`
}

// MetaUI
type MetaUI struct {
	Paragraph            map[string]string `yaml:"paragraph"`
	Navigation           map[string]string `yaml:"navigation"`
	ComponentsCategories map[string]string `yaml:"components_categories"`
	Components           map[string]string `yaml:"components"`
}
