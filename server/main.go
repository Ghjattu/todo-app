package main

import (
	"log"
	"server/routes"

	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()
	routes.RegisterRoutes(app)

	log.Fatalln(app.Listen(":8080"))
}
