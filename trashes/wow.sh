find . -type d -path './*' -prune | while read d; do
    (cd $d/; git add --all; git commit -m 'first commit'; git push)
    #(git --git-dir=$d add --all; git --git-dir=$d commit -m 'first commit'; git --git-dir=$d push)
done

#for d in ../*/ ; do ls "$d" && du "$d" ; done