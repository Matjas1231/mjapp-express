import { faker } from '@faker-js/faker';
import { prisma } from './prisma';

type Worker = {
  first_name: string;
  last_name: string;
  position: string;
  deparatment?: string;
  phone: string;
};

type User = {
  name: string;
  email: string;
};

const departmentNames = ['IT', 'Production', 'Finance'];

const createRandomWorker = (): Worker => {
  return {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    position: faker.word.words({ count: { min: 1, max: 2 } }),
    phone: faker.phone.number()
  };
};

const createRandomUser = (): User => {
  return {
    name: faker.person.firstName(),
    email: faker.internet.email()
  };
};

const insertWorkers = async (resources: Worker[]) => {
  for (const worker of resources) {
    await prisma.worker.create({
      data: {
        ...worker,
        department_name: departmentNames[Math.floor(Math.random() * departmentNames.length)]
      }
    });
  }
};

const inserUsers = async (resources: User[]) => {
  for (const user of resources) {
    await prisma.user.create({
      data: {
        ...user
      }
    });
  }
};

const insertDepartments = async () => {
  for (const department of departmentNames) {
    await prisma.department.create({
      data: {
        name: department
      }
    });
  }
};

const main = async () => {
  await insertDepartments();
  const workers = faker.helpers.multiple(createRandomWorker, {
    count: 500
  });

  const users = faker.helpers.multiple(createRandomUser, {
    count: 5
  });

  await Promise.all([insertWorkers(workers), inserUsers(users)]);
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
