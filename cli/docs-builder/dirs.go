package main

import (
	"log"
	"os"
	"path"
)

// ExecutableDir gets the current executable directory
// for placing caches, templates, etc.
func ExecutableDir() (dir string) {
	dir, err := os.Executable()
	if err != nil {
		log.Fatalf("Unable to read executable path: %v", err)
	}

	dir = path.Join(dir, "..")
	return
}

// ProjectDir gets the Tocas project directory.
func ProjectDir() string {
	// TODO: dynamically determine
	return path.Join(ExecutableDir(), "../..")
}

// Npx emulates `npx`, which will pick the executable file
// in the `node_modules/.bin`.
func Npx(exe string) string {
	return path.Join(ProjectDir(), "node_modules", ".bin", exe)
}
