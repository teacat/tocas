package main

import "html/template"

// Article
type Article struct {
	This        string
	Title       string              `yaml:"Title"`
	Description string              `yaml:"Description"`
	Intro       string              `yaml:"Intro"`
	Example     ArticleExample      `yaml:"Example"`
	Remove      []string            `yaml:"Remove"`
	Relatives   []string            `yaml:"Relatives"`
	Definitions []ArticleDefinition `yaml:"Definitions"`
	Flags       map[string][]string `yaml:"Flags"`
	Meta        Meta
	Grid        bool `yaml:"Grid"`
}

// ArticleDefinition
type ArticleExample struct {
	Centered bool   `yaml:"Centered"`
	HTML     string `yaml:"HTML"`
	// FormattedHTML 是程式會自動進行段落掃描並整理的 HTML 程式碼，這不在 YAML 之中。
	FormattedHTML template.HTML
}

// ArticleDefinition
type ArticleDefinition struct {
	Title       string                     `yaml:"Title"`
	Description string                     `yaml:"Description"`
	Sections    []ArticleDefinitionSection `yaml:"Sections"`
	Type        string                     `yaml:"Type"`
	Flags       map[string][]string        `yaml:"Flags"`
}

// ArticleDefinitionSection
type ArticleDefinitionSection struct {
	Title       string   `yaml:"Title"`
	Description string   `yaml:"Description"`
	Version     string   `yaml:"Version"`
	HTML        string   `yaml:"HTML"`
	Responsive  bool     `yaml:"Responsive"`
	Since       string   `yaml:"Since"`
	Icon        string   `yaml:"Icon"`
	Remove      []string `yaml:"Remove"`
	Anchor      string   `yaml:"Anchor"`
	//
	Icons []string `yaml:"Icons"`
	// FormattedHTML 是程式會自動進行段落掃描並整理的 HTML 程式碼，這不在 YAML 之中。
	FormattedHTML template.HTML
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
	Path     string `yaml:"Path"`
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
