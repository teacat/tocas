package main

import (
	"log"
	"os/exec"

	cli "github.com/urfave/cli/v2"
)

func compressScreenshots(c *cli.Context) error {
	// pngquant -f --ext .png ./../../examples/screenshots/*.png
	b, err := exec.Command("pngquant", "-f", "--ext", ".png", "./../../examples/screenshots/*.png").CombinedOutput()
	if err != nil {
		log.Println(string(b))
		return err
	}
	return nil
}
