class UserRepository{
  constructor(opts) {
    this.UserModel = opts.UserModel;
  }

  async get(userEmail) {
    try {
      const user = await this.UserModel.findOne({ email: userEmail });

      return user;
    } catch (error) {
      console.log('error while getting user', error);
      
      throw new Error('error when retrieving user data');
    }
  }

  async update(id, propertyName, value) {
    try {
      await this.UserModel.updateOne({ _id: id }, { [propertyName]: value, updatedAt: Date.now() });
    } catch (error) {
      console.log('error while updating user', error);
      throw new Error('error when updating user data');
    }
  }

  async register(userData) {
    try {
      const newUser = await this.UserModel.create(userData);
  
      return newUser;
    } catch (err) {
      console.log('error while creating user', err);
      const error = Object.values(err.errors);

      throw new Error(error[0].message);
      }
  }
}

module.exports = UserRepository;