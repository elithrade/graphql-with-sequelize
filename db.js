import Sequelize from 'sequelize'
import _ from 'lodash'
import Faker from 'faker'

// Create connection
const Conn = new Sequelize(
  'hub',
  'postgres',
  'postgres', {
    dialect: 'postgres',
    host: 'localhost'
  }
)

// Define tables
const Person = Conn.define('person', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
})

const Post = Conn.define('post', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

// Relationships
Person.hasMany(Post)
Post.belongsTo(Person)

Conn.sync({ force: true }).then(() => {
  // Returns promise
  _.times(10, () => {
    return Person.create({
      firstName: Faker.name.firstName(),
      lastName: Faker.name.lastName(),
      email: Faker.internet.email()
    })
  })
})

export default Conn
