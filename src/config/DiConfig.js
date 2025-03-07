const awilix = require('awilix')

const { UserService, TaskService, CategoryService } = require('../services');
const { UserRepository, TaskRepository, CategoryRepository } = require('../repositories');
const { UserModel, TaskModel, CategoryModel } = require('../models');

const configureDi = () => {
  const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY,
    strict: true,
  });
  
  container.register({
    userService: awilix.asClass(UserService),
    taskService: awilix.asClass(TaskService),
    categoryService: awilix.asClass(CategoryService),
    userRepository: awilix.asClass(UserRepository),
    taskRepository: awilix.asClass(TaskRepository),
    categoryRepository: awilix.asClass(CategoryRepository),
    UserModel: awilix.asValue(UserModel),
    TaskModel: awilix.asValue(TaskModel),
    CategoryModel: awilix.asValue(CategoryModel),
  });
  
  const services = new Proxy(container, {
    get(target, prop) {
      return target.resolve(prop);
    },
  });

  return services;
  
};

module.exports = configureDi;
