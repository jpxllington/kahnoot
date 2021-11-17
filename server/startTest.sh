docker compose -f docker-compose.test.yaml up -d
docker exec -it kahnoot_test_api bash -c "npm install && npm test"