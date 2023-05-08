package main

import (
	"log"
	"server/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	app := fiber.New()
	app.Use(cors.New())
	routes.RegisterRoutes(app)

	log.Fatalln(app.Listen(":8080"))
}
