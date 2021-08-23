package main

//=======================================================
// Meta
//=======================================================

type Meta struct {
	Information  MetaInformation
	Contributors []MetaContributor
	UI           MetaUI
	Components   MetaComponents
}

type MetaInformation struct {
	Language string
	Path     string
	Flag     string
	Version  string
}

type MetaContributor struct {
	Name    string
	Website string
}

type MetaUI struct {
	Tab                  MetaUITab
	Types                MetaUITypes
	Paragraph            MetaUIParagraph
	Navigation           MetaUINavigation
	ComponentsCategories MetaUIComponentsCategories
	Components           MetaUIComponents
}

type MetaUITab struct {
	Definitions string
	Usages      string
	Settings    string
}

type MetaUITypes struct {
	Boolean     string
	Integer     string
	String      string
	Array       string
	Object      string
	HTMLElement string
	Module      string
}

type MetaUIParagraph struct {
	Footer              string
	Translators         string
	TranslatorSeparator string
	Code                string
}

type MetaUINavigation struct {
	GettingStarted string
	Introduction   string
	Components     string
	Responsive     string
	Examples       string
	Playground     string
	About          string
	BackToTop      string
	Emphasises     string
}

type MetaUIComponentsCategories struct {
	Elements    string
	Collections string
	Modules     string
	Layouts     string
}

type MetaUIComponents struct {
	Accordion    string
	Appbar       string
	Badge        string
	BottomSheet  string
	Breadcrumb   string
	Button       string
	Capacity     string
	Card         string
	Carousel     string
	Checkbox     string
	Comments     string
	Container    string
	Conversation string
	Dialog       string
	Dimmer       string
	Divider      string
	Drawer       string
	Dropdown     string
	Editable     string
	Embed        string
	Emoji        string
	Feed         string
	File         string
	Flag         string
	Form         string
	Gallery      string
	Grid         string
	Header       string
	Icon         string
	Image        string
	Infoitems    string
	Input        string
	Items        string
	Label        string
	Layout       string
	List         string
	Loader       string
	Masonry      string
	Menu         string
	Message      string
	Modal        string
	Pagination   string
	Persona      string
	Placeholder  string
	Popup        string
	Progress     string
	Quote        string
	Radio        string
	Rating       string
	Search       string
	Segment      string
	Select       string
	Sidebar      string
	Slate        string
	Slider       string
	Snackbar     string
	Space        string
	Statistic    string
	Steps        string
	Swticher     string
	Tab          string
	Table        string
	Text         string
	Timeline     string
	Toggle       string
}

type MetaComponents struct {
	Elements    []string
	Collections []string
	Modules     []string
	Layouts     []string
}

//=======================================================
// Component
//=======================================================

type Component struct {
	Title       string
	Description string
	Features    []string
	Relatives   []string
	Events      []ComponentEvent
	Properties  []ComponentProperty
	Definitions []ComponentDefinition
	Example     string
}

type ComponentProperty struct {
	Key         string
	Default     string
	Description string
	Type        string
}

type ComponentEvent struct {
	Name        string
	Description string
	Context     ComponentEventContext
	Arguments   []ComponentEventArgument
}

type ComponentEventContext struct {
	Description string
	Type        string
}

type ComponentEventArgument struct {
	Name        string
	Description string
	Type        string
}

type ComponentDefinition struct {
	Title       string
	Description string
	Sections    []ComponentDefinitionSection
}

type ComponentDefinitionSection struct {
	Title       string
	Anchor      string
	Description string
	Since       string
	HTML        string
}
