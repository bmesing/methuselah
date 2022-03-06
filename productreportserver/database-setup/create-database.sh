#!/bin/bash

echo "Please enter password for creating databases"
read -sp "Password: " PASSWORD

export DATABASE_HOST="https://admin:${PASSWORD}@methuselah.smileupps.com/"
export PRODUCT_DATABASE_NAME="products"
export REVIEW_DATABASE_NAME="review"

export TEST_DB_EXT="-test"

set -x
curl -X PUT ${DATABASE_HOST}${PRODUCT_DATABASE_NAME}
curl -X PUT ${DATABASE_HOST}${REVIEW_DATABASE_NAME}


curl -X PUT -d @products-view.json "${DATABASE_HOST}${PRODUCT_DATABASE_NAME}/_design/products"
curl -X PUT -d @reviews-view.json "${DATABASE_HOST}${REVIEW_DATABASE_NAME}/_design/reviews"
