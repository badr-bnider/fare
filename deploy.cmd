set _version = npm view fare version
git add .
git commit -m _version
git push origin
npm version patch
echo "Fare was deployed successfully"