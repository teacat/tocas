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
