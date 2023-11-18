// 引入 Sequelize 和定义的用户模型
module.exports = (Sequelize, DataTypes) => {
  const UserModel = require('./User')(Sequelize, DataTypes); // 初始化 UserModel
  
  // 定义项目模型
  const Project = Sequelize.define('Project', {
      ProjectID: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true, // 假设项目ID是主键
      },
      ProjectName: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      CreateUserID: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
  });

  // 设置用户和项目之间的关联关系
  UserModel.hasMany(Project, { foreignKey: 'CreateUserID', sourceKey: 'UserID' });
  Project.belongsTo(UserModel, { foreignKey: 'CreateUserID', targetKey: 'UserID' });

  return Project;
};
