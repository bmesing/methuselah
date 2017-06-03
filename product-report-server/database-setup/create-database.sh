#!/bin/bash

export DATABASE_HOST="http://127.0.0.1:5984/"
export PRODUCT_DATABASE_NAME="products"
export REVIEW_DATABASE_NAME="review"

export TEST_DB_EXT="-test"

set -x
curl -X PUT ${DATABASE_HOST}${PRODUCT_DATABASE_NAME}
curl -X PUT ${DATABASE_HOST}${REVIEW_DATABASE_NAME}


curl -X PUT -d @products-view.json "${DATABASE_HOST}${PRODUCT_DATABASE_NAME}/_design/products"
curl -X PUT -d @reviews-view.json "${DATABASE_HOST}${REVIEW_DATABASE_NAME}/_design/reviews"
