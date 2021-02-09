find . -type d | while read d; do
    git add --all &
    git commit -m 'first commit' &
    git push
   #ls $d/
done