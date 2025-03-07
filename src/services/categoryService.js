const { HttpError } = require('../errors');

class CategoryService{
  constructor(opts){
    this.categoryRepository = opts.categoryRepository;
  }

  _validateData(rawData) {
    const data = Object.entries(rawData)
    data.forEach(([keys, value]) => {
      if(!value) {
        throw new Error(`must provide ${keys}`)
      }
    })
  }

  async create(ctx){
    try {
      const {
        title,
        color,
      } = ctx.body
  
      const rawData = {
        title,
        color
      };
      this._validateData(rawData);
      const categoryData = { ...rawData, userId: ctx.user.id };
      
      const result = await this.categoryRepository.create({ categoryData });

      console.log('result');
      console.log(result);
      

      return result;
  
    } catch (error) {
      if(error.message.includes('must provide')){
        throw new HttpError(error.message, 400);
      }
      throw new HttpError('error while creating category', 500);
    }
  }

  async getOne(ctx) {
    try {
      const category = await this.categoryRepository.getOne({ categoryId: ctx.category.categoryId, userId: ctx.user.id })

      if(!category) throw new Error('Category not found');

      return category;
      
    } catch (error) {
      console.log('error in getOne categoryService', error);

      if(error.message === 'Category not found'){
        throw new HttpError(error.message, 404);
      } else{
        throw new HttpError('fail to get category', 500)
      }
    }
  }

  async getAll(ctx) {
    try {
      const categories = await this.categoryRepository.getAll({userId: ctx.user.id})

      return categories;
      
    } catch (error) {
      console.log('error in getOne categoryService', error);

      throw new HttpError('fail to get categories', 500)
    }
  }

  async edit(ctx) {
    try {
      const {
        categoryId,
        title,
        color,
      } = ctx.body

      const rawData = {
        title,
        color
      };

      this._validateData(rawData);

      const categoryData = { data: rawData, categoryId, userId: ctx.user.id };

      await this.categoryRepository.edit(categoryData);

    } catch (error) {
      if(error.message.includes('must provide')){
        throw new HttpError(error.message, 400);
      }
      throw new HttpError('error while editing category', 500);
    }
  }

  async remove(ctx){
    try {
      await this.categoryRepository.remove(ctx);
    } catch (error) {
      console.log('error remove in categoryService', error.message);

      throw new HttpError('fail removing category', 500);
    }
  }
}

module.exports = CategoryService;
