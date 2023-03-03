const { sequelize } = require('./db');
const { User, Board, Cheese } = require('./models/index');

describe("Cheese board project", () => {

    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });

    test("can create a User", async () => {
        let user = await User.create({
            name: "Nathan",
            email: "nathan@gmail.com"
        });
        
        expect(user.name).toBe("Nathan");
        expect(user instanceof User).toBeTruthy();
    });

    test("can create a Board", async () => {
        let board = await Board.create({
            type: "hard",
            description: "hard cheeses",
            rating: 8
        });

        expect(board.type).toBe("hard");
        expect(board).toHaveProperty("description", "hard cheeses");
    });

    test("can create a Cheese", async () => {
        let cheese = await Cheese.create({
            title: "parmesan",
            description: "hard, gritty, fruity"
        });

        expect(cheese.title).toBe("parmesan");
        expect(cheese.description).toBe("hard, gritty, fruity");
    });
});