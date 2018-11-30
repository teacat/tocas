package executor

import (
	"fmt"
	"log"
	"os"
	"os/exec"
	"strings"
	"time"

	"github.com/radovskyb/watcher"
)

func main() {

}

// Executor 是能夠執行系統指令的指令中樞，用以集中所有指令的執行方法。
type Executor struct {
}

// New 能夠初始化一個新的指令執行中樞。
func New() *Executor {
	return &Executor{}
}

// Execute 會執行系統指令。
func (e *Executor) Execute(format string, args ...interface{}) {
	format = fmt.Sprintf(format, args)
	command := strings.Fields(format)
	now := time.Now()
	cmd := exec.Command(command[0], command[1:]...)
	//cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stdout
	if err := cmd.Run(); err != nil {
		panic(err)
	}
	log.Printf("已執行（%s）：%s\n", time.Since(now), format)
}

// ExecuteWithEvent 能夠接收檔案監聽器的變動事件作為標記，同時執行指定的系統指令。
func (e *Executor) ExecuteWithEvent(event watcher.Event, format string, args ...interface{}) {
	format = fmt.Sprintf(format, args)
	command := strings.Fields(format)
	now := time.Now()
	cmd := exec.Command(command[0], command[1:]...)
	//cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stdout
	if err := cmd.Run(); err != nil {
		panic(err)
	}
	log.Printf("已執行 %s（%s）：%s\n", e.CommandToName(command[0]), time.Since(now), event.Path)
}

// CommandToName 可以將指令轉換成人類能讀的程序名稱。
func (e *Executor) CommandToName(command string) string {
	switch command {
	case "sass":
		return "Dart Sass"
	case "wt":
		return "Wellington"
	case "node-sass":
		return "Node Sass"
	case "sassc":
		return "Sassc"
	}
	return "NONAME"
}
