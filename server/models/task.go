package models

import (
	"server/config"

	"gorm.io/gorm"
)

var db *gorm.DB

type Task struct {
	gorm.Model
	Content string `json:"content"`
	Status  bool   `json:"status"`
}

func init() {
	config.Connect()
	db = config.GetDB()
	db.AutoMigrate(&Task{})
}

func GetAllTasks() ([]Task, error) {
	var tasks []Task
	err := db.Find(&tasks).Error
	return tasks, err
}

func GetTaskByID(ID uint) (*Task, error) {
	var task Task
	err := db.Where("ID=?", ID).First(&task).Error
	return &task, err
}

func CreateTask(task *Task) (*Task, error) {
	err := db.Create(task).Error
	if err != nil {
		return &Task{}, err
	}
	var newTask Task
	err = db.Where("ID=?", task.ID).First(&newTask).Error
	return &newTask, err
}

func DoneTask(ID uint) (*Task, error) {
	var task Task
	err := db.Where("ID=?", ID).First(&task).Error
	if err != nil {
		return &Task{}, err
	}
	task.Status = true
	err = db.Save(&task).Error
	return &task, err
}

func UndoTask(ID uint) (*Task, error) {
	var task Task
	err := db.Where("ID=?", ID).First(&task).Error
	if err != nil {
		return &Task{}, err
	}
	task.Status = false
	err = db.Save(&task).Error
	return &task, err
}

func DeleteTaskByID(ID uint) (*Task, error) {
	var task Task
	err := db.Where("ID=?", ID).Delete(&task).Error
	return &task, err
}
