// DirMap: The association of a directory to another directory.
package main

import "path"

type DirMap struct {
	src string
	tgt string
}

func DMap(src string, tgt string) DirMap {
	return DirMap{src, tgt}
}

func (d DirMap) Src() string {
	return d.src
}

func (d DirMap) Target() string {
	return d.tgt
}

func (d DirMap) TargetBasedOn(dir string) string {
	return path.Join(dir, d.tgt)
}
