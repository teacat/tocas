package main

import "html/template"

// Data
type Data struct {
	Meta     Meta
	Article  Article
	Examples Examples
	Type     string
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
	Types                map[string]string `yaml:"Types"`
}

// Article
type Article struct {
	Title       string              `yaml:"Title"`
	Description string              `yaml:"Description"`
	Intro       string              `yaml:"Intro"`
	Relatives   []string            `yaml:"Relatives"`
	Settings    ArticleSettings     `yaml:"Settings"`
	Usages      ArticleUsages       `yaml:"Usages"`
	Definitions []ArticleDefinition `yaml:"Definitions"`
}

// ArticleSettings
type ArticleSettings struct {
	Properties []ArticleSettingsPropertie `yaml:"Properties"`
	Callbacks  []ArticleSettingsCallback  `yaml:"Callbacks"`
}

// ArticleSettingsPropertie
type ArticleSettingsPropertie struct {
	Key         string `yaml:"Key"`
	Default     string `yaml:"Default"`
	Description string `yaml:"Description"`
	Type        string `yaml:"Type"`
}

// ArticleSettingsCallback
type ArticleSettingsCallback struct {
	Name        string                            `yaml:"Name"`
	Description string                            `yaml:"Description"`
	Context     ArticleSettingsCallbackContext    `yaml:"Context"`
	Arguments   []ArticleSettingsCallbackArgument `yaml:"Arguments"`
}

// ArticleSettingsCallbackContext
type ArticleSettingsCallbackContext struct {
	Description string `yaml:"Description"`
	Type        string `yaml:"Type"`
}

// ArticleSettingsCallbackArgument
type ArticleSettingsCallbackArgument struct {
	Name        string `yaml:"Name"`
	Description string `yaml:"Description"`
	Type        string `yaml:"Type"`
}

// ArticleUsages
type ArticleUsages struct {
	Behaviors []ArticleUsagesBehavior `yaml:"Behaviors"`
}

// ArticleUsagesBehavior
type ArticleUsagesBehavior struct {
	Name        string                          `yaml:"Name"`
	Description string                          `yaml:"Description"`
	Arguments   []ArticleUsagesBehaviorArgument `yaml:"Arguments"`
	Return      ArticleUsagesBehaviorReturn     `yaml:"Return"`
}

// ArticleUsagesBehaviorArgument
type ArticleUsagesBehaviorArgument struct {
	Name        string `yaml:"Name"`
	Required    bool   `yaml:"Required"`
	Description string `yaml:"Description"`
	Type        string `yaml:"Type"`
}

// ArticleUsagesBehaviorReturn
type ArticleUsagesBehaviorReturn struct {
	Type        string `yaml:"Type"`
	Description string `yaml:"Description"`
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
	//
	Icons []string
	// FormattedHTML 是程式會自動進行段落掃描並整理的 HTML 程式碼，這不在 YAML 之中。
	FormattedHTML template.HTML
}

// Examples
type Examples struct {
	Title       string         `yaml:"Title"`
	Description string         `yaml:"Description"`
	Items       []ExamplesItem `yaml:"Items"`
}

// ExamplesItem
type ExamplesItem struct {
	Title       string             `yaml:"Title"`
	Description string             `yaml:"Description"`
	Items       []ExamplesItemItem `yaml:"Items"`
}

// ExamplesItemItem
type ExamplesItemItem struct {
	Title       string `yaml:"Title"`
	Image       string `yaml:"Image"`
	Link        string `yaml:"Link"`
	Description string `yaml:"Description"`
	Symbol      string `yaml:"Symbol"`
}
