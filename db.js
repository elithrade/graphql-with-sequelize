import Connection from 'sequelize'
import _ from 'lodash'
import Faker from 'faker'

// Create connection
const Db = new Connection(
  'graphql',
  'root',
  '', {
    dialect: 'mysql',
    port: 3306
  }
)

// Define tables
const Person = Db.define('person', {
  firstName: {
    type: Connection.STRING,
    allowNull: false
  },
  lastName: {
    type: Connection.STRING,
    allowNull: false
  },
  email: {
    type: Connection.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
})

const Post = Db.define('post', {
  title: {
    type: Connection.STRING,
    allowNull: false
  },
  content: {
    type: Connection.STRING,
    allowNull: false
  }
})

// Relationships
Person.hasMany(Post)
Post.belongsTo(Person)

Db.sync({ force: true }).then(() => {
  // Returns promise
  _.times(10, () => {
    return Person.create({
      firstName: Faker.name.firstName(),
      lastName: Faker.name.lastName(),
      email: Faker.internet.email()
    }).then(person => {
      return person.createPost({
        title: `Sample post by ${person.firstName}`,
        content: `here is some content`
      })
    })
  })
})

export default Db
