package main

import "html/template"

// Article
type Article struct {
	This        string
	Title       string                  `yaml:"Title"`
	Description string                  `yaml:"Description"`
	Type        string                  `yaml:"Type"`
	Intro       string                  `yaml:"Intro"`
	Links       []ArticleLink           `yaml:"Links"`
	Example     ArticleExample          `yaml:"Example"`
	Examples    []ArticleExampleSection `yaml:"Examples"`
	Variables   []ArticleVariable       `yaml:"Variables"`
	Properties  []ArticleVariable       `yaml:"Properties"`
	Remove      []string                `yaml:"Remove"`
	Relatives   []string                `yaml:"Relatives"`
	Definitions []ArticleDefinition     `yaml:"Definitions"`
	Flags       map[string][]string     `yaml:"Flags"`

	Meta Meta
	Grid bool `yaml:"Grid"`
}

// ArticleDefinition
type ArticleExample struct {
	Centered bool     `yaml:"Centered"`
	HTML     string   `yaml:"HTML"`
	Remove   []string `yaml:"Remove"`
	// FormattedHTML 是程式會自動進行段落掃描並整理的 HTML 程式碼，這不在 YAML 之中。
	FormattedHTML template.HTML
}

// ArticleLink
type ArticleLink struct {
	Icon        string `yaml:"Icon"`
	Title       string `yaml:"Title"`
	Description string `yaml:"Description"`
	Link        string `yaml:"Link"`
}

// ArticleVariable
type ArticleVariable struct {
	Name           string `yaml:"Name"`
	Default        string `yaml:"Default"`
	Type           string `yaml:"Type"`
	Example        string `yaml:"Example"`
	AdvanceExample string `yaml:"AdvanceExample"`
	Target         string `yaml:"Target"`
	Description    string `yaml:"Description"`
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
	Title          string   `yaml:"Title"`
	Description    string   `yaml:"Description"`
	Version        string   `yaml:"Version"`
	HTML           string   `yaml:"HTML"`
	Responsive     bool     `yaml:"Responsive"`
	Icon           string   `yaml:"Icon"`
	Remove         []string `yaml:"Remove"`
	Anchor         string   `yaml:"Anchor"`
	IsDownloadable bool     `yaml:"IsDownloadable"`
	//
	AttachedHTML string `yaml:"AttachedHTML"`
	//
	Icons []string `yaml:"Icons"`
	// FormattedHTML 是程式會自動進行段落掃描並整理的 HTML 程式碼，這不在 YAML 之中。
	FormattedHTML template.HTML
}

// ArticleExampleSection
type ArticleExampleSection struct {
	Title       string                      `yaml:"Title"`
	Description string                      `yaml:"Description"`
	Items       []ArticleExampleSectionItem `yaml:"Items"`
}

// ArticleExampleSectionItem
type ArticleExampleSectionItem struct {
	Title       string `yaml:"Title"`
	Image       string `yaml:"Image"`
	Link        string `yaml:"Link"`
	Description string `yaml:"Description"`
	Symbol      string `yaml:"Symbol"`
}

// Meta
type Meta struct {
	UI                 MetaUI `yaml:"UI"`
	GlobalInformations []MetaInformation
	Components         []MetaComponent   `yaml:"Components"`
	Contributors       []MetaContributor `yaml:"Contributors"`
	Information        MetaInformation   `yaml:"Information"`
}

type MetaComponent struct {
	Name  string   `yaml:"Name"`
	Items []string `yaml:"Items"`
}

// MetaInformation
type MetaInformation struct {
	Language     string `yaml:"Language"`
	LanguageCode string `yaml:"LanguageCode"`
	Flag         string `yaml:"Flag"`
	Version      string `yaml:"Version"`
	Path         string `yaml:"Path"`
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
	ComponentsCategories map[string]string `yaml:"ComponentsCategories"`
	Components           map[string]string `yaml:"Components"`
}
