#!/bin/bash
# Deploy Invigor8 to Hostinger
# Usage: ./deploy.sh

echo "Deploying to invigor8medical.com..."
lftp -u u612872758,'q5y8eJ^6^a6gF#' ftp://invigor8medical.com -e "
  set ftp:passive-mode true;
  mirror -R --only-newer --verbose /Users/amaan/Downloads/Invigor8/ public_html/;
  quit
"
echo "Done!"
