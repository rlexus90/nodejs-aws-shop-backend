aws dynamodb put-item \
    --table-name AWS_Shop_Products \
    --item '{
        "id": {"S": "uuid-valu"},
        "title": {"S": "Product Title"},
        "description": {"S": "Product Description"},
        "price": {"N": "100"}
    }' \
    --endpoint-url http://localhost:8000  

    aws dynamodb put-item \
    --table-name AWS_Shop_Stocks \
    --item '{
        "product_id": {"S": "uuid-valu"},
        "count": {"N": "3"}
    }' \
    --endpoint-url http://localhost:8000  