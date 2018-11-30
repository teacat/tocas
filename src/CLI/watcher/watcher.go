package watcher

const (
	// SassCompiler 是 Dart Sass 編譯器。
	SassCompiler = iota
	// WellingtonCompiler 是 Golang Sass 編譯器。
	WellingtonCompiler
	// NodeCompiler 是 Node Sass 編譯器。
	NodeCompiler
	// SasscCompiler 是 C Sass 編譯器。
	SasscCompiler
)

// Watcher 呈現的是一個檔案監聽器的本體。
type Watcher struct {
	Option *Option
}

// Option 是檔案監聽器的選項與相關設置。
type Option struct {
	SassCompiler int
}

func main() {

}

// New 會初始化一個檔案監聽器。
func New(option *Option) *Watcher {
	return &Watcher{
		Option: option,
	}
}
