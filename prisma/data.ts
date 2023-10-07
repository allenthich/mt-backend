import { Task, User, Prisma } from '@prisma/client'
import { faker } from "@faker-js/faker";

const NUM_FAKE_USERS: number = 1

let fakeUsers: Prisma.UserCreateInput[] = []

const createFakeTask = (): Prisma.TaskCreateInput => {
  const task: Prisma.TaskCreateInput = {
    id: faker.string.uuid(),
    title: faker.word.verb(),
    description: faker.lorem.word(),
  }
  return task
}

const createFakeUserWithTasks = (): Prisma.UserCreateInput => {
  const userId = faker.string.uuid()
  const user: Prisma.UserCreateInput = {
    id: userId,
    email: faker.internet.email(),
    name: faker.person.firstName(),
    tasks: {
      create: [
        createFakeTask(),  // Create related record
      ]
    }
  }
  return user
}

const generateFakeData = () => {
  for (let userIndex = 0; userIndex < NUM_FAKE_USERS; userIndex += 1) {
    const newUser = createFakeUserWithTasks()
    fakeUsers.push(newUser)
  }
}

generateFakeData()

export {
  fakeUsers,
}