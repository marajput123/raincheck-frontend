import { IEvent } from "../Models/IEvent";
import { faker } from '@faker-js/faker';

export const fetchEvent = () => {
    const events: IEvent[] = []
    for (let i = 0; i < 20; i++) {
        events.push({
            _id: faker.database.mongodbObjectId(),
            date: faker.date.future(),
            description: faker.lorem.paragraph(),
            link: "http://localhost:3000/home",
            location: faker.address.streetAddress(),
            name: faker.company.name(),
            organizers: ["3214","123412","124351"],
            private: (parseInt(faker.random.numeric()) % 2) === 0,
            roles: ["12412", "12312"],
            timestamps: faker.date.recent(),
            versionKey: "v1"
        })
    };

    return events;
}