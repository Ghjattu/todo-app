package routes

import (
	"server/controllers"

	"github.com/gofiber/fiber/v2"
)

func RegisterRoutes(app *fiber.App) {
	app.Get("/api/tasks", controllers.GetAllTasks)
	app.Get("/api/tasks/:id", controllers.GetTaskByID)
	app.Post("/api/tasks", controllers.CreateTask)
	app.Put("/api/tasks/:id/done", controllers.DoneTask)
	app.Put("/api/tasks/:id/undo", controllers.UndoTask)
	app.Delete("/api/tasks/:id", controllers.DeleteTaskByID)
}
