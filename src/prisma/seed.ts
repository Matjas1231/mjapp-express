import { faker } from '@faker-js/faker';
import { prisma } from './prisma';

type Worker = {
  first_name: string;
  last_name: string;
  position: string;
  phone: string;
};

type User = {
  name: string;
  email: string;
};

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
        ...worker
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

const main = async () => {
  const workers = faker.helpers.multiple(createRandomWorker, {
    count: 100
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
