class CategoryRepository{
  constructor(opts){
    this.CategoryModel = opts.CategoryModel;
    this.TaskModel = opts.TaskModel;
  }

  async create(ctx){
    const { categoryData } = ctx;
    try {
      const result = await this.CategoryModel.create(categoryData);

      return result;
    } catch (error) {
      console.log('error while create category in repository', error)

      throw new Error('error while create category');
    }
  }

  async getOne(ctx){
    try {
      const { categoryId, userId } = ctx;
      
      const category = await this.CategoryModel.findOne({ _id: categoryId, userId });    

      return category;
    } catch (error) {
      console.log('error in getOne categoryRepository', error);

      throw new Error('error while getting category')
    }
  }

  async getAll(ctx){
    const { userId } = ctx;
    try {
      const categories = await this.CategoryModel.find({ userId }).select("title color");
      
      return categories;
    } catch (error) {
      console.log('error in getAll categoryRepository', error);

      throw new Error('error while getting categories')
    }
  }

  async edit(ctx){
    try {
      const { data, categoryId, userId } = ctx;
      
      const editedCategory = await this.CategoryModel.findByIdAndUpdate(
        { _id: categoryId, userId },
        { $set: {...data, updatedAt: Date.now()} }, 
        { new: true, runValidators: true }
      );

      console.log('editedCategory');
      console.log(editedCategory);
      
    } catch (error) {
      console.log('error in edit categoryRepository', error);

      throw new Error('error while editing categories');
    }
  }

  async remove(ctx){
    try {
      const { body: {categoryId}, user: { id } } = ctx;
      
      await this.CategoryModel.deleteOne({ _id: categoryId, userId: id });
      await this.TaskModel.updateMany(
        { categories: categoryId }, 
        { $pull: { categories: categoryId } }
      );
    } catch (error) {
      console.log('error remove in categoryRepository', error)

      throw new Error('error while removing category')
    }
  }
}

module.exports = CategoryRepository;
