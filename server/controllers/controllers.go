package controllers

import (
	"server/models"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func GetAllTasks(c *fiber.Ctx) error {
	tasks, err := models.GetAllTasks()
	if err != nil {
		return fiber.DefaultErrorHandler(c, err)
	}
	return c.JSON(tasks)
}

func GetTaskByID(c *fiber.Ctx) error {
	id, err := strconv.ParseUint(c.Params("id"), 10, 0)
	if id == 0 || err != nil {
		return fiber.DefaultErrorHandler(c, err)
	}
	task, err := models.GetTaskByID(uint(id))
	if err != nil {
		return fiber.DefaultErrorHandler(c, err)
	}
	return c.JSON(task)
}

func CreateTask(c *fiber.Ctx) error {
	var task models.Task
	if err := c.BodyParser(&task); err != nil {
		return fiber.DefaultErrorHandler(c, err)
	}
	createdTask, err := models.CreateTask(&task)
	if err != nil {
		return fiber.DefaultErrorHandler(c, err)
	}
	return c.JSON(createdTask)
}

func DoneTask(c *fiber.Ctx) error {
	id, err := strconv.ParseUint(c.Params("id"), 10, 0)
	if id == 0 || err != nil {
		return fiber.DefaultErrorHandler(c, err)
	}
	task, err := models.DoneTask(uint(id))
	if err != nil {
		return fiber.DefaultErrorHandler(c, err)
	}
	return c.JSON(task)
}

func UndoTask(c *fiber.Ctx) error {
	id, err := strconv.ParseUint(c.Params("id"), 10, 0)
	if id == 0 || err != nil {
		return fiber.DefaultErrorHandler(c, err)
	}
	task, err := models.UndoTask(uint(id))
	if err != nil {
		return fiber.DefaultErrorHandler(c, err)
	}
	return c.JSON(task)
}

func DeleteTaskByID(c *fiber.Ctx) error {
	id, err := strconv.ParseUint(c.Params("id"), 10, 0)
	if id == 0 || err != nil {
		return fiber.DefaultErrorHandler(c, err)
	}
	task, err := models.DeleteTaskByID(uint(id))
	if err != nil {
		return fiber.DefaultErrorHandler(c, err)
	}
	return c.JSON(task)
}
