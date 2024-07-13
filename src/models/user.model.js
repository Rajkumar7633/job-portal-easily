export default class UserModel {
  static users = [
    {
      id: 1,
      name: "Pranav Yeole",
      email: "pranav@gmail.com",
      password: "secret",
    },
  ];
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    UserModel.users.push({ id, name, email, password });
  }
  static get = () => {
    return UserModel.users;
  };
  static addUser = (user) => {
    UserModel.users.push(user);
  };
  static confirmLogin(user) {
    const { email } = user;
    return UserModel.users.find((user) => {
      return user.email === email;
    });
  }
}
