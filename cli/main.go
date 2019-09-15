// Yami Odymel © 2019。採用「別當個雞掰人」公眾授權條款。
// 任何人都有權複製與發佈本認證的原始或修改過的版本。
// 只要別當個雞掰人，你可以對原作品做任何事情。
// 更詳細的版權聲明請審閱 LICENSE 檔案。
package main

import (
	"log"
	"os"

	"github.com/teacat/tocas/cli/config"
	"github.com/teacat/tocas/cli/i18n"
	"github.com/teacat/tocas/cli/loader"
	"github.com/teacat/tocas/cli/view"
	"github.com/urfave/cli"
)

func main() {
	app := cli.NewApp()

	app.Flags = []cli.Flag{
		/*cli.StringFlag{
			Name:  "port",
			Value: "8080",
			Usage: "port for tunalog to listen",
		},*/
	}

	app.Action = func(c *cli.Context) error {
		err := config.Prepare()
		if err != nil {
			return err
		}
		err = i18n.Prepare()
		if err != nil {
			return err
		}
		err = loader.Prepare()
		if err != nil {
			return err
		}
		err = path.Prepare()
		if err != nil {
			return err
		}
		view.Menu()
	}

	err := app.Run(os.Args)
	if err != nil {
		log.Fatal(err)
	}
}
