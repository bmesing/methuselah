#!/bin/bash

export DATABASE_HOST="http://127.0.0.1:5984/"
export DATABASE_NAME="productinformation"

set -x
curl -X PUT ${DATABASE_HOST}${DATABASE_NAME}
curl -X PUT -d @products-view.json "${DATABASE_HOST}${DATABASE_NAME}/_design/products"

